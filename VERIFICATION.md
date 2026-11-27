# Cat Cafe Diner Demo — Windows Desktop (Electron) — FULL VERIFICATION

**Platform:** Windows Steam desktop (standalone .exe, Electron). NOT a web game.
**Date:** 2026-11-27. **Verdict: STABLE — D5 and D6 are FIXED and VERIFIED LIVE.
The full pass (run 10) found nothing left to fix for everything verifiable
without human hardware.** No game-code defect remains open. One driver-check
artifact (F13) was found and fixed during this round; it was not a game defect.

## 1. Re-copy + re-package (this round)

- Source: `~/workspace/ts-spaces/cat-cafe-diner-demo/index.html` — **94,865 bytes,
  md5 `3e54bcb3ba689b8ec09f97e1efae033e`**. Previous copy was 94,667 bytes /
  `2c15e86fd9ed41f88763c38032343674` — the new copy is NEWER (+198 bytes).
- App copy: `app/index.html` — same size + md5 (verified identical after `cp`).
- Both fixes present in the copy (grep-verified):
  - D5: `renderMetaBar()` in the freeze buy handler (line 1453), the outfit
    buy handler (line 1438), the theme buy handler (line 1446), the bundle
    handler (line 1449), the "Wear it" / "Use theme" handlers (lines 1437,
    1445), and `shopClose` (line 1581).
  - D6: `collectTable()` line 650 now does
    `save.daily.earned = (save.daily.earned||0) + amt`; the old finish-eating
    pre-credit (`save.daily.earned = dayMoney + tb.pending`) is gone — the
    serve handler (line 763) now carries only the explanatory comment
    "daily.earned is credited in collectTable(), when the money is actually
    collected". `daily.earned` is reset to 0 at rollover (line 415) and read
    by `renderDaily()` (line 1513).
- Zero external URLs in the game file (no `http://`/`https://` matches) — no browser
  or server dependency; loads via `loadFile` (`file://`).
- Win32 folder re-packaged the same manual way (electron-packager win32 still
  fails on Linux without Wine — see F2): `dist/CatCafeDiner-win32-x64/` (358 MB).
  `resources/app/app/index.html` md5 = `3e54bcb3…` (matches new source),
  `resources/app/main.js` md5 matches the Linux build,
  `CatCafeDiner.exe` = `PE32+ executable (GUI) x86-64`. **The .exe was NOT
  executed** (Linux cannot run it) — needs a real Windows machine. No version
  metadata stamped (needs Wine or Windows).

## 2. Live verification — Linux build (Xvfb :97, CDP :9223, Electron 45.5.0)

### Run 10 — full pass, fresh save (`drive10.js`, ~10:15–10:23 IST)
- **Title @1280×800:** loads, `file://`, `window.__cafe` present, all 7 title
  buttons, metaBar chips (Café Level 1 · Recipes 0% · Regulars 0% · Trophies 0% ·
  Streak 1 day · 0 coins). DOM overlap: none; overflow: none. Geometry:
  logo x409–872 does NOT overlap chalkboard x24–324/y120–232; subtitle and
  buttons clear of it; sun at (1216,62) NOT clipped. Screenshot
  `evidence/run10/01-title-1280x800.png` — chalkboard fully readable,
  logo/subtitle/buttons/cats/sun all clear, **zero table numbers visible
  anywhere on the title screen**. **D1 (title overlap) still FIXED; D2 FIXED
  (see §2a).** Title cats seated at tables [0,3,5] as specified.
- **Trophies:** opens, 0/10 earned, 10 rows, closes. **Help:** opens; mentions
  5 hearts, Chains, Expert target, Regulars; closes. **Album (pre-play):**
  8 Mystery Cat cards, 0% complete, 0/8 met, 5 hearts each (one line).
  **Recipes:** opens, 0% complete, 4 menu + 2 locked future dishes.
  **Daily:** 7-day ladder (Day 1 +20 coins → Day 7 Flower Crown outfit),
  Daily Special "Reach a ×3 chain today — progress 0/3" (today's special is
  chain-type: 27 % 5 = 2), streak milestones 7/30/100 days, freeze
  explanation. Sub reads **"Streak: 1 day · Freezes: 1 · Total days played: 1"**
  — **D4 FIXED.** Claim Day 1: coins 0 → 20, button becomes
  "Claimed today ✓". **PASS.**
