#!/usr/bin/env fish
# Resize screenshots to Chrome Web Store requirements (1280x800)

echo "📐 Resizing screenshots to 1280x800..."

cd screenshots

# Check if ImageMagick is installed
if not command -v convert &> /dev/null
    echo "❌ ImageMagick not found. Installing..."
    if command -v apt &> /dev/null
        sudo apt install -y imagemagick
    else if command -v brew &> /dev/null
        brew install imagemagick
    else
        echo "Please install ImageMagick manually"
        exit 1
    end
end

# Create backup directory
mkdir -p originals
cp *.png originals/

# Resize each screenshot
for img in *.png
    echo "  Resizing $img..."
    convert "$img" -resize 1280x800^ -gravity center -extent 1280x800 -background white -flatten "$img"
end

echo "✅ All screenshots resized to 1280x800"
echo "📁 Originals backed up to screenshots/originals/"
