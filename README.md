# Cat Cafe Diner

An original cozy diner time-management demo starring Miso the cat and Chef Mochi. Seat guests, take orders, serve dishes, and keep the cafe happy.

## Play (web demo)

Open `index.html` in a desktop browser. No build step and no network needed — the game is a single self-contained file.

- Click a guest to seat them, click to take their order, and serve dishes from the kitchen.
- Menu: Fish Biscuits, Milk Tea, Berry Tart, Salmon Soup.
- Goal: reach the day's earnings target before closing.

## Windows desktop build (Steam target)

The same game as a standalone Windows desktop app (Electron 45.5.0), built for Steam. The Windows source lives in this repo:

- `main.js` — Electron main process (1280×800 window, no menu/devtools, clean quit)
- `app/index.html` — the game (same content as the web demo, with the money-making playbook systems built in)
- `package.json` / `package-lock.json` — Electron 45.5.0 + electron-packager 17.1.2

Run it:

```sh
npm install
npm start
```

Package the Windows `.exe` (from Linux, assembled from the official Electron win32 zip — `electron-packager` win32 needs Wine on Linux):

```sh
npm run pack-win
```

Output: `dist/CatCafeDiner-win32-x64/CatCafeDiner.exe`.

### What's built in (money-making playbook)

- "Tomorrow…" screen after each day-end (3 things: ready / 1 short of / surprise VIP)
- 5 patience hearts per guest + chain multiplier (×2–×4) + Expert thresholds with a post-shift breakdown
- 7-day escalating Daily ladder + Daily Special + streak freeze (1 free/week, extra buyable with in-game coins only)
- Persistent Café Level / dish skill / Regulars' friendship + Recipe Book, Regulars Album, Trophy Wall with % complete
- Cosmetic-only shop: 6 Miso outfits ($1.99–$4.99, one free), 2 themes ($4.99), $4.99 starter bundle — every price in real currency, all purchases simulated and labelled "Demo purchase — no real money"

Verification: `STATUS.md` and `VERIFICATION.md`. Final live pass (Electron, headless): Day 1 ★★★, $289 vs $55 goal, 19 served, 0 walk-outs. Zero console errors.

**Note:** the built `dist/` folder (358 MB of Electron binaries, including `CatCafeDiner.exe`) is NOT in this repo — GitHub can't host binaries that large here. The full Windows package including the `.exe` is backed up on pCloud. `dist/` rebuilds from this source with `npm run pack-win` plus the Electron win32 runtime.

## Credits

Original demo built as the example for a PromptBase diner game-builder listing. Miso, Chef Mochi, and the code are original.