- **Shop (0 coins):** 11 rows — 6 outfits (Free–$4.99), 3 themes (Free–$4.99),
  Starter Bundle $4.99, Extra Streak Freeze 50 coins. Headers state
  "visual only, no stat boosts" / "soft currency only, never real money";
  sim-note: "Demo purchase — no real money. Every price below is the
  real-currency price shown plainly". No random boxes, no pay-to-win.
  Freeze blocked at 0 coins: save unchanged.
- **Shop demo purchase (funded, end-to-end):** Pink Bow $1.99 → toast "Demo
  purchase complete — Miso wears the Pink Bow! (no real money)",
  `save.outfit=bowpink`, `ownedOutfits={classic:1,bowpink:1}`, row becomes
  "Wearing ✓" disabled, persisted in localStorage and on modal reopen.
  Miso visibly wears the pink bow in-game afterwards (clear in
  `evidence/run10/14-album-after-day1.png` and `18-title-after-freeze.png`).
  **PASS.** **D5 (outfit) check:** after `shopClose` the metaBar read
  "🪙 0 coins" matching `save.coins` 0 — **PASS**
  (`evidence/run10/d5-check.json`, `bow.chipShowsCoins: true`).
- **Day 1 autoplay** (real mouse/keyboard + batched `update(0.05)`,
  91 s wall): **★★★, $289 vs goal $55, 19 guests served, 0 walk-outs,
  best chain ×2, 12 batched deliveries, 18 favourites served, bank $289,
  coins 80, 7 trophies earned** (first, rush, s10, rich, calm, stars3 +
  one more — `ach` shows first/s10/rush/combo5/rich/calm/stars3).
  Actions: 52 order keys, 54 table clicks, 30 pass clicks, 19 collects,
  grab button 1, C 1, Space 1.
  **Expert NOT met this run** — "Expert target $55 · ×4 chain · 0 walk-outs
  — not yet" on the day-end breakdown (best chain ×2 < ×4). Expert WAS met
  in runs 3 and 7 (×4); the mechanic (chain meter, Expert label, honest
  "not yet") is verified — this run is autoplay variance, not a defect.
  See §5 N2.
- **Pause/resume:** P opens pause veil, game clock frozen (26.2 s → 26.2 s
  over 1.2 s real), Resume button unpauses. **Music:** dock toggle
  On → Off → On. **Grab Dish:** button, C, Space, pass-click all used in
  autoplay (per-route timed verification in runs 11–12, see below).
- **Day-end summary:** "Day 1 Complete!", ★★★, 8 stat tiles (Earned $289;
  Expert target $55 · ×4 chain · 0 walk-outs — not yet; Guests served 19;
  Angry walk-outs 0; Best chain ×2; Batched deliveries 12; Favourites
  served 18 ♥; Bank/Coins $289 · 80 coins), "Purr-fect day!".
- **D6 LIVE CHECK (at day end):** `dayMoney` $289, `save.daily.earned` $289,
  earned progress 289, **equal: true, gap: 0** — the Daily Special earned
  counter now equals the day's actual collected earnings exactly (was
  $258 vs $245, gap $13, in run 7). Bank $289 and `stats.earned` $289 agree
  — no double-count from the removed pre-credit. **D6 FIXED.**
  (`evidence/run10/d6-check.json`.) Scope note: today's visible Special is
  chain-type, so the equality was verified via the save + the exact
  `renderDaily()` expression (line 1513) that the panel uses for the earned
  metric — the panel reads that same counter, so on an earned-special day
  it will display the exact total.
