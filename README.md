# Image Zoom Browser Extension

A simple, modern browser extension that allows you to zoom in and out on any image by holding Ctrl and scrolling your mouse wheel.

## Features

- 🔍 Zoom any image on any webpage
- ⌨️ Simple controls: Hold **Ctrl** + **Mouse Wheel** to zoom
- 🎯 Intelligent zoom centered on mouse cursor position
- 🖱️ Click and drag to pan around zoomed images
- 🎯 Smooth zoom transitions
- 🔄 Double-click to reset zoom
- ✨ Enhanced image quality with dynamic rendering and sharpening
- 🌐 Works on Firefox and Edge (Chromium-based browsers)
- ⚡ Lightweight and fast

## Installation (Development)

### Firefox

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the extension folder and select the `manifest.json` file
5. The extension is now active!

**Note:** Temporary extensions in Firefox are removed when you close the browser. For permanent installation during development, you can:
- Use Firefox Developer Edition or Nightly
- Navigate to `about:config` and set `xpinstall.signatures.required` to `false`

### Microsoft Edge

1. Open Edge and navigate to `edge://extensions/`
2. Enable "Developer mode" (toggle in the bottom-left corner)
3. Click "Load unpacked"
4. Select the extension folder
5. The extension is now active!

### Google Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top-right corner)
3. Click "Load unpacked"
4. Select the extension folder
5. The extension is now active!

## How to Use

1. Navigate to any webpage with images
2. Hover your mouse over an image
3. Hold down the **Ctrl** key
4. Scroll your mouse wheel:
   - **Scroll up** = Zoom in (centered on cursor position)
   - **Scroll down** = Zoom out (centered on cursor position)
5. Once zoomed in, **click and drag** the image to pan around
6. **Double-click** on a zoomed image to reset it to original size

## Configuration

You can customize the zoom behavior by editing `content.js`:

```javascript
const CONFIG = {
  zoomStep: 0.1,        // 10% zoom per scroll tick (increase for faster zoom)
  minScale: 0.5,        // Minimum 50% of original size
  maxScale: 5.0,        // Maximum 500% of original size
  transitionDuration: 100  // Smooth transition in ms
};
```

## Files Structure

```
image-zoom-extension/
├── manifest.json          # Extension configuration
├── content.js             # Main zoom functionality
├── styles.css             # Styling for zoomed images
├── LICENSE                # MIT License
├── PRIVACY.md             # Privacy policy for stores
├── STORE_LISTING.md       # Copy for store descriptions
├── SCREENSHOTS.md         # Guide for creating store screenshots
├── build.fish             # Build script for distribution packages
├── .gitignore             # Git ignore rules
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── dist/                  # Distribution packages (generated)
│   └── image-zoom-v1.0.0.zip
└── README.md              # This file
```

## Technical Details

- **Manifest Version:** 3 (latest standard)
- **Permissions:** None required (runs on all URLs via content scripts)
- **Browser Support:** Firefox 109+, Edge, Chrome, and other Chromium-based browsers
- **Image Quality Enhancements:**
  - High-quality bicubic interpolation for smooth scaling
  - Dynamic rendering mode based on zoom level
  - Subtle contrast and saturation boost for improved perceived sharpness
  - Hardware-accelerated rendering for smooth performance

## Publishing to Stores

### Quick Start

1. **Build the distribution package:**
   ```bash
   ./build.fish
   ```
   This creates `dist/image-zoom-v1.0.0.zip` ready for upload.

2. **Take screenshots** (see `SCREENSHOTS.md` for guidance)

3. **Submit to stores** (details below)

---

### Firefox Add-ons (AMO) - Recommended First

**Cost:** FREE ✨

**Steps:**
1. **Create account** at https://addons.mozilla.org/developers/
2. **Submit extension:**
   - Go to https://addons.mozilla.org/developers/addon/submit/
   - Upload `dist/image-zoom-v1.0.0.zip`
   - Choose "On this site" for distribution
