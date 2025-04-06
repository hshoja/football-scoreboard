# Football Tournament Manager

A responsive web application for managing football tournaments, matches, teams, and standings. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Multi-language Support**: English and Farsi with RTL support
- **PWA Support**: Install as a native app on any device
- **Offline Support**: Core functionality works without internet
- **Tournament Management**: Create and manage tournaments
- **Match Scheduling**: Schedule and track match results
- **Team Management**: Add teams with custom logos and details
- **Standings Table**: Automatically calculated standings

## Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build for production
pnpm build

# Start the production server
pnpm start
```

## PWA Installation

This application can be installed as a Progressive Web App on any device:

1. Open the website in a supported browser (Chrome, Edge, Safari)
2. Look for the "Add to Home Screen" option in the browser menu
3. Follow the prompts to install

## Native App Installation

You can build native apps for both Android and iOS from this project:

### Android App

1. Make sure you have Android Studio installed
2. Run the build script:
   ```bash
   pnpm run build:android
   ```
3. The script will:

   - Install necessary dependencies
   - Build the Next.js app
   - Set up Capacitor configuration
   - Initialize the Android project
   - Open Android Studio

4. In Android Studio:
   - Connect your Android device or set up an emulator
   - Click "Run" to test the app
   - To build a release APK, go to "Build > Generate Signed Bundle / APK"

### iOS App

1. Make sure you have Xcode installed (macOS only)
2. Set up your iOS development environment:
   ```bash
   pnpm run setup:ios
   ```
   This script will:
   - Check if you're running on macOS
   - Ensure Xcode is properly installed
   - Configure Xcode Command Line Tools
   - Install CocoaPods if missing
   - Accept the Xcode license if needed
3. Build the iOS app:

   ```bash
   pnpm run build:ios
   ```

   This script will:

   - Install necessary dependencies
   - Build the Next.js app
   - Set up Capacitor configuration
   - Initialize the iOS project
   - Open Xcode

4. In Xcode:
   - Set up your Apple Developer account in Xcode > Preferences > Accounts
   - Select a Development Team in the Signing & Capabilities section
   - Connect your iOS device or select a simulator
   - Click "Run" to test the app
   - To create an IPA file, use "Product > Archive"

### Testing Changes

After making changes to your web app, you can quickly update the native apps:

```bash
# For Android
pnpm run test:android

# For iOS
pnpm run test:ios
```

### Starting Fresh

If you need to start over with a clean setup:

```bash
# Clean everything (Android and iOS)
pnpm run clean

# Clean just Android
pnpm run clean:android
```

## Directory Structure

```
football-tournament/
├── app/                  # Next.js application code
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── matches/          # Matches page
│   ├── standings/        # Standings page
│   ├── teams/            # Teams page
│   └── tournaments/      # Tournaments page
├── public/               # Static assets
│   ├── icons/            # App icons
│   ├── images/           # Images
│   └── screenshots/      # App screenshots
├── scripts/              # Build and utility scripts
└── styles/               # Global CSS styles
```

## Troubleshooting

### iOS Build Issues

If you encounter problems building for iOS:

1. **"xcode-select: error: tool 'xcodebuild' requires Xcode"**:

   - Run `pnpm run setup:ios` to correctly configure Xcode

2. **"Skipping pod install because CocoaPods is not installed"**:

   - Run `pnpm run setup:ios` which will install CocoaPods
   - Or manually install with `sudo gem install cocoapods`

3. **Signing & Capabilities issues**:
   - In Xcode, select your project in the navigator
   - Go to the "Signing & Capabilities" tab
   - Ensure a valid team is selected under "Team"

### Android Build Issues

1. **Android Studio not found**:

   - Make sure Android Studio is installed and in your PATH

2. **Gradle sync fails**:
   - Open the Android project in Android Studio
   - Let it install any missing SDK components

## Browser and Device Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS 13+ and Android 8+
- Responsive from 320px width and up

## License

MIT
