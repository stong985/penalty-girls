from pathlib import Path
from PIL import Image
src_root = Path.home()/'.openclaw/generated/gpt-image/penalty-girls-batch'
targets = [Path('.'), Path('penalty-girls'), Path('penalty-girls-deploy')]
names = [
'hero-stadium-host','hero-goalkeeper-free','hero-fan-girl','hero-black-gold-vip',
'keeper-idle','keeper-left-dive','keeper-right-dive','keeper-victory',
'unlock-trophy-gold','unlock-locker-room','unlock-training','unlock-neon-card',
'unlock-red-kit','unlock-white-kit','unlock-rain-match','unlock-celebration'
]
for target in targets:
    for name in names:
        src = src_root/(name+'.png')
        if not src.exists(): continue
        out = target/'assets/girls/girl01/gallery'/(name+'.jpg')
        out.parent.mkdir(parents=True, exist_ok=True)
        im = Image.open(src).convert('RGB').resize((512,768), Image.Resampling.LANCZOS)
        im.save(out, optimize=True, quality=88)
        print(out, out.stat().st_size)