3. **Fill out listing:**
   - Use content from `STORE_LISTING.md`
   - Upload screenshots
   - Set category: "Photos, Music & Videos"
   - Privacy policy: Use `PRIVACY.md` or link to GitHub
4. **Review time:** 1-7 days typically
5. **No fees!**

**Tips:**
- Firefox reviewers check code carefully
- Make sure PRIVACY.md accurately reflects no data collection
- Respond to reviewer questions promptly

---

### Chrome Web Store - Reaches Most Users

**Cost:** $5 one-time developer fee

**Steps:**
1. **Register as developer:**
   - Go to https://chrome.google.com/webstore/devconsole/register
   - Pay $5 registration fee
   - Verify email
2. **Upload extension:**
   - Navigate to Developer Dashboard
   - Click "New Item"
   - Upload `dist/image-zoom-v1.0.0.zip`
3. **Complete store listing:**
   - Copy description from `STORE_LISTING.md`
   - Upload screenshots (1280x800 or 640x400)
   - Add promotional images (optional but recommended)
   - Category: "Productivity" or "Photos"
   - Privacy: Link to GitHub PRIVACY.md
4. **Submit for review**
5. **Review time:** 1-3 days usually

**Benefits:**
- Works on Chrome, Edge, Brave, Opera, Vivaldi
- Largest user base
- Automatic updates

---

### Microsoft Edge Add-ons - Optional

**Cost:** FREE (but Chrome listing works on Edge too)

**When to use:** Only if you want Edge-specific presence

**Steps:**
1. Register at https://partner.microsoft.com/dashboard/microsoftedge/
2. Similar process to Chrome
3. Note: Most Edge users can install from Chrome Web Store

**Recommendation:** Skip this unless you need Edge-specific features

---

### Pre-Submission Checklist

Before submitting to any store:

- [x] Version number set in `manifest.json` (currently 1.0.0)
- [x] Extension ID updated for Firefox in `manifest.json`
- [x] LICENSE file included
- [x] PRIVACY.md created and accurate
- [ ] Screenshots created (see `SCREENSHOTS.md`)
- [x] Store listing copy prepared (see `STORE_LISTING.md`)
- [x] Distribution package built (`./build.fish`)
- [ ] Tested extension in target browser
- [ ] Support email/contact ready

---

### Post-Publication

After your extension is approved:

1. **Update README.md** with store links
2. **Add badges** to show installation links
3. **Monitor reviews** and respond to user feedback
4. **Plan updates** - increment version in manifest.json

---

### Version Updates

When releasing updates:

1. Update version in `manifest.json`
2. Run `./build.fish` to create new package
3. Upload to stores with changelog
4. Tag release in Git: `git tag v1.0.1`

---

## Privacy

This extension:
- Does NOT collect any data
- Does NOT require any special permissions
- Does NOT communicate with external servers
- Runs entirely locally in your browser

See [PRIVACY.md](PRIVACY.md) for complete privacy policy.

## License

MIT License - See [LICENSE](LICENSE) file for details.

Free and open source. Use, modify, and distribute as needed.

## Troubleshooting

**Issue:** Extension doesn't work on some websites
- Some websites may have Content Security Policy (CSP) restrictions
- The extension should work on most standard websites

**Issue:** Zoom feels too slow/fast
- Adjust the `zoomStep` value in `content.js`

**Issue:** Image keeps moving after right-clicking or when a dialog appears
- This has been fixed in the latest version - drag state is properly reset on context menu and focus loss

**Issue:** Image position changes after double-click reset
- This has been fixed - images now return to their exact original position and state when reset

**Issue:** Images move around when zooming
- This is expected behavior; the image scales from its center
- Use the click-and-drag panning feature to reposition the zoomed area

## Future Enhancements

Ideas for future versions:
- Customizable keyboard shortcut (Alt, Shift, etc.)
- Options page for user preferences
- Zoom level indicator
- Remember zoom levels per site
