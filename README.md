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
├── manifest.json       # Extension configuration
├── content.js          # Main zoom functionality
├── styles.css          # Styling for zoomed images
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
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

### Firefox Add-ons (AMO)

1. Create a ZIP file of all extension files
2. Sign up at [addons.mozilla.org](https://addons.mozilla.org/)
3. Submit your extension for review

### Microsoft Edge Add-ons

1. Create a ZIP file of all extension files
2. Sign up at [Microsoft Partner Center](https://partner.microsoft.com/)
3. Submit your extension for review

### Chrome Web Store

1. Create a ZIP file of all extension files
2. Pay one-time $5 developer registration fee
3. Submit at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

## Privacy

This extension:
- Does NOT collect any data
- Does NOT require any special permissions
- Does NOT communicate with external servers
- Runs entirely locally in your browser

## License

Free to use and modify as needed.

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