- **Tomorrow screen:** exactly **3 items** — (1) "Ready tomorrow: Tuna Melt
  recipe — Serve 25 dishes total — it unlocks while you sleep, at the day
  boundary", (2) "You are exactly 1 short of: Salmon Soup Skill Lv 3",
  (3) "A surprise visitor: VIP cat Captain is visiting tomorrow — serve a
  favourite to win a friendship heart!". **PASS.**
- **Next day:** Enter on Tomorrow → Day 2 starts (screen play, day 2,
  `pendingUnlock: tuna`).
- **Dock sweep mid-play (Day 2):** dShop, dAlbum, dDaily, dAch each open
  their veil and close it again; dMusic On→Off→On; dGrab clicked (pass
  empty at the time, carrying 0→0); dPause button opens the pause veil,
  Resume unpauses; **dMenu → title**. All PASS
  (`evidence/run10/dock-sweep.json`).
- **Patience hearts live (Day 2):** took NO orders; watched Noir (table 0)
  drain 5 → 4 → 3 → **2 hearts orange** (t=31.6 s, screenshot
  `16-two-hearts.png`) → **1 heart red + 💢 + red halo + angry face**
  (screenshot `17-one-heart.png`) → **walk-out** (stats.angry 1, screenshot
  `15-walkout.png`). **Mechanic (b) verified LIVE in full.**
- **D3 check (Album after Day 1):** 100% complete, 8/8 met; heart-span tops
  identical within each card for all 8 cards (`evidence/run10/d3-check.json`,
  `allOneLine: true`); screenshot `14-album-after-day1.png` shows every
  card's hearts on a single row. **D3 FIXED.**
- **Freeze funded + blocked (end of run, on title):** coins 80 → 30,
  freezes 1 → 2, toast "Streak Freeze bought with coins!" **PASS**; second
  freeze at 30 coins → button "Need 50 coins", click → toast "Not enough
  coins yet — claim Daily rewards! 🎁", save unchanged **PASS**.
  **D5 (freeze) checks:** metaBar read "🪙 30 coins" with the shop still
  open AND after `shopClose`, both matching `save.coins` 30 — **PASS**
  (was "71 coins" stale after a 71→21 buy in run 7). Screenshot
  `18-title-after-freeze.png` shows the "30 coins" chip visually.
  (`evidence/run10/d5-check.json`, `freezeShopOpen` + `freezeAfterClose`
  both `chipShowsCoins: true`.)
- **Pause-menu → title; Play button (real click) starts Day 2; Esc → title;
  S opens shop on title, Esc closes; H opens help, Esc closes.** All PASS.
- **Console/network:** 0 console messages, 0 errors, 0 warnings,
  0 exceptions, 0 failed requests, 0 bad responses (whole run).
- **Clean quit:** `window.close()` → process group exited by itself in 4 s,
  0 stray processes.

### Run 11 — grab routes, poll-based (`drive11.js`, ~10:24 IST)
- Button PASS (carrying 0→1, pass 1→0, picked up at t+2 s), C-key PASS
  (0→1, pass 1→0, t+4 s), Space PASS (0→1, pass 1→0, t+2 s).
  Pass-click first read FAIL was a driver-check artifact (F13): carrying
  went 0→2 because a second dish landed on the pass mid-walk and Miso's
  pickup takes all dishes (capacity 2) — the strict `===1` check failed
  on a working route. Cleared in run 12.
  Console 0/0/0/0. Clean quit in 1 s, 0 strays.

### Run 12 — pass-click retest (`drive12.js`, ~10:25 IST) — PASS
- Miso 58 design units from the pass → clicked the pass → carrying 0 → 1,
  pass 1 → 0 within 1 game-second. **All four grab routes verified on the
  new build: button ✓, C ✓, Space ✓, pass click ✓.**
  Console 0/0/0/0. Electron exited in 1 s, 0 strays.

