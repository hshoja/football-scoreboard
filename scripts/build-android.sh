#!/bin/bash

# Exit on error
set -e

echo "🚀 Building PWA and packaging for Android..."

# Step 1: Install dependencies if they don't exist
if [ ! -d "node_modules/@capacitor/android" ]; then
  echo "📦 Installing Capacitor dependencies..."
  pnpm add -D @capacitor/cli @capacitor/core @capacitor/android
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
    "androidScheme": "https"
  },
  "android": {
    "buildOptions": {
      "keystorePath": "android/app/football-tournament.keystore",
      "keystoreAlias": "football-tournament"
    }
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
if [ ! -d "android" ]; then
  echo "🏗️ Initializing Capacitor..."
  npx cap init "Football Tournament Manager" "com.footballtournament.app" --web-dir "out"

  # Add Android platform
  echo "🤖 Adding Android platform..."
  npx cap add android
else
  echo "🔄 Syncing with existing Android project..."
  npx cap sync android
fi

# Step 6: Update Android manifest for splash screen
MANIFEST_PATH="android/app/src/main/AndroidManifest.xml"
if [ -f "$MANIFEST_PATH" ]; then
  echo "🎨 Ensuring splash screen configuration..."
  # This is a simplistic check - a more robust approach would be to use a proper XML parser
  if ! grep -q "android:theme=\"@style/AppTheme.NoActionBarLaunch\"" "$MANIFEST_PATH"; then
    echo "Warning: Could not verify splash screen theme in AndroidManifest.xml"
    echo "Check manually to ensure proper splash screen configuration"
  fi
fi

# Step 7: Open Android Studio
echo "📱 Opening Android Studio..."
npx cap open android

echo "✅ Build process completed! Android Studio should now be open."
echo "Use Android Studio to build and generate the APK file."
echo ""
echo "To build a release APK, select 'Build > Generate Signed Bundle / APK' in Android Studio."
echo "For testing, select 'Run > Run app' with your device connected."
