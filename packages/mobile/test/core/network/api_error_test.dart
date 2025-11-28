import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/network/api_error.dart';

void main() {
  group('ApiError', () {
    test('should create network error', () {
      final error = ApiError.network('Connection failed');

      expect(error.type, ApiErrorType.network);
      expect(error.message, 'Connection failed');
      expect(error.statusCode, isNull);
    });

    test('should create timeout error', () {
      final error = ApiError.timeout();

      expect(error.type, ApiErrorType.timeout);
      expect(error.message, contains('timeout'));
      expect(error.statusCode, isNull);
    });

    test('should create unauthorized error with default message', () {
      final error = ApiError.unauthorized();

      expect(error.type, ApiErrorType.unauthorized);
      expect(error.message, contains('Unauthorized'));
      expect(error.statusCode, 401);
    });

    test('should create unauthorized error with custom message', () {
      final error = ApiError.unauthorized('Invalid token');

      expect(error.type, ApiErrorType.unauthorized);
      expect(error.message, 'Invalid token');
      expect(error.statusCode, 401);
    });

    test('should create forbidden error', () {
      final error = ApiError.forbidden();

      expect(error.type, ApiErrorType.forbidden);
      expect(error.statusCode, 403);
    });

    test('should create not found error', () {
      final error = ApiError.notFound();

      expect(error.type, ApiErrorType.notFound);
      expect(error.statusCode, 404);
    });

    test('should create server error', () {
      final error = ApiError.serverError();

      expect(error.type, ApiErrorType.serverError);
      expect(error.statusCode, 500);
    });

    test('should create unknown error', () {
      final error = ApiError.unknown('Something went wrong');

      expect(error.type, ApiErrorType.unknown);
      expect(error.message, 'Something went wrong');
    });

    test('should support equality comparison', () {
      final error1 = ApiError.network('Connection failed');
      final error2 = ApiError.network('Connection failed');
      final error3 = ApiError.timeout();

      expect(error1, equals(error2));
      expect(error1, isNot(equals(error3)));
    });

    test('should have proper toString', () {
      final error = ApiError.unauthorized('Invalid token');

      expect(
        error.toString(),
        'ApiError(type: ApiErrorType.unauthorized, message: Invalid token, statusCode: 401)',
      );
    });
  });
}
