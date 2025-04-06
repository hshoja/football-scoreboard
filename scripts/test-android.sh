#!/bin/bash

# Exit on error
set -e

echo "🚀 Testing Android setup..."

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

# Step 5: Check Android platform
if [ ! -d "android" ]; then
  echo "❌ Error: No Android project found. Please run the full build script first."
  exit 1
else
  echo "✅ Android project found."
fi

# Step 6: Sync latest changes
echo "🔄 Syncing latest changes to Android project..."
npx cap sync android

# Step 7: Open Android Studio
echo "📱 Opening Android Studio..."
npx cap open android

echo "✅ Test completed! Android Studio should now be open."
echo "Use Android Studio to build and generate the APK file for testing."
