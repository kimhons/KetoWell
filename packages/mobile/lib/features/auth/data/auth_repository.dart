import '../../../core/network/api_client.dart';
import '../../../core/network/api_result.dart';
import '../../../core/storage/storage_service.dart';
import '../../../core/utils/logger.dart';
import '../../../shared/models/user.dart';

/// Repository for authentication operations
class AuthRepository {
  final ApiClient _apiClient;
  final StorageService _storage;
  final Logger _logger = Logger.tagged('Auth');

  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _tokenExpiryKey = 'token_expiry';
  static const String _userKey = 'user';

  AuthRepository({
    required ApiClient apiClient,
    required StorageService storage,
  })  : _apiClient = apiClient,
        _storage = storage;

  /// Sign up a new user
  Future<ApiResult<AuthResponse>> signUp(SignUpRequest request) async {
    _logger.info('Attempting sign up for: ${request.email}');

    final result = await _apiClient.post<Map<String, dynamic>>(
      '/auth/signup',
      data: request.toJson(),
    );

    return result.when(
      success: (data) {
        final authResponse = AuthResponse.fromJson(data);
        _saveAuthData(authResponse);
        _logger.info('Sign up successful for: ${request.email}');
        return ApiResult.success(authResponse);
      },
      failure: (error) {
        _logger.error('Sign up failed: ${error.message}');
        return ApiResult.failure(error);
      },
    );
  }

  /// Login existing user
  Future<ApiResult<AuthResponse>> login(LoginRequest request) async {
    _logger.info('Attempting login for: ${request.email}');

    final result = await _apiClient.post<Map<String, dynamic>>(
      '/auth/login',
      data: request.toJson(),
    );

    return result.when(
      success: (data) {
        final authResponse = AuthResponse.fromJson(data);
        _saveAuthData(authResponse);
        _logger.info('Login successful for: ${request.email}');
        return ApiResult.success(authResponse);
      },
      failure: (error) {
        _logger.error('Login failed: ${error.message}');
        return ApiResult.failure(error);
      },
    );
  }

  /// Logout current user
  Future<void> logout() async {
    _logger.info('Logging out user');
    await _clearAuthData();
  }

  /// Refresh access token
  Future<ApiResult<AuthTokens>> refreshToken() async {
    final refreshToken = await _storage.getString(_refreshTokenKey);

    if (refreshToken == null) {
      _logger.warning('No refresh token found');
      return ApiResult.failure(
        ApiError.unauthorized('No refresh token available'),
      );
    }

    _logger.info('Refreshing access token');

    final result = await _apiClient.post<Map<String, dynamic>>(
      '/auth/refresh',
      data: {'refreshToken': refreshToken},
    );

    return result.when(
      success: (data) {
        final tokens = AuthTokens.fromJson(data);
        _saveTokens(tokens);
        _logger.info('Token refresh successful');
        return ApiResult.success(tokens);
      },
      failure: (error) {
        _logger.error('Token refresh failed: ${error.message}');
        return ApiResult.failure(error);
      },
    );
  }

  /// Get current user from storage
  Future<User?> getCurrentUser() async {
    final userJson = await _storage.getString(_userKey);
    if (userJson == null) return null;

    try {
      // In a real app, you'd parse the JSON string
      // For now, we'll return null until we implement JSON parsing
      return null;
    } catch (e) {
      _logger.error('Failed to parse user data: $e');
      return null;
    }
  }

  /// Get access token from storage
  Future<String?> getAccessToken() async {
    return await _storage.getString(_accessTokenKey);
  }

  /// Get refresh token from storage
  Future<String?> getRefreshToken() async {
    return await _storage.getString(_refreshTokenKey);
  }

  /// Check if user is authenticated
  Future<bool> isAuthenticated() async {
    final accessToken = await getAccessToken();
    if (accessToken == null) return false;

    final expiryString = await _storage.getString(_tokenExpiryKey);
    if (expiryString == null) return false;

    final expiry = DateTime.parse(expiryString);
    return DateTime.now().isBefore(expiry);
  }

  /// Save authentication data to storage
  Future<void> _saveAuthData(AuthResponse authResponse) async {
    await _saveTokens(authResponse.tokens);
    await _storage.setString(_userKey, authResponse.user.toJson().toString());
  }

  /// Save tokens to storage
  Future<void> _saveTokens(AuthTokens tokens) async {
    await _storage.setString(_accessTokenKey, tokens.accessToken);
    await _storage.setString(_refreshTokenKey, tokens.refreshToken);
    await _storage.setString(
      _tokenExpiryKey,
      tokens.expiresAt.toIso8601String(),
    );
  }

  /// Clear all authentication data from storage
  Future<void> _clearAuthData() async {
    await _storage.remove(_accessTokenKey);
    await _storage.remove(_refreshTokenKey);
    await _storage.remove(_tokenExpiryKey);
    await _storage.remove(_userKey);
  }
}
