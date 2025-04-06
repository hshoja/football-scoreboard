#!/bin/bash

# Exit on error
set -e

echo "🚀 Testing iOS setup..."

# Step 0: Check iOS development prerequisites
if [ -f "./scripts/setup-ios-dev.sh" ]; then
  echo "🔍 Checking iOS development prerequisites..."
  ./scripts/setup-ios-dev.sh
else
  # Check basic prerequisites
  if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Error: iOS apps can only be built on macOS."
    echo "You are currently running on: $OSTYPE"
    exit 1
  fi

  if ! /usr/bin/xcode-select -p &>/dev/null; then
    echo "❌ Error: Xcode is not installed."
    echo "Please install Xcode from the Mac App Store."
    exit 1
  fi

  if ! command -v pod &>/dev/null; then
    echo "❌ Error: CocoaPods is not installed."
    echo "Please run ./scripts/setup-ios-dev.sh first or install manually with:"
    echo "  sudo gem install cocoapods"
    exit 1
  fi
fi

# Step 1: Check for essential tools
echo "🔍 Checking for essential tools..."
if ! command -v npx &>/dev/null; then
  echo "❌ Error: npx is not installed. Please install Node.js."
  exit 1
fi

# Step 2: Check Next.js configuration
echo "📝 Checking Next.js config..."
if [ ! -f "next.config.mjs" ] || ! grep -q "output:" next.config.mjs; then
  echo "⚠️ Warning: next.config.mjs needs the 'output: export' setting."
  echo "📝 Creating a proper next.config.mjs file..."
  # Create a simple next.config.mjs with export setting
  cat >next.config.mjs <<EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
};

// Use the nextConfig as is
export default nextConfig;
EOF
  echo "✅ Created next.config.mjs with export setting"
fi

# Step 3: Check Next.js build
if [ ! -d "out" ]; then
  echo "⚠️ Warning: No 'out' directory found. Running a build first..."
  pnpm run build
else
  echo "✅ Next.js build output found."
fi

# Step 4: Check Capacitor setup
if [ ! -f "capacitor.config.json" ]; then
  echo "❌ Error: No capacitor.config.json found. Please run the full build script first."
  exit 1
else
  echo "✅ Capacitor config found."
fi

# Step 5: Check iOS platform
if [ ! -d "ios" ]; then
  echo "❌ Error: No iOS project found. Please run the full build script first."
  exit 1
else
  echo "✅ iOS project found."
fi

# Step 6: Sync latest changes
echo "🔄 Syncing latest changes to iOS project..."
npx cap sync ios

# Step 7: Open Xcode
echo "📱 Opening Xcode..."
npx cap open ios

echo "✅ Test completed! Xcode should now be open."
echo "Use Xcode to build and test on your iOS device or simulator."
echo ""
echo "Note: To enable testing on your physical device, make sure:"
echo "1. Your Apple ID is set up in Xcode → Preferences → Accounts"
echo "2. You've selected a development team in the project's Signing & Capabilities settings"
