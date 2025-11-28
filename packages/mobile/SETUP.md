# Flutter Project Setup Guide

This document provides step-by-step instructions for setting up the KetoWell Flutter mobile app development environment.

## ✅ Current Status

The Flutter project structure has been initialized with:

- ✅ Project directory structure (features, core, shared)
- ✅ Design system (colors, typography, theme)
- ✅ Dependencies configured in pubspec.yaml
- ✅ Main entry point with splash screen
- ✅ Constants and configuration files
- ✅ Linting rules (analysis_options.yaml)
- ✅ .gitignore for Flutter projects

## 🚀 Next Steps

### 1. Install Flutter SDK

If Flutter is not already installed on your development machine:

```bash
# macOS (using Homebrew)
brew install flutter

# Linux
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.24.5-stable.tar.xz
tar xf flutter_linux_3.24.5-stable.tar.xz
export PATH="$PATH:`pwd`/flutter/bin"

# Windows
# Download from https://docs.flutter.dev/get-started/install/windows
```

### 2. Verify Flutter Installation

```bash
flutter doctor
```

Fix any issues reported by `flutter doctor`.

### 3. Install Dependencies

```bash
cd packages/mobile
flutter pub get
```

### 4. Run the App

```bash
# List available devices
flutter devices

# Run on iOS simulator
flutter run -d ios

# Run on Android emulator
flutter run -d android

# Run on Chrome (for testing)
flutter run -d chrome
```

### 5. Generate Code (when needed)

For API clients and JSON serialization:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

## 📱 Platform-Specific Setup

### iOS Setup

1. Install Xcode from the Mac App Store
2. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
3. Open iOS project in Xcode:
   ```bash
   open ios/Runner.xcworkspace
   ```
4. Configure signing in Xcode

### Android Setup

1. Install Android Studio
2. Install Android SDK (API level 21+)
3. Create an Android Virtual Device (AVD)
4. Accept Android licenses:
   ```bash
   flutter doctor --android-licenses
   ```

## 🔧 Development Tools

### Recommended VS Code Extensions

- Flutter
- Dart
- Flutter Widget Snippets
- Awesome Flutter Snippets
- Error Lens
- GitLens

### Recommended Android Studio Plugins

- Flutter
- Dart
- Flutter Intl
- Flutter Enhancement Suite

## 📝 Code Style

The project uses `flutter_lints` for code analysis. Run the analyzer before committing:

```bash
flutter analyze
```

Format code automatically:

```bash
flutter format lib/
```

## 🧪 Testing

Run all tests:

```bash
flutter test
```

Run tests with coverage:

```bash
flutter test --coverage
```

## 🐛 Troubleshooting

### "Flutter command not found"

Add Flutter to your PATH:

```bash
export PATH="$PATH:/path/to/flutter/bin"
```

### "No devices found"

- For iOS: Start iOS Simulator
- For Android: Start Android Emulator
- For Web: Chrome should be detected automatically

### "Pod install failed"

```bash
cd ios
pod install --repo-update
cd ..
```

### "Gradle build failed"

```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

## 📚 Resources

- [Flutter Documentation](https://docs.flutter.dev/)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter BLoC Documentation](https://bloclibrary.dev/)
- [Material Design Guidelines](https://m3.material.io/)

---

**Last Updated**: November 25, 2025
