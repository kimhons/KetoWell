/// App route names
class AppRoutes {
  // Root
  static const String splash = '/';
  
  // Auth
  static const String login = '/login';
  static const String signup = '/signup';
  static const String forgotPassword = '/forgot-password';
  
  // Onboarding
  static const String onboardingWelcome = '/onboarding/welcome';
  static const String onboardingMedicalScreening = '/onboarding/medical-screening';
  static const String onboardingContraindications = '/onboarding/contraindications';
  static const String onboardingMedications = '/onboarding/medications';
  static const String onboardingGoals = '/onboarding/goals';
  static const String onboardingBaseline = '/onboarding/baseline';
  static const String onboardingElectrolytes = '/onboarding/electrolytes';
  static const String onboardingConsent = '/onboarding/consent';
  
  // Main App
  static const String home = '/home';
  static const String dashboard = '/dashboard';
  
  // Tracking
  static const String foodLog = '/tracking/food';
  static const String foodSearch = '/tracking/food/search';
  static const String foodDetail = '/tracking/food/detail';
  static const String biomarkerLog = '/tracking/biomarker';
  static const String symptomLog = '/tracking/symptom';
  static const String electrolyteLog = '/tracking/electrolyte';
  
  // Progress
  static const String progress = '/progress';
  static const String weightTrend = '/progress/weight';
  static const String ketoneTrend = '/progress/ketone';
  static const String macroAdherence = '/progress/macro';
  
  // Dr. Ketone
  static const String drKetone = '/dr-ketone';
  static const String drKetoneChat = '/dr-ketone/chat';
  static const String drKetoneCheckIn = '/dr-ketone/check-in';
  
  // Community (Phase 2)
  static const String community = '/community';
  static const String communityForums = '/community/forums';
  static const String communityChallenge = '/community/challenge';
  
  // Settings
  static const String settings = '/settings';
  static const String settingsAccount = '/settings/account';
  static const String settingsNotifications = '/settings/notifications';
  static const String settingsMacros = '/settings/macros';
  static const String settingsProfile = '/settings/profile';
  
  // Utility
  static const String notFound = '/404';
}
