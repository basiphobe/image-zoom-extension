#!/usr/bin/env fish
# Build script for Image Zoom Extension
# Creates distribution packages for Firefox and Chrome stores

echo "🔧 Building Image Zoom Extension packages..."

# Create dist directory if it doesn't exist
mkdir -p dist

# Remove old packages
rm -f dist/image-zoom-*.zip

echo "📦 Creating distribution package..."

# Create the ZIP file with only the necessary files
zip -r dist/image-zoom-v1.1.0.zip \
    manifest.json \
    defaults.js \
    content.js \
    styles.css \
    options.html \
    options.js \
    options.css \
    icons/ \
    LICENSE \
    -x "*.DS_Store" "*.git*" "*README.md" "*PRIVACY.md" "*STORE_LISTING.md" "*SCREENSHOTS.md"

echo "✅ Package created: dist/image-zoom-v1.1.0.zip"
echo ""
echo "📊 Package contents:"
unzip -l dist/image-zoom-v1.1.0.zip
echo ""
echo "✨ Build complete! Your extension is ready for submission."
echo ""
echo "Next steps:"
echo "1. Take screenshots following SCREENSHOTS.md"
echo "2. Submit to Firefox Add-ons: https://addons.mozilla.org/developers/"
echo "3. Submit to Chrome Web Store: https://chrome.google.com/webstore/devconsole/"
