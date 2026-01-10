# Image Zoom Browser Extension

A simple, modern browser extension that allows you to zoom in and out on any image by holding Ctrl and scrolling your mouse wheel.

## Features

- 🔍 Zoom any image on any webpage
- ⌨️ Configurable controls: Hold **Ctrl/Alt/Shift/Meta** + **Mouse Wheel** to zoom
- 🎯 Intelligent zoom centered on mouse cursor position
- 🖱️ Click and drag to pan around zoomed images
- 🎯 Smooth zoom transitions with adjustable speed
- 🔄 Double-click to reset zoom
- ✨ Enhanced image quality with configurable visual effects
- 🎨 **NEW:** Customizable marching ants border indicator
- 🖼️ **NEW:** Double-click to activate zoom mode (no key holding required!)
- ⚙️ **NEW:** Full settings page with comprehensive customization
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
3. Hold down the **Ctrl** key (or your configured activation key)
4. Scroll your mouse wheel:
   - **Scroll up** = Zoom in (centered on cursor position)
   - **Scroll down** = Zoom out (centered on cursor position)
5. Once zoomed in, **click and drag** the image to pan around
6. **Double-click** on a zoomed image to reset it to original size

**New:** You can also enable **Double-Click to Start Zooming** in settings - double-click an image once to activate zoom mode, then scroll without holding any keys!

## Configuration

The extension now has a **Settings Page** accessible through your browser's extension menu. You can customize:

### Zoom Behavior
- **Zoom Step** (5%-30%): How much to zoom per scroll tick
- **Minimum Zoom Level** (10%-100%): Smallest size you can zoom out to
- **Maximum Zoom Level** (200%-1000%): Largest size you can zoom in to

### Animation
- **Transition Speed** (0-500ms): Duration of zoom animation (0 = instant)

### Visual Effects
- **Drop Shadow**: Add shadow effect to zoomed images
- **Contrast Boost**: Slightly enhance contrast for better clarity
- **Saturation Boost**: Slightly enhance color saturation
- **Hover Outline**: Show blue outline when hovering over zoomed images

### Interaction
- **Activation Key**: Choose which key to hold while scrolling (Ctrl, Alt, Shift, or Meta/Command)
- **Pan/Drag**: Enable/disable click and drag to pan around zoomed images
- **Double-Click to Reset**: Enable/disable double-click to reset zoom
- **Double-Click to Start Zooming**: Enable/disable double-click to activate zoom mode (scroll without holding keys)

### Marching Ants Indicator
- **Enable/Disable**: Show animated outline when an image is zoomed
- **Border Color**: Customize the indicator color with color picker
- **Border Style**: Choose from dashed, dotted, or solid border
- **Border Width**: Adjust thickness (1-10px)
- **Blink at Original Size**: Border blinks 3 times when returning to 100% zoom

All settings are saved automatically and apply immediately to all tabs!

## Files Structure

```
image-zoom-extension/
├── manifest.json          # Extension configuration
├── defaults.js            # Default settings configuration
├── content.js             # Main zoom functionality
├── styles.css             # Styling for zoomed images
├── options.html           # Settings page UI
├── options.js             # Settings page logic
├── options.css            # Settings page styling
├── LICENSE                # MIT License
├── PRIVACY.md             # Privacy policy
├── build.fish             # Build script for distribution packages
├── .gitignore             # Git ignore rules
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon16.svg
│   ├── icon48.png
│   ├── icon48.svg
│   ├── icon128.png
│   └── icon128.svg
├── screenshots/           # Store listing screenshots
│   ├── full_page.png
│   ├── normal.png
│   ├── zoom_in.png
│   ├── zoom_out.png
│   └── zoom_pan.png
└── README.md              # This file
```

## Technical Details

- **Manifest Version:** 3 (latest standard)
- **Permissions:** Storage (for saving user preferences)
- **Browser Support:** Firefox 109+, Edge, Chrome, and other Chromium-based browsers
- **Image Quality Enhancements:**
  - High-quality bicubic interpolation for smooth scaling
  - Dynamic rendering mode based on zoom level
  - Configurable contrast and saturation boost for improved perceived sharpness
  - Hardware-accelerated rendering for smooth performance
- **Settings Storage:** Uses browser.storage.sync for cross-device synchronization

## Building

To create a distribution package:

```bash
./build.fish
```

This creates `dist/image-zoom-v1.1.0.zip` ready for installation or submission to browser extension stores.

## Privacy

This extension:
- Does NOT collect any data
- Does NOT communicate with external servers
- Runs entirely locally in your browser
- Only uses storage permission to save your preferences locally/sync across devices

See [PRIVACY.md](PRIVACY.md) for complete privacy policy.

## License

MIT License - See [LICENSE](LICENSE) file for details.

Free and open source. Use, modify, and distribute as needed.

## Troubleshooting

**Issue:** Extension doesn't work on some websites
- Some websites may have Content Security Policy (CSP) restrictions
- The extension should work on most standard websites

**Issue:** Zoom feels too slow/fast
- Open the extension settings and adjust the **Zoom Step** slider

**Issue:** Want to use a different key instead of Ctrl
- Open the extension settings and change the **Activation Key** to Alt, Shift, or Meta

**Issue:** Don't want to hold a key while zooming
- Enable **Double-Click to Start Zooming** in settings - double-click an image to activate zoom mode, then just scroll!

**Issue:** Visual effects are too much/not enough
- Open settings and toggle individual visual effects (drop shadow, contrast, saturation, outline)

**Issue:** Image keeps moving after right-clicking or when a dialog appears
- This has been fixed in the latest version - drag state is properly reset on context menu and focus loss

**Issue:** Image position changes after double-click reset
- This has been fixed - images now return to their exact original position and state when reset

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Changelog

### v1.1.0 (2026-01-10)
- **NEW:** Full settings/options page with comprehensive customization
- **NEW:** Configurable zoom step, min/max zoom levels
- **NEW:** Configurable activation key (Ctrl, Alt, Shift, Meta)
- **NEW:** Double-click to start zooming feature (no key holding required!)
- **NEW:** Marching ants border indicator when zoomed
  - Customizable color, style, and width
  - Optional blink effect when returning to original size
- **NEW:** Toggle visual effects individually (shadow, contrast, saturation, outline)
- **NEW:** Toggle interaction features (pan/drag, double-click reset)
- **NEW:** Adjustable transition speed
- Settings sync across devices via browser.storage.sync
- All settings apply immediately without page reload

### v1.0.0 (Previous)
- Initial release with basic zoom functionality
