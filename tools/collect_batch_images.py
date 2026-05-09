import json, re, base64, shutil
from pathlib import Path
from urllib import request
root = Path.home()/'.openclaw/generated/gpt-image/penalty-girls-batch'
root.mkdir(parents=True, exist_ok=True)
# Map generated run folders in chronological order to names from the ps1 script.
names = [
'hero-stadium-host','hero-goalkeeper-free','hero-fan-girl','hero-black-gold-vip',
'keeper-idle','keeper-left-dive','keeper-right-dive','keeper-victory',
'unlock-trophy-gold','unlock-locker-room','unlock-training','unlock-neon-card',
'unlock-red-kit','unlock-white-kit','unlock-rain-match','unlock-celebration']
# collect response paths newer than batch start by reading json files referenced in root plus latest timestamp dirs
responses = []
for p in sorted((Path.home()/'.openclaw/generated/gpt-image').glob('20260509-*')):
    rp = p/'response.json'
    if rp.exists() and p.name >= '20260509-102642':
        responses.append(rp)
print('responses', len(responses))
for name, rp in zip(names, responses):
    out = root/(name+'.png')
    if out.exists() and out.stat().st_size > 1000:
        print('exists', out.name, out.stat().st_size); continue
    payload = json.loads(rp.read_text(encoding='utf-8'))
    data = payload.get('data') or []
    if not data:
        print('no data', name, rp); continue
    item=data[0]
    if item.get('b64_json'):
        out.write_bytes(base64.b64decode(item['b64_json']))
    elif item.get('url'):
        req=request.Request(item['url'],headers={'User-Agent':'Mozilla/5.0'})
        out.write_bytes(request.urlopen(req,timeout=180).read())
    print('saved', out.name, out.stat().st_size)
