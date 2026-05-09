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
  { id: 'free', type: '首屏', label: '免费替换版', unlockScore: 0, thumb: './assets/girls/girl01/free-thumb.jpg', full: './assets/girls/girl01/free.png' },
  { id: 'hero-stadium-host', type: '落地页', label: '赛事预测官', unlockScore: 0, thumb: './assets/girls/girl01/gallery/hero-stadium-host.jpg', full: './assets/girls/girl01/gallery/hero-stadium-host.jpg' },
  { id: 'hero-goalkeeper-free', type: '落地页', label: '守门员海报', unlockScore: 1, thumb: './assets/girls/girl01/gallery/hero-goalkeeper-free.jpg', full: './assets/girls/girl01/gallery/hero-goalkeeper-free.jpg' },
  { id: 'hero-fan-girl', type: '落地页', label: '球衣女粉', unlockScore: 1, thumb: './assets/girls/girl01/gallery/hero-fan-girl.jpg', full: './assets/girls/girl01/gallery/hero-fan-girl.jpg' },
  { id: 'hero-black-gold-vip', type: '高级', label: '黑金主持', unlockScore: 1, thumb: './assets/girls/girl01/gallery/hero-black-gold-vip.jpg', full: './assets/girls/girl01/gallery/hero-black-gold-vip.jpg' },
  { id: 'keeper-idle', type: '角色', label: '守门待机', unlockScore: 2, thumb: './assets/girls/girl01/gallery/keeper-idle.jpg', full: './assets/girls/girl01/gallery/keeper-idle.jpg' },
  { id: 'keeper-left-dive', type: '角色', label: '左扑动态', unlockScore: 2, thumb: './assets/girls/girl01/gallery/keeper-left-dive.jpg', full: './assets/girls/girl01/gallery/keeper-left-dive.jpg' },
  { id: 'keeper-right-dive', type: '角色', label: '右扑动态', unlockScore: 2, thumb: './assets/girls/girl01/gallery/keeper-right-dive.jpg', full: './assets/girls/girl01/gallery/keeper-right-dive.jpg' },
  { id: 'keeper-victory', type: '角色', label: '扑救胜利', unlockScore: 2, thumb: './assets/girls/girl01/gallery/keeper-victory.jpg', full: './assets/girls/girl01/gallery/keeper-victory.jpg' },
  { id: 'unlock-trophy-gold', type: '奖励', label: '金杯奖励', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-trophy-gold.jpg', full: './assets/girls/girl01/gallery/unlock-trophy-gold.jpg' },
  { id: 'unlock-locker-room', type: '奖励', label: '更衣室收藏', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-locker-room.jpg', full: './assets/girls/girl01/gallery/unlock-locker-room.jpg' },
  { id: 'unlock-training', type: '奖励', label: '训练场收藏', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-training.jpg', full: './assets/girls/girl01/gallery/unlock-training.jpg' },
  { id: 'unlock-neon-card', type: '奖励', label: '霓虹球员卡', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-neon-card.jpg', full: './assets/girls/girl01/gallery/unlock-neon-card.jpg' },
  { id: 'unlock-red-kit', type: '皮肤', label: '红色球衣', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-red-kit.jpg', full: './assets/girls/girl01/gallery/unlock-red-kit.jpg' },
  { id: 'unlock-white-kit', type: '皮肤', label: '白金球衣', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-white-kit.jpg', full: './assets/girls/girl01/gallery/unlock-white-kit.jpg' },
  { id: 'unlock-rain-match', type: '奖励', label: '雨夜比赛', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-rain-match.jpg', full: './assets/girls/girl01/gallery/unlock-rain-match.jpg' },
  { id: 'unlock-celebration', type: '奖励', label: '胜利庆祝', unlockScore: 3, thumb: './assets/girls/girl01/gallery/unlock-celebration.jpg', full: './assets/girls/girl01/gallery/unlock-celebration.jpg' },
  { id: 'unlocked', type: '终极', label: '解锁奖励版', unlockScore: 3, thumb: './assets/girls/girl01/unlocked-thumb.jpg', full: './assets/girls/girl01/unlocked.png' },
];

let state = { round: 1, score: 0, locked: false };
let save = loadSave();

function loadSave() {
  try { return JSON.parse(localStorage.getItem(saveKey)) || { unlocked: ['free', 'hero-stadium-host'] }; }
  catch { return { unlocked: ['free', 'hero-stadium-host'] }; }
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
  const best = [...galleryItems].reverse().find(item => item.unlockScore <= state.score);
  setResultBackground(best?.full || './assets/girls/girl01/free.png');
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
  galleryDesc.textContent = '免费首屏 + 落地页素材 + 通关奖励图，进球越多开放越多。';
  galleryGrid.innerHTML = galleryItems.map(item => {
    const open = unlocked.has(item.id);
    return `<button class="card ${open ? '' : 'locked'}" data-open="${item.id}">
      <div class="thumb" style="background-image:url('${item.thumb}')"></div>
      <div class="label">${open ? item.type + ' · ' + item.label : `未解锁 · ${item.unlockScore}球`}</div>
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
  rewardText.textContent = `${item.type}素材 · ${item.label}`;
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
