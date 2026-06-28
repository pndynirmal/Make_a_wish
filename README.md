# 🌹 Happy Birthday Website

A premium, cinematic birthday website built with HTML, CSS, and JavaScript.

## Quick Setup

1. **Drop your files into the `assets/` folder:**
   - `music.mp3` — your song
   - `photo1.jpg` through `photo6.jpg` — your photos

2. **Customize the birthday date** in `script.js` (line ~96):
   ```js
   const TARGET = new Date(new Date().getFullYear(), 11, 25);
   // Change 11 = December (0-indexed), 25 = day
   ```

3. **Add her name** in `index.html`:
   - In the hero heading: change `My Love` to her name
   - In the footer: change `[Your Name]` to your name

4. **Edit the love letter** in `script.js`:
   - Find the `LETTER` constant and rewrite it in your own words

5. **Update photo captions** in `script.js`:
   - Find the `photos` array and edit each caption

## Sections

| Section | What it does |
|---|---|
| Hero | Full-screen starry sky with floating hearts & petals |
| Countdown | Live timer to her birthday |
| Timeline | Your love story, card by card |
| Gallery | Polaroid-style photo grid with lightbox |
| Letter | Animated envelope with typewriter effect |
| Reasons | 12 animated cards of reasons you love her |
| Gift Box | 3D gift box with confetti |
| Cake | Clickable candles + fireworks |
| Final | Cinematic closing with stars |

## Files

```
Birthday-Website/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── music.mp3
    ├── photo1.jpg
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    └── photo6.jpg
```

## Hosting (Free)

Upload the whole folder to:
- **Netlify Drop** — drag and drop at netlify.com/drop
- **GitHub Pages** — free and fast
- **Vercel** — one-click deploy

Made with ❤️
