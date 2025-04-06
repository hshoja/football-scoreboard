#!/bin/bash

# Exit on error
set -e

echo "🔍 Checking iOS development prerequisites..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "❌ Error: iOS apps can only be built on macOS."
  echo "You are currently running on: $OSTYPE"
  exit 1
fi

# Check if Xcode is installed
if ! /usr/bin/xcode-select -p &>/dev/null; then
  echo "❌ Error: Xcode is not installed."
  echo "Please install Xcode from the Mac App Store."
  exit 1
fi

# Check if Xcode Command Line Tools are correctly set to Xcode
CURRENT_XCODE_PATH=$(/usr/bin/xcode-select -p)
if [[ "$CURRENT_XCODE_PATH" == "/Library/Developer/CommandLineTools" ]]; then
  echo "⚠️ Xcode Command Line Tools are pointing to Command Line Tools instead of Xcode."
  echo "🔧 Fixing Xcode Command Line Tools path..."
  # Find Xcode.app path
  XCODE_PATH=$(mdfind "kMDItemCFBundleIdentifier == 'com.apple.dt.Xcode'" | head -n 1)

  if [ -z "$XCODE_PATH" ]; then
    echo "❌ Could not find Xcode.app. Please install Xcode from the Mac App Store."
    exit 1
  fi

  echo "📱 Found Xcode at: $XCODE_PATH"
  echo "🔑 Updating xcode-select path (requires sudo)..."
  sudo xcode-select -s "$XCODE_PATH/Contents/Developer"
  echo "✅ Xcode Command Line Tools now pointing to Xcode."
else
  echo "✅ Xcode Command Line Tools correctly set up."
fi

# Check if CocoaPods is installed
if ! command -v pod &>/dev/null; then
  echo "⚠️ CocoaPods is not installed."
  echo "🔧 Installing CocoaPods..."

  # Check if Ruby is installed
  if ! command -v ruby &>/dev/null; then
    echo "❌ Ruby is required to install CocoaPods."
    echo "Please install Ruby first with:"
    echo "  brew install ruby"
    exit 1
  fi

  # Install CocoaPods
  sudo gem install cocoapods

  # Verify installation
  if ! command -v pod &>/dev/null; then
    echo "❌ CocoaPods installation failed."
    echo "Try installing manually with:"
    echo "  sudo gem install cocoapods"
    exit 1
  fi

  echo "✅ CocoaPods installed successfully."
else
  echo "✅ CocoaPods is already installed."
fi

# Check if user has accepted Xcode license
if ! xcrun simctl list &>/dev/null; then
  echo "⚠️ Xcode license needs to be accepted."
  echo "🔑 Accepting Xcode license (requires sudo)..."
  sudo xcodebuild -license accept
  echo "✅ Xcode license accepted."
else
  echo "✅ Xcode license already accepted."
fi

echo "🎉 All iOS development prerequisites are now set up!"
echo "You can now run 'pnpm run build:ios' to build your iOS app."
