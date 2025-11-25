# KetoWell Mobile App

Flutter mobile application for KetoWell - Transform Your Health with the Science of Ketogenic Living.

## Status

🚧 **Coming Soon** - This directory is a placeholder for the upcoming Flutter mobile app.

## Planned Features

- **User Authentication**: OAuth integration with KetoWell backend
- **Book Access**: View and read purchased KetoWell book
- **AI Health Companion**: Chat with Dr. Ketone for personalized guidance
- **Meal Tracking**: Log meals and track macros
- **Progress Dashboard**: View health metrics and progress
- **Referral System**: Share referral codes and track rewards
- **Notifications**: Reminders and health tips

## Tech Stack

- **Flutter**: Cross-platform mobile framework
- **Dart**: Programming language
- **Provider/Riverpod**: State management
- **Dio**: HTTP client for API calls
- **Shared Preferences**: Local storage
- **Firebase**: Push notifications and analytics

## Getting Started

### Prerequisites

- Flutter SDK 3.x or higher
- Dart SDK 3.x or higher
- Android Studio / Xcode for platform-specific development

### Installation

```bash
# Navigate to mobile package
cd packages/mobile

# Install dependencies
flutter pub get

# Run the app
flutter run
```

## Project Structure

```
mobile/
├── lib/
│   ├── main.dart           # App entry point
│   ├── screens/            # UI screens
│   ├── widgets/            # Reusable widgets
│   ├── models/             # Data models
│   ├── services/           # API and business logic
│   ├── providers/          # State management
│   └── utils/              # Utility functions
├── android/                # Android platform code
├── ios/                    # iOS platform code
├── test/                   # Unit and widget tests
├── pubspec.yaml            # Flutter dependencies
└── README.md
```

## API Integration

The mobile app will consume the same REST API as the web application, with endpoints documented in the main repository README.

## Development Roadmap

1. **Phase 1**: Basic app structure and authentication
2. **Phase 2**: Book viewing and reading experience
3. **Phase 3**: AI chat integration
4. **Phase 4**: Meal tracking and progress dashboard
5. **Phase 5**: Referral system and social features
6. **Phase 6**: Push notifications and offline support

## Contributing

Please see the main repository CONTRIBUTING.md for guidelines on contributing to the KetoWell mobile app.

## License

MIT License - see LICENSE file in the root directory.
