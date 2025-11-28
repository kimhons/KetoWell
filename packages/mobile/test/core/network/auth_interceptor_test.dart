import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/constants/app_constants.dart';
import 'package:ketowell/core/network/interceptors/auth_interceptor.dart';
import 'package:ketowell/core/storage/storage_service.dart';

class MockStorageService implements StorageService {
  final Map<String, dynamic> _data = {};

  @override
  Future<void> init() async {}

  @override
  Future<void> setString(String key, String value) async {
    _data[key] = value;
  }

  @override
  Future<String?> getString(String key) async {
    return _data[key] as String?;
  }

  @override
  Future<void> setInt(String key, int value) async {
    _data[key] = value;
  }

  @override
  Future<int?> getInt(String key) async {
    return _data[key] as int?;
  }

  @override
  Future<void> setBool(String key, bool value) async {
    _data[key] = value;
  }

  @override
  Future<bool?> getBool(String key) async {
    return _data[key] as bool?;
  }

  @override
  Future<void> setDouble(String key, double value) async {
    _data[key] = value;
  }

  @override
  Future<double?> getDouble(String key) async {
    return _data[key] as double?;
  }

  @override
  Future<void> setStringList(String key, List<String> value) async {
    _data[key] = value;
  }

  @override
  Future<List<String>?> getStringList(String key) async {
    return _data[key] as List<String>?;
  }

  @override
  Future<void> remove(String key) async {
    _data.remove(key);
  }

  @override
  Future<void> clear() async {
    _data.clear();
  }

  @override
  Future<bool> containsKey(String key) async {
    return _data.containsKey(key);
  }

  @override
  Future<Set<String>> getKeys() async {
    return _data.keys.toSet();
  }
}

void main() {
  group('AuthInterceptor', () {
    late MockStorageService storage;
    late Dio dio;
    late AuthInterceptor interceptor;

    setUp(() {
      storage = MockStorageService();
      dio = Dio();
      interceptor = AuthInterceptor(storage: storage, dio: dio);
    });

    test('should add Authorization header when token exists', () async {
      // Arrange
      await storage.setString(AppConstants.keyAccessToken, 'test_token');
      final options = RequestOptions(path: '/test');
      final handler = RequestInterceptorHandler();

      // Act
      await interceptor.onRequest(options, handler);

      // Assert
      expect(options.headers['Authorization'], 'Bearer test_token');
    });

    test('should not add Authorization header when token does not exist',
        () async {
      // Arrange
      final options = RequestOptions(path: '/test');
      final handler = RequestInterceptorHandler();

      // Act
      await interceptor.onRequest(options, handler);

      // Assert
      expect(options.headers['Authorization'], isNull);
    });

    test('should clear tokens on 401 error when no refresh token', () async {
      // Arrange
      await storage.setString(AppConstants.keyAccessToken, 'test_token');
      await storage.setString(AppConstants.keyUserId, 'user123');

      final error = DioException(
        requestOptions: RequestOptions(path: '/test'),
        response: Response(
          requestOptions: RequestOptions(path: '/test'),
          statusCode: 401,
        ),
      );
      final handler = ErrorInterceptorHandler();

      // Act
      await interceptor.onError(error, handler);

      // Assert
      final accessToken = await storage.getString(AppConstants.keyAccessToken);
      final userId = await storage.getString(AppConstants.keyUserId);
      expect(accessToken, isNull);
      expect(userId, isNull);
    });

    test('should not modify non-401 errors', () async {
      // Arrange
      await storage.setString(AppConstants.keyAccessToken, 'test_token');

      final error = DioException(
        requestOptions: RequestOptions(path: '/test'),
        response: Response(
          requestOptions: RequestOptions(path: '/test'),
          statusCode: 500,
        ),
      );
      final handler = ErrorInterceptorHandler();

      // Act
      await interceptor.onError(error, handler);

      // Assert - token should still exist
      final accessToken = await storage.getString(AppConstants.keyAccessToken);
      expect(accessToken, 'test_token');
    });
  });
}
