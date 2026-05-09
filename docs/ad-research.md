# Penalty Girls 广告与素材研究记录

> 更新时间：2026-05-09  
> 目的：把“足球/体育游戏 + 美女肖像/头发/广告展示形式”的调研结论沉淀下来，避免只停留在聊天记录里。

## 1. 已参考的公开来源

### 中文素材与落地页

1. 包图网：足球宝贝素材专题  
   URL: https://ibaotu.com/tupian/zuqiubaobei.html  
   观察：常见“球衣美女/足球宝贝 + 球场 + 大标题 + CTA”构图。人物通常右侧大半身，左侧留文案空间；长发、卷发、高马尾、球衣、啦啦队服是高频元素。

2. 包图网：体育游戏素材专题  
   URL: https://ibaotu.com/tupian/tiyuyouxi.html  
   观察：偏竞技、比分牌、奖杯、霓虹、电光、球场背景。美女如果出现，多承担主持/引导/啦啦队角色，而不是纯人物写真。

3. 包图网：棋牌游戏素材专题  
   URL: https://ibaotu.com/tupian/qipaiyouxi.html  
   观察：黑金背景、金币、筹码、扑克/麻将、美女荷官/主持人。对“奖励版/黑金解锁版”有参考价值。

4. 腾讯棋牌官网  
   URL: https://qipai.qq.com/  
   观察：官方页更克制，靠赛事、奖金、游戏入口、二维码和下载 CTA 建立信任。美女更适合放活动 Banner，而不是全站核心。

5. 海外棋牌网页游戏平台  
   URL: https://www.haiwaiqipai.com/  
   观察：强调免安装、免插件、免注册、免费、绿色娱乐。落地页要降低进入门槛。

### 海外 Sportsbook / 体育竞猜落地页

6. Caesars Sportsbook  
   URL: https://www.caesars.com/sportsbook-and-casino  
   观察：首屏 CTA、地域选择、Join Now、Get the App、How It Works、Rewards、Responsible Gaming。结构很适合拆成移动落地页。

7. FanDuel Sportsbook  
   URL: https://www.fanduel.com/sportsbook  
   观察：页面有地域/CloudFront 限制，但搜索摘要可见核心方向：best odds、favorite sports、place a bet。

8. DraftKings Sportsbook  
   URL: https://sportsbook.draftkings.com/  
   观察：品牌口号“The Crown is Yours”、legal and secure、多运动覆盖、App download。

9. BetMGM Sportsbook  
   URL: https://www.betmgm.com/en/sports  
   观察：黑金/王冠/King of Sportsbooks/promo/parlay play，适合“高级解锁奖励”视觉参考。

10. Meta Ad Library / TikTok Creative Center 入口  
   Meta: https://www.facebook.com/ads/library/  
   TikTok: https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en  
   观察：抓取受限，但人工复核可搜关键词：soccer betting、football betting app、sportsbook bonus、fantasy soccer、football manager game、casino football。

## 2. 视觉规律总结

1. 美女不是单独卖点，必须和足球/奖励/玩法绑定。
2. 高点击首屏常用“右侧人物 + 左侧文案 + 底部 CTA”。
3. 足球识别元素必须明显：球场、球、球门、比分牌、聚光灯、球衣。
4. 头发是美女广告的强吸睛点：长发、风感、边缘高光、夜场背光。
5. 免费版应偏清爽运动：绿茵、球衣、守门员、亲和微笑。
6. 解锁版应偏高级奖励：黑金、奖杯、金币/光效、胜利表情。
7. 游戏内收藏图数量不能太少，至少要有首屏、角色、动作、奖励、皮肤几组。
8. 文案避免“稳赚、暴富、提现”等高风险表达，改成预测挑战、赛事福利、奖励、收藏、通关解锁。
9. 如果偏足球游戏，美女角色更适合定义为：赛事预测官、守门员、经理助理、女主持、球衣女神。
10. 落地页结构建议：首屏 KV → 玩法/奖励 → 收藏展示 → CTA → 合规/绿色娱乐提示。

## 3. 本轮已生成/接入素材

### 已接入主图

- `assets/girls/girl01/free.png`：免费默认主视觉。
- `assets/girls/girl01/unlocked.png`：通关/高分解锁奖励主视觉。
- `assets/girls/girl01/free-thumb.jpg`
- `assets/girls/girl01/unlocked-thumb.jpg`

### 已生成并接入收藏/落地页图库

- `assets/girls/girl01/gallery/hero-stadium-host.jpg`
- `assets/girls/girl01/gallery/hero-goalkeeper-free.jpg`
- `assets/girls/girl01/gallery/hero-fan-girl.jpg`
- `assets/girls/girl01/gallery/hero-black-gold-vip.jpg`
- `assets/girls/girl01/gallery/keeper-idle.jpg`
- `assets/girls/girl01/gallery/keeper-left-dive.jpg`
- `assets/girls/girl01/gallery/keeper-right-dive.jpg`
- `assets/girls/girl01/gallery/keeper-victory.jpg`
- `assets/girls/girl01/gallery/unlock-trophy-gold.jpg`
- `assets/girls/girl01/gallery/unlock-locker-room.jpg`
- `assets/girls/girl01/gallery/unlock-training.jpg`
- `assets/girls/girl01/gallery/unlock-neon-card.jpg`
- `assets/girls/girl01/gallery/unlock-red-kit.jpg`
- `assets/girls/girl01/gallery/unlock-white-kit.jpg`
- `assets/girls/girl01/gallery/unlock-rain-match.jpg`
- `assets/girls/girl01/gallery/unlock-celebration.jpg`

### 本轮素材数量

- 主图/缩略图：4 张。
- 扩展图库：16 张。
- 合计接入图片资源：20 张。

### 生成源文件

批量生成原图保存在本机：`~/.openclaw/generated/gpt-image/penalty-girls-batch/`。仓库中接入的是压缩后的 JPG/PNG，以控制 Pages 体积。

## 4. 生成 Prompt 方向

### 免费首屏

```text
Vertical soccer penalty challenge game splash art, beautiful adult female goalkeeper, green goalkeeper kit, gloves, holding soccer ball, confident smile, goal net and floodlights, polished mobile game poster, tasteful, non-explicit, no nudity, no text, no logo, no watermark
```

### 赛事预测官

```text
Vertical mobile game landing page key art, beautiful adult female football match host on night soccer stadium, emerald jersey, glossy wind-blown long hair, holding smartphone with match prediction UI, stadium floodlights, energetic crowd, commercial sports ad, tasteful, non-explicit, no nudity, no text, no logo, no watermark
```

### 黑金奖励版

```text
Premium unlockable reward portrait, beautiful adult female football star goalkeeper with golden trophy and soccer ball, black gold sporty jacket, long wavy hair, stadium confetti, high-end mobile game art, tasteful non-explicit, no text no logo no watermark
```

## 5. 执行教训

- 不能只改源码子目录；GitHub Pages 实际部署根目录，所以 `index.html/game.js/style.css/assets` 根目录必须同步。
- 不能只在聊天里总结；调研和素材清单必须写入仓库文档。
- 不应该空耗 token 做长篇口头总结却只产少量素材。素材生成应批处理、落盘、接入、验证、提交。
- Workspace 顶层要保持干净，临时脚本应归档到 `tools/` 或删除。
