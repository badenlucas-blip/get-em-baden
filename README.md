# Get 'Em: Baden

An original pocket monster-catching RPG set in Melbourne's Docklands. This repository is the finished static game (one page, a manifest, icons, and a service worker).

Play it on GitHub Pages at [https://badenlucas-blip.github.io/get-em-baden/](https://badenlucas-blip.github.io/get-em-baden/).

Open that address once while you are online. The service worker then stores the page, manifest, script, and icons. Later reloads work with no network.

## Add to Home Screen (Safari on iPhone or iPad)

1. Open the Pages address in Safari. In-app browsers (messages, social apps) cannot install the game.
2. Wait until the title screen appears so the files can cache.
3. Tap the Share button.
4. Tap **Add to Home Screen**, then **Add**.

The home-screen icon opens the game full screen. It uses the same on-device save as Safari.

## Saves

Progress is stored in this browser, on this device. Leaving the page saves when you are in the world. You can also press **START**, choose **SAVE**, and confirm.

**START → OPTIONS → EXPORT SAVE** copies a backup code. Paste it into Notes if you want a copy outside the browser. **IMPORT SAVE** loads that code back. Private Browsing does not keep a save after you close the tab.

## Offline

After one online visit, turn on Airplane Mode and reload the page, or open the home-screen icon. The title screen should appear, and **CONTINUE** should load the save already on the device. If the icon opens a blank page, reconnect once and load the site again so the cache can refresh.

## Controls

On-screen D-pad, **A**, **B**, and **START**. Keyboard: arrows or WASD, Z = A, X = B, Enter = Start, M = mute.

## GitHub Pages

`.github/workflows/pages.yml` publishes the repository root. In the repository on GitHub, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. A push to `main` updates the live site. `.nojekyll` is included so a branch deploy of `/` serves these files as-is.
