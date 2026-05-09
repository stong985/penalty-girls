$ErrorActionPreference = 'Continue'
$root = "$env:USERPROFILE\.openclaw\generated\gpt-image\penalty-girls-batch"
New-Item -ItemType Directory -Force -Path $root | Out-Null
$items = @(
  @{name='hero-stadium-host'; prompt='Vertical mobile game landing page key art, beautiful adult female football match host on night soccer stadium, emerald jersey, glossy wind-blown long hair, holding smartphone with match prediction UI, stadium floodlights, energetic crowd, commercial sports ad, tasteful, non-explicit, no nudity, no text, no logo, no watermark'},
  @{name='hero-goalkeeper-free'; prompt='Vertical soccer penalty challenge game splash art, beautiful adult female goalkeeper, green goalkeeper kit, gloves, holding soccer ball, confident smile, goal net and floodlights, polished mobile game poster, tasteful, non-explicit, no nudity, no text, no logo, no watermark'},
  @{name='hero-fan-girl'; prompt='Vertical football fan girl advertising artwork, beautiful adult woman in stylish soccer jersey and team scarf, long hair rim lit by stadium lights, cheering beside green pitch, confetti, mainstream sports campaign, tasteful, non-explicit, no text, no logo, no watermark'},
  @{name='hero-black-gold-vip'; prompt='Vertical premium black and gold sports game landing art, glamorous but tasteful adult female sports presenter with long wavy hair, black gold sporty blazer, soccer ball and trophy, night stadium lights, reward atmosphere, non-explicit, no text, no logo, no watermark'},
  @{name='keeper-idle'; prompt='Full body adult female soccer goalkeeper idle pose, green kit, gloves, athletic stance in front of goal net, long ponytail, mobile game character art, clean background stadium, tasteful non-explicit, no text no logo'},
  @{name='keeper-left-dive'; prompt='Dynamic full body adult female soccer goalkeeper diving left to save penalty, green kit, gloves, dramatic stadium lights, motion blur, mobile game character art, tasteful non-explicit, no text no logo'},
  @{name='keeper-right-dive'; prompt='Dynamic full body adult female soccer goalkeeper diving right to save penalty, green kit, gloves, dramatic stadium lights, motion blur, mobile game character art, tasteful non-explicit, no text no logo'},
  @{name='keeper-victory'; prompt='Full body adult female soccer goalkeeper victory pose after saving penalty, green kit, gloves, smiling, stadium confetti, mobile game character art, tasteful non-explicit, no text no logo'},
  @{name='unlock-trophy-gold'; prompt='Premium unlockable reward portrait, beautiful adult female football star goalkeeper with golden trophy and soccer ball, black gold sporty jacket, long wavy hair, stadium confetti, high-end mobile game art, tasteful non-explicit, no text no logo no watermark'},
  @{name='unlock-locker-room'; prompt='Premium unlockable reward art, adult female football star in stylish team jacket in modern locker room, trophy shelf, confident smile, glossy long hair, tasteful sports fashion, non-explicit, no text no logo no watermark'},
  @{name='unlock-training'; prompt='Unlockable training ground portrait, beautiful adult female goalkeeper stretching with soccer ball on practice field, sunrise stadium light, athletic kit, tasteful sports fashion, non-explicit, no text no logo'},
  @{name='unlock-neon-card'; prompt='Futuristic football player card reward art, beautiful adult female goalkeeper as collectible character card, neon blue green UI frame style but no readable text, stadium background, premium mobile game art, tasteful non-explicit, no logo watermark'},
  @{name='unlock-red-kit'; prompt='Unlockable alternate outfit, adult female football goalkeeper in red stylish goalkeeper kit, long hair, holding ball, night stadium, confident smile, polished mobile game art, tasteful non-explicit, no text no logo'},
  @{name='unlock-white-kit'; prompt='Unlockable alternate outfit, adult female football goalkeeper in white and gold goalkeeper kit, trophy pose, stadium lights, elegant sports fashion, tasteful non-explicit, no text no logo no watermark'},
  @{name='unlock-rain-match'; prompt='Cinematic rainy night football match portrait, beautiful adult female goalkeeper wet stadium atmosphere, green kit, gloves, dramatic rim light on hair, intense expression, tasteful sports drama, non-explicit, no text no logo'},
  @{name='unlock-celebration'; prompt='Victory celebration unlockable art, beautiful adult female football host and goalkeeper with confetti and fans, holding soccer ball, golden stadium lights, polished mobile game reward image, tasteful non-explicit, no text no logo'}
)
foreach ($item in $items) {
  $outJson = Join-Path $root ($item.name + '.json')
  if (Test-Path (Join-Path $root ($item.name + '.png'))) { continue }
  Write-Host "GENERATE $($item.name)"
  python .\skills\mountsea-gpt-image\openclaw_gpt_image.py generate --prompt $item.prompt --size 1024x1536 --n 1 | Tee-Object -FilePath $outJson
}
