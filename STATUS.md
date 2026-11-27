# Cat Cafe Diner Demo — Windows Desktop (Electron) — STATUS

**Platform:** Windows Steam desktop (standalone .exe, Electron). NOT a web game.
**Date:** 2026-11-27. **Status: STABLE — D5 and D6 are FIXED and VERIFIED LIVE.
Full pass (run 10) found nothing left to fix for everything verifiable
without human hardware.**
Full report: `VERIFICATION.md`.

## What was built

- Electron **45.5.0** (`electron@45`, `npm install` OK). Node 24 / npm 10.
- Project: `~/workspace/demo-windows-20261127/cat-cafe/`
  - `package.json` — name `cat-cafe-diner-demo`, version 1.0.0, main `main.js`
  - `main.js` — BrowserWindow (default 1280x800, `--window-size=WxH` launch
    hook), title "Cat Cafe Diner Demo", `loadFile(app/index.html)`, no menu,
    no devtools, `sandbox:true` + `contextIsolation:true`, clean quit on
    window-all-closed. Launch flags used in this VM (root): `--no-sandbox`
    plus SwiftShader `--use-gl=angle --use-angle=swiftshader
    --enable-unsafe-swiftshader`.
  - `app/index.html` — byte-identical copy of the current source
    (**94,865 bytes, md5 `3e54bcb3ba689b8ec09f97e1efae033e`** — NEWER than
    the previous copy: 94,667 bytes, md5 `2c15e86fd9ed41f88763c38032343674`).
    Both fixes present in the copy (verified by grep): `renderMetaBar()`
    in the freeze/outfit/theme/bundle buy handlers and `shopClose`;
    `collectTable()` credits `save.daily.earned`, old finish-eating
    pre-credit gone. Source under `~/workspace/ts-spaces/` NEVER edited.
- Drivers: `drive10.js` (full pass + D5/D6 live checks, this round),
  `drive11.js` (grab routes, poll-based), `drive12.js` (pass-click retest),
  `drive7.js` (full pass, prior round), `drive8/9.js` (grab routes, prior
  round), `drive3.js` (full pass, prior rounds), `drive4/5/6.js` (prior
  follow-ups), `smoke.js`, `run-verify*.sh`, `run-smoke.sh [WxH] [tag]`.
- Win32 folder: `dist/CatCafeDiner-win32-x64/` (358 MB) — re-packaged this
  round from the new copy (manual assembly; see F2): `resources/app/app/
  index.html` md5 == source (`3e54bcb3…`).

## Live verification (Linux build, Xvfb :97, CDP) — THIS ROUND

### Run 10 — full pass, fresh save (`drive10.js`, ~10:15–10:23 IST) — PASS
- **Day 1: ★★★, $289 vs goal $55, 19 served, 0 walk-outs, best chain ×2,
  12 batched deliveries, 18 favourites, bank $289, coins 80, 7 trophies.
  Expert NOT met this run (needs ×4 chain; day-end honestly reports
  "not yet") — Expert was met in runs 3 and 7 (×4); the mechanic is
  verified, this run is driver variance, not a defect.**
- **D5 FIXED + VERIFIED LIVE:** after the Streak Freeze buy (80 → 30
  coins) the title metaBar read "🪙 30 coins" both with the shop still
  open and after `shopClose` — and "0 coins" after the Pink Bow outfit
  buy. Screenshot `evidence/run10/18-title-after-freeze.png` shows the
  "30 coins" chip visually. (`evidence/run10/d5-check.json`, all 3 PASS.)
- **D6 FIXED + VERIFIED LIVE:** Day 1 end — `dayMoney` $289 and
  `save.daily.earned` $289, **gap $0 exactly** (was $258 vs $245, gap $13
  in run 7). Bank and `stats.earned` also $289 — no double-count.
  (`evidence/run10/d6-check.json`, `equal: true`.) Caveat: today's
  visible Daily Special is chain-type (27 % 5 = 2), so the earned-progress
  equality was verified via the save + the exact `renderDaily()` expression
  (line 1513), not via the panel's earned line — the panel reads that same
  counter, so on an earned-special day it will display the exact total.
- **D2/D3/D4 still FIXED:** title shows zero table numbers (runtime
  `tableLabel` early return confirmed); Album 100%, 8/8 met, all heart
  spans one line; Daily sub "Streak: 1 day".
- **Shop demo purchase end-to-end PASS:** Pink Bow $1.99 → "Wearing ✓",
  persisted in localStorage + on reopen; Miso visibly wears the bow.
- **Tomorrow screen PASS:** exactly 3 items (Tuna Melt recipe / 1 short of
  Salmon Soup Skill Lv 3 / VIP Captain). **Next day PASS:** Enter → Day 2
  starts, `pendingUnlock: tuna`.
- **Daily ladder + claim PASS:** claim Day 1 +20 coins (0 → 20).
- **Dock sweep mid-play (Day 2):** dShop/dAlbum/dDaily/dAch each open +
  close; dMusic On→Off→On; dPause button → pause veil → Resume;
  **dMenu → title**. All PASS.
- **Patience hearts live (Day 2):** Noir 5→4→3→2 hearts orange →
  1 heart red + 💢 + red halo + angry face → walk-out (angry=1).
  Screenshots `evidence/run10/15-walkout.png`, `16-two-hearts.png`,
  `17-one-heart.png`.
