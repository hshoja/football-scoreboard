#!/bin/bash

# Exit on error
set -e

echo "🧹 Cleaning up Capacitor and Android project..."

# Remove Android folder
if [ -d "android" ]; then
  echo "🗑️ Removing Android project folder..."
  rm -rf android
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

echo "✅ Clean up completed! You can now run the build-android.sh script to start fresh."
echo "To rebuild, run: ./scripts/build-android.sh"
