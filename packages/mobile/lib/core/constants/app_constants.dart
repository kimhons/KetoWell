class AppConstants {
  // App Info
  static const String appName = 'KetoWell';
  static const String appTagline = 'Evidence-Based Ketogenic Health';
  
  // API Configuration
  static const String apiBaseUrl = 'https://ketowell.manus.space/api';
  static const Duration apiTimeout = Duration(seconds: 30);
  
  // Storage Keys
  static const String keyAccessToken = 'access_token';
  static const String keyRefreshToken = 'refresh_token';
  static const String keyUserId = 'user_id';
  static const String keyUserProfile = 'user_profile';
  static const String keyOnboardingComplete = 'onboarding_complete';
  static const String keyThemeMode = 'theme_mode';
  
  // Macro Defaults (in grams)
  static const double defaultCarbsGrams = 20.0;
  static const double defaultProteinGrams = 100.0;
  static const double defaultFatGrams = 150.0;
  static const double defaultCalories = 1800.0;
  
  // Electrolyte Defaults (in mg)
  static const double defaultSodiumMg = 4000.0;
  static const double defaultPotassiumMg = 3500.0;
  static const double defaultMagnesiumMg = 400.0;
  
  // Habit Formation
  static const int habitFormationDays = 66;
  static const int criticalWindowDays = 28; // First 4 weeks
  
  // Ketone Levels (in mmol/L)
  static const double ketoneNone = 0.0;
  static const double ketoneTrace = 0.5;
  static const double ketoneLight = 1.0;
  static const double ketoneModerate = 1.5;
  static const double ketoneDeep = 3.0;
  
  // Validation
  static const int minPasswordLength = 8;
  static const int maxPasswordLength = 128;
  static const int minAge = 18;
  static const int maxAge = 120;
  
  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;
  
  // File Upload
  static const int maxImageSizeMB = 10;
  static const int maxPdfSizeMB = 5;
  static const List<String> allowedImageExtensions = ['jpg', 'jpeg', 'png', 'heic'];
  static const List<String> allowedDocumentExtensions = ['pdf'];
  
  // Dr. Ketone
  static const String drKetoneAvatar = 'assets/images/dr_ketone_avatar.png';
  static const String drKetoneName = 'Dr. Ketone';
  static const Duration drKetoneTypingDelay = Duration(milliseconds: 800);
  
  // Notifications
  static const String notificationChannelId = 'ketowell_default';
  static const String notificationChannelName = 'KetoWell Notifications';
  static const String notificationChannelDescription = 'General notifications from KetoWell';
  
  // URLs
  static const String privacyPolicyUrl = 'https://ketowell.manus.space/privacy';
  static const String termsOfServiceUrl = 'https://ketowell.manus.space/terms';
  static const String supportEmail = 'support@ketowell.com';
  static const String websiteUrl = 'https://ketowell.manus.space';
  
  // Animations
  static const Duration shortAnimationDuration = Duration(milliseconds: 200);
  static const Duration mediumAnimationDuration = Duration(milliseconds: 300);
  static const Duration longAnimationDuration = Duration(milliseconds: 500);
  
  // Debounce
  static const Duration searchDebounce = Duration(milliseconds: 500);
  static const Duration autoSaveDebounce = Duration(seconds: 2);
}
