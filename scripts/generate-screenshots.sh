#!/bin/bash

# Exit on error
set -e

echo "📸 Generating screenshots for app store listings..."

# Create screenshots directory if it doesn't exist
mkdir -p public/screenshots

# Check if puppeteer-screenshot-cli is installed, if not install it
if ! command -v puppeteer-screenshot &>/dev/null; then
  echo "📦 Installing puppeteer-screenshot-cli..."
  pnpm add -D puppeteer-screenshot-cli
fi

# Set base URL - use local dev server or production URL
BASE_URL="http://localhost:3000"

# Define screenshot dimensions for various devices
# Format: "widthxheight deviceName"
DIMENSIONS=(
  "1280x800 desktop"
  "820x1180 tablet-portrait"
  "1180x820 tablet-landscape"
  "360x800 phone-portrait"
  "800x360 phone-landscape"
)

# Define pages to screenshot
PAGES=(
  ""
  "matches"
  "standings"
  "teams"
)

echo "🌐 Using base URL: $BASE_URL"
echo "📱 Will generate $((${#DIMENSIONS[@]} * ${#PAGES[@]})) screenshots"

# Check if development server is running
if ! curl -s --head "$BASE_URL" >/dev/null; then
  echo "⚠️ Warning: Development server doesn't seem to be running."
  echo "⚠️ Please start the development server in another terminal with: pnpm dev"
  echo "⚠️ Waiting 10 seconds to give you time to start the server..."
  sleep 10
fi

# Function to take screenshots
take_screenshots() {
  local page="$1"
  local url="$BASE_URL/$page"

  echo "📄 Processing page: ${page:-home}"

  for dimension in "${DIMENSIONS[@]}"; do
    # Split the dimension string into width, height, and device name
    read -r width height device <<<$(echo $dimension | awk '{print $1, $2}')
    IFS='x' read -r width height <<<"$width"

    # Create the filename
    local filename="public/screenshots/${device}-${page:-home}.png"

    echo "  📸 Capturing $device screenshot ($width x $height)..."

    # Capture the screenshot
    npx puppeteer-screenshot "$url" "$filename" \
      --width "$width" \
      --height "$height" \
      --full-page false \
      --delay 1000 \
      --timeout 20000
  done
}

# Take screenshots for each page
for page in "${PAGES[@]}"; do
  take_screenshots "$page"
done

echo "✅ Screenshots generated in public/screenshots/"
echo "📱 These can be used for your Google Play Store and App Store listings"