- **Freeze funded PASS:** 80 → 30 coins, freezes 1 → 2, toast "Streak
  Freeze bought with coins!". **Freeze blocked PASS:** second freeze at
  30 coins → toast "Not enough coins yet — claim Daily rewards! 🎁",
  save unchanged.
- **Pause/resume (clock frozen 26.2 s → 26.2 s), Play/Shop/Trophies/Help/
  Album/Recipes/Daily, all keyboard (1–6/C/Space/P/Esc/Enter/S/H), table
  clicks — all verified.**
- **Console: 0 messages, 0 errors, 0 exceptions, 0 failed requests.**
  Clean quit in 4 s, 0 strays.

### Run 11 — grab routes, poll-based (`drive11.js`, ~10:24 IST)
- Button PASS (t+2 s), C-key PASS (t+4 s), Space PASS (t+2 s).
  Pass-click first read FAIL was a driver-check artifact (F13): Miso
  picked up 2 dishes (carrying 0→2) because a second dish landed on the
  pass mid-walk and the pickup takes all — the strict `===1` check
  failed on a working route. Cleared in run 12.
  Console 0/0/0/0. Clean quit in 1 s, 0 strays.

### Run 12 — pass-click retest (`drive12.js`, ~10:25 IST) — PASS
- Miso 58 design units from the pass → clicked pass → carrying 0 → 1,
  pass 1 → 0 within 1 game-second. **All four grab routes verified on the
  new build: button ✓, C ✓, Space ✓, pass click ✓.**
  Console 0/0/0/0. Clean quit in 1 s, 0 strays.

### Smoke — 1024×640 (new copy, ~10:25 IST) — PASS
- Loads, title visible, all 8 dock buttons, DOM overlap: none, overflow:
  none, scrollW==innerW, scrollH==innerH. Console 0/0/0/0. Clean quit in
  2 s. Screenshot `evidence/smoke-title-1024x640.png`: D2 fix holds,
  no table numbers, chalkboard readable, logo clear, sun un-clipped.
  (Dock wraps to 2 rows — N1.)

### No-browser-dependency — VERIFIED (static)
- Game file has **zero external URLs**; loads via `loadFile` (`file://`).

## Win32 package — ASSEMBLED, NOT executed
- `electron-packager` for win32 FAILS on Linux (Wine missing, exit 1) — see
  F2. Workaround: official `electron-v45.5.0-win32-x64.zip` (158 MB),
  unpacked to `dist/CatCafeDiner-win32-x64/`, `electron.exe` renamed to
  `CatCafeDiner.exe`, app files copied to
  `resources/app/{package.json, main.js, app/index.html}`,
  `default_app.asar` removed. Re-copied this round: `resources/app/app/
  index.html` md5 == new source (`3e54bcb3…`), `main.js` matches,
  exe is `PE32+ executable (GUI) x86-64`, total 358 MB. **The .exe was NOT
  executed** (Linux cannot run it) — needs a real Windows machine. **No
  version metadata stamped** on the exe (needs Wine or a Windows machine).

## Defects — GAME code (none open; exact descriptions in VERIFICATION.md §5)
- **D1–D4 — FIXED + VERIFIED** (prior rounds; re-confirmed live this round).
- **D5 — FIXED + VERIFIED (this round).** `renderMetaBar()` now called in
  the freeze buy handler, outfit buy, theme buy, theme equip, bundle buy,
  and `shopClose`. Live: metaBar coin chip matches the new balance
  immediately after purchase, shop open and closed.
- **D6 — FIXED + VERIFIED (this round).** `collectTable()` now does
  `save.daily.earned = (save.daily.earned||0) + amt` on every collection;
  the old finish-eating pre-credit is removed. Live: Day 1
  `daily.earned` $289 == `dayMoney` $289 exactly, gap $0.
- Notes (not defects): N1 dock wraps to 2 rows at both sizes; N2 Day 1 goal
  $55 is easy ($289 beaten by driver) — Expert is the real challenge, and
  it was NOT met in run 10 (best chain ×2 vs ×4 needed; met in runs 3, 7).

## Defects — mine (Electron shell / drivers), all FIXED
- **F1–F12** — see VERIFICATION.md §6 (prior rounds; all fixed).
- **F13** (this round) `drive11.js` pass-click verdict used strict
  `carryAfter === carryBefore + 1`. Miso's pickup takes ALL dishes on the
  pass (capacity 2), so when a second dish lands mid-walk, carrying goes
  0 → 2 and the check fails on a working route (run 11: carrying 0→2,
  pass 1→1 with 2 dishes picked up and new ones landing). Fix: verdict
  is `carryAfter >= carryBefore + 1` (carrying can only increase via a
  pass pickup). Re-verified in run 12 (0→1, pass 1→0 in 1 game-second).

## Remaining gaps (explicit)
- Windows `.exe` NOT executed — needs a real Windows machine.
- Sound by ear — not verified (WebAudio beeps exist; no human listen).
- Steam depot/upload steps — need a Steam partner account; not done.
- Nothing was pushed, uploaded, submitted or deleted. Nothing under
  `~/workspace/ts-spaces/` was edited.
