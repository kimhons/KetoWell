import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../main.dart';
import '../storage/storage_service.dart';
import '../constants/app_constants.dart';
import 'app_routes.dart';

/// App router configuration using GoRouter
class AppRouter {
  final StorageService _storage;

  AppRouter({required StorageService storage}) : _storage = storage;

  late final GoRouter router = GoRouter(
    initialLocation: AppRoutes.splash,
    debugLogDiagnostics: true,
    redirect: _handleRedirect,
    routes: [
      // Splash
      GoRoute(
        path: AppRoutes.splash,
        builder: (context, state) => const SplashScreen(),
      ),

      // Auth routes
      GoRoute(
        path: AppRoutes.login,
        builder: (context, state) => const PlaceholderScreen(title: 'Login'),
      ),
      GoRoute(
        path: AppRoutes.signup,
        builder: (context, state) => const PlaceholderScreen(title: 'Sign Up'),
      ),
      GoRoute(
        path: AppRoutes.forgotPassword,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Forgot Password'),
      ),

      // Onboarding routes
      GoRoute(
        path: AppRoutes.onboardingWelcome,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Welcome'),
      ),

      // Main app routes
      GoRoute(
        path: AppRoutes.home,
        builder: (context, state) => const PlaceholderHome(),
      ),
      GoRoute(
        path: AppRoutes.dashboard,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Dashboard'),
      ),

      // Tracking routes
      GoRoute(
        path: AppRoutes.foodLog,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Food Log'),
      ),

      // Progress routes
      GoRoute(
        path: AppRoutes.progress,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Progress'),
      ),

      // Dr. Ketone routes
      GoRoute(
        path: AppRoutes.drKetone,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Dr. Ketone'),
      ),

      // Settings routes
      GoRoute(
        path: AppRoutes.settings,
        builder: (context, state) =>
            const PlaceholderScreen(title: 'Settings'),
      ),

      // 404 Not Found
      GoRoute(
        path: AppRoutes.notFound,
        builder: (context, state) =>
            const PlaceholderScreen(title: '404 Not Found'),
      ),
    ],
    errorBuilder: (context, state) =>
        const PlaceholderScreen(title: 'Error'),
  );

  /// Handle redirects based on auth state and onboarding status
  Future<String?> _handleRedirect(
    BuildContext context,
    GoRouterState state,
  ) async {
    final location = state.uri.path;

    // Check if user is authenticated
    final accessToken = await _storage.getString(AppConstants.keyAccessToken);
    final isAuthenticated = accessToken != null && accessToken.isNotEmpty;

    // Check if onboarding is complete
    final onboardingComplete =
        await _storage.getBool(AppConstants.keyOnboardingComplete) ?? false;

    // Allow splash screen
    if (location == AppRoutes.splash) {
      return null;
    }

    // If not authenticated, redirect to login (except for auth routes)
    if (!isAuthenticated) {
      final isAuthRoute = location.startsWith('/login') ||
          location.startsWith('/signup') ||
          location.startsWith('/forgot-password');

      if (!isAuthRoute) {
        return AppRoutes.login;
      }
      return null;
    }

    // If authenticated but onboarding not complete, redirect to onboarding
    if (!onboardingComplete) {
      final isOnboardingRoute = location.startsWith('/onboarding');
      if (!isOnboardingRoute) {
        return AppRoutes.onboardingWelcome;
      }
      return null;
    }

    // If trying to access auth or onboarding when already authenticated
    // and onboarded, redirect to home
    if (location.startsWith('/login') ||
        location.startsWith('/signup') ||
        location.startsWith('/onboarding')) {
      return AppRoutes.home;
    }

    return null;
  }
}

/// Placeholder screen for routes not yet implemented
class PlaceholderScreen extends StatelessWidget {
  final String title;

  const PlaceholderScreen({
    super.key,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.construction,
              size: 64,
              color: Colors.grey,
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Coming soon...',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
