const screens = [...document.querySelectorAll('.screen')];
const keeper = document.getElementById('keeper');
const ball = document.getElementById('ball');
const resultFlash = document.getElementById('resultFlash');
const resultBg = document.querySelector('#result .bg');
const roundText = document.getElementById('roundText');
const scoreText = document.getElementById('scoreText');
const hintText = document.getElementById('hintText');
const finalTitle = document.getElementById('finalTitle');
const rewardText = document.getElementById('rewardText');
const unlockedList = document.getElementById('unlockedList');
const galleryGrid = document.getElementById('galleryGrid');
const galleryProgress = document.getElementById('galleryProgress');
const galleryTitle = document.querySelector('.gallery-head h2');
const galleryDesc = document.querySelector('.gallery-head p');

const directions = ['left', 'center', 'right'];
const saveKey = 'penaltyGirlsSave.v1';
const galleryItems = [
  { id: 'free', type: '静态', label: '免费替换版', unlockScore: 0, thumb: './assets/girls/girl01/free-thumb.jpg', full: './assets/girls/girl01/free.png' },
  { id: 'unlocked', type: '静态', label: '解锁奖励版', unlockScore: 2, thumb: './assets/girls/girl01/unlocked-thumb.jpg', full: './assets/girls/girl01/unlocked.png' },
];

let state = { round: 1, score: 0, locked: false };
let save = loadSave();

function loadSave() {
  try { return JSON.parse(localStorage.getItem(saveKey)) || { unlocked: ['free'] }; }
  catch { return { unlocked: ['free'] }; }
}
function persist() { localStorage.setItem(saveKey, JSON.stringify(save)); }
function show(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  if (id === 'gallery') renderGallery();
  if (id === 'game') resetGame();
}
function resetGame() {
  state = { round: 1, score: 0, locked: false };
  updateHud();
  keeper.className = 'keeper idle';
  ball.className = 'ball';
  hintText.textContent = '选择射门方向';
  flash('', false);
}
function updateHud() {
  roundText.textContent = `${Math.min(state.round, 3)}/3`;
  scoreText.textContent = state.score;
}
function weightedKeeperDirection() {
  const roll = Math.random();
  if (roll < .38) return 'left';
  if (roll < .64) return 'center';
  return 'right';
}
function shoot(playerDir) {
  if (state.locked || state.round > 3) return;
  state.locked = true;
  const keeperDir = weightedKeeperDirection();
  const goal = playerDir !== keeperDir;
  hintText.textContent = '射门！';
  ball.className = `ball ${playerDir}`;
  setTimeout(() => { keeper.className = `keeper ${keeperDir}`; }, 120);
  setTimeout(() => {
    if (goal) {
      state.score++;
      flash('GOAL!', true);
      hintText.textContent = '球进了！';
    } else {
      flash('SAVE!', false);
      hintText.textContent = '被她扑住了';
    }
    updateHud();
  }, 720);
  setTimeout(() => {
    state.round++;
    if (state.round > 3) endGame();
    else {
      ball.className = 'ball';
      keeper.className = 'keeper idle';
      hintText.textContent = '继续选择方向';
      flash('', false);
      updateHud();
      state.locked = false;
    }
  }, 1550);
}
function flash(text, isGoal) {
  resultFlash.textContent = text;
  resultFlash.className = `result-flash ${text ? 'show' : ''} ${isGoal ? 'goal-text' : 'save-text'}`;
}
function setResultBackground(url) {
  if (resultBg) resultBg.style.backgroundImage = `url('${url}')`;
}
function endGame() {
  unlockRewards(state.score);
  setResultBackground(state.score >= 2 ? './assets/girls/girl01/unlocked.png' : './assets/girls/girl01/free.png');
  finalTitle.textContent = `你进了 ${state.score} / 3 球`;
  const lines = ['她笑了：再练练吧。', '还算有点准头，给你一点奖励。', '不错，她开始认真了。', '这球……算你赢。'];
  rewardText.textContent = lines[state.score];
  unlockedList.innerHTML = galleryItems
    .filter(item => item.unlockScore <= state.score)
    .map(item => `<div>解锁：${item.type} · ${item.label}</div>`).join('') || '<div>暂无新收藏</div>';
  setTimeout(() => show('result'), 350);
}
function unlockRewards(score) {
  const set = new Set(save.unlocked || []);
  galleryItems.filter(i => i.unlockScore <= score).forEach(i => set.add(i.id));
  save.unlocked = [...set];
  persist();
}
function renderGallery() {
  const unlocked = new Set(save.unlocked || []);
  const imageTotal = galleryItems.length;
  const imageCount = galleryItems.filter(i => unlocked.has(i.id)).length;
  galleryProgress.textContent = `已解锁 ${imageCount}/${imageTotal}`;
  galleryTitle.textContent = '艾琳 · 女郎收藏';
  galleryDesc.textContent = '免费版已替换到游戏里，解锁版在达成奖励后开放。';
  galleryGrid.innerHTML = galleryItems.map(item => {
    const open = unlocked.has(item.id);
    return `<button class="card ${open ? '' : 'locked'}" data-open="${item.id}">
      <div class="thumb" style="background-image:url('${item.thumb}')"></div>
      <div class="label">${open ? item.label : '未解锁 · 继续挑战'}</div>
    </button>`;
  }).join('');
}
function openGalleryItem(id) {
  const item = galleryItems.find(i => i.id === id);
  if (!item) return;
  const unlocked = new Set(save.unlocked || []);
  if (!unlocked.has(id)) {
    hintText.textContent = '先完成挑战再解锁她';
    show('game');
    return;
  }
  setResultBackground(item.full);
  finalTitle.textContent = item.label;
  rewardText.textContent = item.id === 'free' ? '这是免费替换版素材，当前默认可见。' : '这是玩家挑战后解锁的奖励版素材。';
  unlockedList.innerHTML = `<div>${item.label}</div>`;
  show('result');
}

document.addEventListener('click', e => {
  const action = e.target.closest('[data-action]')?.dataset.action;
  const shot = e.target.closest('[data-shot]')?.dataset.shot;
  const open = e.target.closest('[data-open]')?.dataset.open;
  if (action) show(action);
  if (shot) shoot(shot);
  if (open) openGalleryItem(open);
});

renderGallery();