### Smoke — 1024×640 (`run-smoke.sh`, new copy, ~10:25 IST) — PASS
- Loads, title visible, all 8 dock buttons, DOM overlap: none, overflow:
  none, scrollW==innerW, scrollH==innerH. Console 0/0/0/0. Clean quit in
  2 s, no strays. Screenshot `evidence/smoke-title-1024x640.png`: D2 fix
  holds — chalkboard fully readable, logo clear, sun un-clipped, **no table
  numbers**, metaBar chips legible (persisted save: Level 2, Regulars 100%,
  Trophies 70%, 35 coins). (Dock wraps to 2 rows — N1.)

## 3. The 5 playbook mechanics — verdicts

| # | Mechanic | Verdict |
|---|----------|---------|
| (a) | "Tomorrow…" screen naming exactly 3 things | **PASS** — 3 items, exact texts logged in `evidence/run10/tomorrow.json` |
| (b) | Patience hearts (5, pink→orange→red, 💢 at 1) + chain multiplier + Expert thresholds + post-shift breakdown | **PASS, live** — 5→1 hearts observed draining with colour shifts (pink/orange/red), 💢 + red halo + angry face at 1 heart, walk-out after; chain meter + Expert label in HUD ("Expert: $75 + ×4 chain + no walk-outs" on Day 2); day-end breakdown shows best chain ×2, batched deliveries 12, favourites 18 ♥, Expert "not yet" (honest — ×4 not reached this run; met in runs 3 and 7) |
| (c) | 7-day escalating daily ladder + Daily Special + streak freeze | **PASS** — ladder Day 1 +20 → Day 7 Flower Crown; Special "Reach a ×3 chain today" with live progress (today's special is chain-type); claim +20 coins verified; freeze: 1 free/week + buyable with coins (80→30, freezes 1→2), never real-money-only. **D6 fixed:** the "Earn $X today" Special's progress now equals the day's collected earnings exactly (`daily.earned` $289 == `dayMoney` $289, gap 0) |
| (d) | Persistent progression tracks + visible collections with % incl. Regulars Album (8 cats, favourite dish/drink, friendship hearts) | **PASS** — metaBar: Café Level 2, Recipes 67%, Regulars 100%, Trophies 70%, Streak 1 day, 30 coins; Album 8/8 with favourites + friendship hearts on one line (D3 fixed); Recipe Book with dish-skill levels + locked future dishes; Trophies 7/10 after Day 1. **D5 fixed:** metaBar coin chip now refreshes immediately after any coin-spending shop purchase (verified live for freeze + outfit; theme/bundle/equip handlers grep-verified with the identical `renderShop(); renderMetaBar();` pattern) |
| (e) | Cosmetic-only shop (cat outfits, stated real-currency prices, simulated demo purchase, no random boxes, no pay-to-win) | **PASS** — 6 outfits $0–$4.99 + 3 themes + bundle, all "visual only, no stat boosts", sim-note on every row, demo purchase verified end-to-end (Pink Bow $1.99), no loot boxes anywhere |

## 4. Controls — coverage

Play (button + Enter) ✓ · Shop (title + dock + end-screen + S) ✓ ·
Trophies (title + dock) ✓ · How to Play (title + H) ✓ · Regulars Album (title +
dock) ✓ · Recipe Book ✓ · Daily (title + dock) ✓ · Grab Dish (button +
C + Space + pass click — all four timed + polling-verified on the new build,
runs 11–12) ✓ · Pause (P + dock button + Resume button +
pause Menu) ✓ · Menu (Esc + dock dMenu + pause Menu) ✓ · Music (dock toggle
On→Off→On, twice: Day 1 and dock sweep) ✓ · table clicks (serve + collect,
54 in Day 1) ✓ · keyboard 1–6 (52 orders) ✓ · C ✓ · Space ✓ · P ✓ ·
Esc ✓ · Enter (start / Tomorrow / sleep) ✓. **Every dock button was clicked
mid-play live this round** (dock sweep, Day 2).

## 5. Defects — GAME code (none open; nothing under `~/workspace/ts-spaces/` edited)

- **D1 — FIXED + VERIFIED.** Title logo no longer overlaps the chalkboard
  (chalkboard bx=24/by=120, logo 3.2rem max, title cats [0,3,5], sun
  un-clipped). Confirmed by geometry + visual check at 1280×800 and 1024×640.
- **D2 — FIXED + VERIFIED.** `tableLabel()` starts
  `if(screen === "title") return;`. Live proof: runtime
  `tableLabel.toString()` contains the early return
  (`evidence/run10/d2-check.json`, `earlyReturn: true`); title screenshots
  at 1280×800 and 1024×640 show no table numbers anywhere. Numbers still
  draw during play (visible 1–6 under tables in `17-one-heart.png`), as
  intended.
- **D3 — FIXED + VERIFIED.** `.catcard > span` + `.catcard .hearts
  span{ display:inline; }`. Live proof: after Day 1, all 8 Album cards'
  heart spans share one top value per card (`evidence/run10/d3-check.json`,
  `allOneLine: true`); screenshot `14-album-after-day1.png` shows every
  card's hearts on a single row.
- **D4 — FIXED + VERIFIED.** `renderDaily()` uses
  `((save.streak.count||0)===1 ? " day" : " days")`. Live proof: Daily
  panel sub reads "Streak: 1 day · Freezes: 1 · Total days played: 1"
  (`evidence/run10/d4-check.json`, `pass: true`).
- **D5 — FIXED + VERIFIED (this round).** `renderMetaBar()` is now called in
  the freeze buy handler (line 1453), outfit buy (1438), theme buy (1446),
  bundle buy (1449), "Wear it" (1437) / "Use theme" (1445), and `shopClose`
  (1581). Live proof: Streak Freeze bought on the title screen, `save.coins`
  80 → 30 — the metaBar read "🪙 30 coins" with the shop still open AND
  after closing it (`evidence/run10/d5-check.json`, both PASS; screenshot
  `18-title-after-freeze.png` shows the chip); after the Pink Bow outfit buy
  it read "🪙 0 coins" matching `save.coins` 0. The stale-chip symptom from
  run 7 ("71 coins" after a 71→21 buy) is gone.
- **D6 — FIXED + VERIFIED (this round).** `collectTable()` (line 650) now
  does `save.daily.earned = (save.daily.earned||0) + amt` on every dirty-table
  collection, and the old finish-eating pre-credit
  (`save.daily.earned = dayMoney + tb.pending`) was removed (serve handler,
  line 763, now only carries the explanatory comment). Live proof: Day 1 end,
  `dayMoney` $289, `save.daily.earned` $289, **gap $0** (was $258 vs $245,
  gap $13, in run 7); bank and `stats.earned` also $289, so nothing is
  double-counted. (`evidence/run10/d6-check.json`, `equal: true`.)
  Scope note: today's visible Daily Special is chain-type (27 % 5 = 2), so
  the earned-progress equality was verified via the save + the exact
  `renderDaily()` expression (line 1513); the panel reads that same counter.
- **Notes (not counted as defects):**
  - N1 — The dock wraps to 2 rows at 1280×800 and 1024×640 (Menu button and
    hint drop to a second row). Wrap, not overlap; previously accepted.
    Polish suggestion: shorten `#dockHint` or trim button padding so all
    8 buttons + hint fit one row at 1280.
  - N2 — Balance observation: the Day 1 goal ($55) is trivially beatable —
    the autoplay driver earned $289 (5×) with 19 served / 0 walk-outs.
    The real Day-1 challenge is Expert (×4 chain) — met in runs 3 and 7,
    NOT met in run 10 (best chain ×2). Keep as a gentle onboarding day or
    raise the goal — a design call, not a bug.

## 6. Defects — MY drivers/shell (fixed)

- **F1–F8** — prior rounds: root needs `--no-sandbox`; electron-packager
  win32 fails on Linux without Wine (manual assembly); no
  `--disable-frame-rate-limit`; setsid + process-group kill with bracket
  backstop; `Browser.getWindowForTarget` unimplemented (use
  `--window-size` hook); readiness wait; pkill bracket trick; batched
  `update(0.05)` for ~0.09× game time.
- **F9** — Shop freeze-block click missed the button (row below the fold).
  Fix: `scrollIntoView` before clicking.
- **F10** — Grab-route check read too early (Miso walks 235 u/s; pass can be
  ~900 design units away). Fix: `advance(3+)` after the trigger; re-verified
  in runs 5 and 9. Run 8's pass-click first-read FAIL was the same artifact
  class (4 game-seconds marginal from ~800 units out); run 9's poll-based
  retest (up to 12 game-seconds) passed at t+1 s.
- **F11** — `await Runtime.evaluate("window.close()")` can time out because
  the page dies before replying (drive9 exited 1 although Electron quit
  cleanly in 1 s). Fix: fire-and-forget `send()` for the close evaluate
  (applied to `drive10/11/12.js`).
- **F12** — `run-verify7.sh` was copied from `run-verify3.sh` with a sed that
  only matched the literal `evidence/run3` — it still ran `drive3.js`, and
  `drive7.js`'s own `EV` path still pointed at `evidence/run3`. Fix: runner
  now invokes the matching driver; `drive10/11/12.js` EV paths and
  `run-verify10/11/12.sh` invocations were verified by grep before running
  (each runner invokes its own driver and its own evidence dir).
- **F13** (this round) `drive11.js` pass-click verdict used strict
  `carryAfter === carryBefore + 1`. Miso's pickup takes ALL dishes on the
  pass (capacity 2), so when a second dish lands mid-walk, carrying goes
  0 → 2 and the check fails on a working route (run 11: carrying 0→2,
  pass 1→1 as new dishes kept landing). Fix: verdict is
  `carryAfter >= carryBefore + 1` (carrying can only increase via a pass
  pickup). Re-verified in run 12 (0→1, pass 1→0 in 1 game-second).

## 7. Remaining gaps (explicit)

- Windows `.exe` NOT executed — needs a real Windows machine.
- Sound by ear — not verified (WebAudio beeps exist; no human listen).
- Steam depot/upload steps — need a Steam partner account; not done here.
- No version metadata stamped on the exe (needs Wine or Windows).
- Nothing was pushed, uploaded, submitted or deleted. Nothing under
  `~/workspace/ts-spaces/` was edited.

## 8. Evidence index

- `drive10.js`, `run-verify10.sh` — full pass + D5/D6 live checks;
  `evidence/run10/` (18 PNGs, `run10.log`, `day1-result.json`,
  `shop-result.json`, `mechanics.json`, `tomorrow.json`, `album.json`,
  `daily-before.json`, `console.json`, `d2-check.json`, `d3-check.json`,
  `d4-check.json`, `d5-check.json`, `d6-check.json`, `dock-sweep.json`,
  `freeze-result.json`, `patience-result.json`, `title-geom.json`,
  `shop-before.json`).
- `drive11.js`, `run-verify11.sh` — grab routes, poll-based;
  `evidence/run11/` (`grab-routes.json`, `console.json`, `run11.log`).
- `drive12.js`, `run-verify12.sh` — pass-click retest (polling);
  `evidence/run12/` (`pass-click-result.json`, `console.json`, `run12.log`).
- Prior rounds: `drive7.js`, `evidence/run7/` (old build; D2/D3/D4 fixes
  re-confirmed this round, D5/D6 now fixed); `drive8/9.js`,
  `evidence/run8/`, `run9/`; `drive3/4/5/6.js`, `evidence/run3/`–`run6/`.
- Smoke: `evidence/smoke-title-1024x640.png`,
  `evidence/smoke-console-1024x640.json`, `evidence/smoke.log`.
- Win32: `dist/CatCafeDiner-win32-x64/` (358 MB).
