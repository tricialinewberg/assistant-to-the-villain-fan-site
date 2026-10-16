from PIL import Image
from pathlib import Path
root=Path('.')
for p in (root/'reference').rglob('*.png'):
 im=Image.open(p); print(p.name,im.size)
# All crops retain the designer's pixels. No generated substitute artwork.
im=Image.open('reference/screens/03-history-books-author.png')
w,h=im.size
# Coordinates are measured in the 753 x 2048 export.
for name,box in {'book-1':(148,326,282,533),'book-2':(148,589,282,791),'book-3':(148,849,285,1055),'book-4':(143,1104,280,1308),'author':(91,1669,350,1916)}.items():
 im.crop(tuple(round(v*w/753) if i%2==0 else round(v*h/2048) for i,v in enumerate(box))).save(f'public/assets/{name}.png')
im=Image.open('reference/boards/visual-elements.png')
w,h=im.size
for i,box in enumerate([(30,1090,89,1150),(89,1090,148,1150),(30,1157,89,1218),(89,1157,148,1218)]):
 im.crop(tuple(round(v*w/777) if j%2==0 else round(v*h/2048) for j,v in enumerate(box))).save(f'public/assets/kingsley-{i+1}.png')
im=Image.open('reference/screens/04-characters.png')
for name,x in [('evie-sage',214),('trystan-maverine',606),('becky-erring',998)]:
 im.crop((x,461,x+139,600)).save(f'public/assets/{name}-complete.png')
for name in ['stained-glass','ceiling-decor','poison-potion','hr-clipboard']:
 Image.open(f'public/assets/{name}.png').crop((10,13,73,76)).save(f'public/assets/{name}-trimmed.png')
Image.open('public/assets/castle-stone.png').crop((2,7,135,106)).save('public/assets/castle-stone-tile.png')
