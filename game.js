const screens = [...document.querySelectorAll('.screen')];
const keeper = document.getElementById('keeper');
const ball = document.getElementById('ball');
const resultFlash = document.getElementById('resultFlash');
const roundText = document.getElementById('roundText');
const scoreText = document.getElementById('scoreText');
const hintText = document.getElementById('hintText');
const finalTitle = document.getElementById('finalTitle');
const rewardText = document.getElementById('rewardText');
const unlockedList = document.getElementById('unlockedList');
const galleryGrid = document.getElementById('galleryGrid');
const galleryProgress = document.getElementById('galleryProgress');

const directions = ['left', 'center', 'right'];
const saveKey = 'penaltyGirlsSave.v1';
const galleryItems = [
  { id: 'static-01', type: '静态', label: '登场海报', unlockScore: 1, thumb: './assets/girls/girl01/gallery/static-01.svg' },
  { id: 'static-02', type: '静态', label: '守门姿态', unlockScore: 2, thumb: './assets/girls/girl01/gallery/static-02.svg' },
  { id: 'static-03', type: '静态', label: '胜利展示', unlockScore: 3, thumb: './assets/girls/girl01/gallery/static-03.svg' },
  { id: 'static-04', type: '静态', label: '训练后展示', unlockScore: 3, thumb: './assets/girls/girl01/gallery/static-04.svg' },
  { id: 'video-01', type: '动态', label: '登场动态', unlockScore: 3, thumb: './assets/girls/girl01/gallery/video-01.svg' },
  { id: 'video-02', type: '动态', label: '扑救动态', unlockScore: 4, thumb: './assets/girls/girl01/gallery/video-02.svg' },
];

let state = { round: 1, score: 0, locked: false };
let save = loadSave();

function loadSave() {
  try { return JSON.parse(localStorage.getItem(saveKey)) || { unlocked: ['static-01'] }; }
  catch { return { unlocked: ['static-01'] }; }
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
function endGame() {
  unlockRewards(state.score);
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
  const imageTotal = galleryItems.filter(i => i.type === '静态').length;
  const videoTotal = galleryItems.filter(i => i.type === '动态').length;
  const imageCount = galleryItems.filter(i => i.type === '静态' && unlocked.has(i.id)).length;
  const videoCount = galleryItems.filter(i => i.type === '动态' && unlocked.has(i.id)).length;
  galleryProgress.textContent = `静态 ${imageCount}/${imageTotal} · 动态 ${videoCount}/${videoTotal}`;
  galleryGrid.innerHTML = galleryItems.map(item => {
    const open = unlocked.has(item.id);
    return `<div class="card ${open ? '' : 'locked'}">
      <div class="thumb" style="background-image:url('${item.thumb}')"></div>
      <div class="label">${open ? item.type + ' · ' + item.label : '未解锁'}</div>
    </div>`;
  }).join('');
}

document.addEventListener('click', e => {
  const action = e.target.closest('[data-action]')?.dataset.action;
  const shot = e.target.closest('[data-shot]')?.dataset.shot;
  if (action) show(action);
  if (shot) shoot(shot);
});

renderGallery();
