#!/bin/bash

# Exit on error
set -e

echo "🚀 Building PWA and packaging for iOS..."

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

# Step 1: Install dependencies if they don't exist
if [ ! -d "node_modules/@capacitor/ios" ]; then
  echo "📦 Installing Capacitor iOS dependencies..."
  pnpm add -D @capacitor/cli @capacitor/core @capacitor/ios
fi

# Step 2: Make sure next.config.mjs has output: export
echo "📝 Checking Next.js config..."
if [ ! -f "next.config.mjs" ] || ! grep -q "output:" next.config.mjs; then
  echo "📝 Creating next.config.mjs with 'output: export'..."
  # Create a next.config.mjs file
  cat >next.config.mjs <<EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
};

// Use the nextConfig as is
export default nextConfig;
EOF
  echo "✅ Created next.config.mjs"
fi

# Step 3: Clean and build the Next.js application
echo "🔨 Building Next.js application..."
pnpm run build

# Step 4: Create capacitor.config.json if it doesn't exist
if [ ! -f "capacitor.config.json" ]; then
  echo "📝 Creating Capacitor configuration (JSON)..."
  cat >capacitor.config.json <<EOF
{
  "appId": "com.footballtournament.app",
  "appName": "Football Tournament Manager",
  "webDir": "out",
  "server": {
    "iosScheme": "https"
  },
  "ios": {
    "contentInset": "always"
  }
}
EOF

  # Remove any existing TypeScript config that might cause issues
  if [ -f "capacitor.config.ts" ]; then
    echo "🗑️ Removing capacitor.config.ts (using JSON format instead)..."
    rm capacitor.config.ts
  fi
fi

# Step 5: Initialize Capacitor if not already done
if [ ! -d "ios" ]; then
  # Check if Android platform exists but iOS doesn't
  if [ -d "android" ]; then
    echo "🏗️ Adding iOS platform to existing Capacitor project..."
    npx cap add ios
  else
    echo "🏗️ Initializing Capacitor..."
    npx cap init "Football Tournament Manager" "com.footballtournament.app" --web-dir "out"

    # Add iOS platform
    echo "🍎 Adding iOS platform..."
    npx cap add ios
  fi
else
  echo "🔄 Syncing latest changes to iOS project..."
  npx cap sync ios
fi

# Step 6: Update iOS Info.plist for correct permissions
PLIST_PATH="ios/App/App/Info.plist"
if [ -f "$PLIST_PATH" ]; then
  echo "🔒 Ensuring iOS permissions are set..."
  # Add camera permission if not present (for QR code scanning)
  if ! grep -q "NSCameraUsageDescription" "$PLIST_PATH"; then
    echo "⚠️ Camera permission not found in Info.plist"
    echo "Add the following manually in Xcode:"
    echo "Key: NSCameraUsageDescription"
    echo "Value: Used to scan QR codes for match check-in"
  fi

  # Add photo library permission if not present (for image uploads)
  if ! grep -q "NSPhotoLibraryUsageDescription" "$PLIST_PATH"; then
    echo "⚠️ Photo library permission not found in Info.plist"
    echo "Add the following manually in Xcode:"
    echo "Key: NSPhotoLibraryUsageDescription"
    echo "Value: Used to select team logos and player photos"
  fi
fi

# Step 7: Open Xcode
echo "📱 Opening Xcode..."
npx cap open ios

echo "✅ Build process completed! Xcode should now be open."
echo "Use Xcode to build and generate the iOS app."
echo ""
echo "To build for your device:"
echo "1. Select your device in the target selector in Xcode"
echo "2. Click the Build button (play icon) to build and run on your device"
echo ""
echo "To generate an IPA file for distribution:"
echo "1. Select 'Product > Archive' in Xcode"
echo "2. Once archiving is complete, the Organizer window will open"
echo "3. Select your archive and click 'Distribute App'"
