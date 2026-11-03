# Kid on Robinhood — website

Static frontend: HTML + CSS + vanilla JS. No build step.

## Open locally
Double-click `index.html`, or run a local server from this folder:

    npx serve .

## After launch — edit only `config.js`
- `ticker` — your ticker, e.g. `$KID`
- `contractAddress` — the token CA (`0x...`). The "Copy" button and the Blockscout link start working automatically.
- `links.buy` — token page on Pools
- `links.chart` — GMGN / DexScreener chart
- `links.x`, `links.telegram` — your socials

Empty links show as "Coming soon".

## Deploy (free)
Drag the whole folder into Netlify Drop (app.netlify.com/drop), or push to GitHub and import on Vercel.

## Files
- `index.html` — page structure
- `style.css` — design
- `script.js` — copy button, links, animations
- `config.js` — your settings
- `assets/favicon.svg` — tab icon
