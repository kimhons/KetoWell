import 'package:dio/dio.dart';
import '../../constants/app_constants.dart';
import '../../storage/storage_service.dart';

/// Interceptor that adds JWT token to requests and handles token refresh
class AuthInterceptor extends Interceptor {
  final StorageService _storage;
  final Dio _dio;

  AuthInterceptor({
    required StorageService storage,
    required Dio dio,
  })  : _storage = storage,
        _dio = dio;

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    // Get access token from storage
    final accessToken = await _storage.getString(AppConstants.keyAccessToken);

    // Add token to headers if available
    if (accessToken != null && accessToken.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $accessToken';
    }

    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    // Handle 401 Unauthorized - try to refresh token
    if (err.response?.statusCode == 401) {
      final refreshToken = await _storage.getString(AppConstants.keyRefreshToken);

      // If we have a refresh token, try to refresh
      if (refreshToken != null && refreshToken.isNotEmpty) {
        try {
          // Attempt to refresh the token
          final newTokens = await _refreshToken(refreshToken);

          // Save new tokens
          await _storage.setString(
            AppConstants.keyAccessToken,
            newTokens['accessToken'] as String,
          );
          await _storage.setString(
            AppConstants.keyRefreshToken,
            newTokens['refreshToken'] as String,
          );

          // Retry the original request with new token
          final options = err.requestOptions;
          options.headers['Authorization'] =
              'Bearer ${newTokens['accessToken']}';

          final response = await _dio.fetch(options);
          return handler.resolve(response);
        } catch (e) {
          // Refresh failed - clear tokens and propagate error
          await _clearTokens();
          return handler.next(err);
        }
      } else {
        // No refresh token - clear everything
        await _clearTokens();
      }
    }

    handler.next(err);
  }

  /// Refresh the access token using the refresh token
  Future<Map<String, dynamic>> _refreshToken(String refreshToken) async {
    final response = await _dio.post(
      '/auth/refresh',
      data: {'refreshToken': refreshToken},
    );

    if (response.statusCode == 200 && response.data != null) {
      return response.data as Map<String, dynamic>;
    }

    throw Exception('Token refresh failed');
  }

  /// Clear all authentication tokens
  Future<void> _clearTokens() async {
    await _storage.remove(AppConstants.keyAccessToken);
    await _storage.remove(AppConstants.keyRefreshToken);
    await _storage.remove(AppConstants.keyUserId);
  }
}
