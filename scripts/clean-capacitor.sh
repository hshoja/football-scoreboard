#!/bin/bash

# Exit on error
set -e

echo "🧹 Cleaning up Capacitor project..."

# Remove platform folders
if [ -d "android" ]; then
  echo "🗑️ Removing Android project folder..."
  rm -rf android
fi

if [ -d "ios" ]; then
  echo "🗑️ Removing iOS project folder..."
  rm -rf ios
fi

# Remove Capacitor configuration files
if [ -f "capacitor.config.ts" ]; then
  echo "🗑️ Removing capacitor.config.ts..."
  rm capacitor.config.ts
fi

if [ -f "capacitor.config.json" ]; then
  echo "🗑️ Removing capacitor.config.json..."
  rm capacitor.config.json
fi

# Remove build output folders
if [ -d "out" ]; then
  echo "🗑️ Removing Next.js static export folder (out)..."
  rm -rf out
fi

if [ -d ".next" ]; then
  echo "🗑️ Removing Next.js build folder (.next)..."
  rm -rf .next
fi

echo "✅ Clean up completed! You can now run the build scripts to start fresh."
echo "To rebuild for Android: ./scripts/build-android.sh"
echo "To rebuild for iOS: ./scripts/build-ios.sh"
