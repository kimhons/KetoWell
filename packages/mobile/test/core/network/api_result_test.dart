import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/network/api_error.dart';
import 'package:ketowell/core/network/api_result.dart';

void main() {
  group('ApiResult', () {
    test('ApiSuccess should hold data', () {
      const result = ApiSuccess<String>('test data');

      expect(result.data, 'test data');
      expect(result.isSuccess, isTrue);
      expect(result.isFailure, isFalse);
    });

    test('ApiFailure should hold error', () {
      final error = ApiError.network('Connection failed');
      final result = ApiFailure<String>(error);

      expect(result.error, error);
      expect(result.isSuccess, isFalse);
      expect(result.isFailure, isTrue);
    });

    test('dataOrNull should return data for success', () {
      const result = ApiSuccess<int>(42);

      expect(result.dataOrNull, 42);
    });

    test('dataOrNull should return null for failure', () {
      final result = ApiFailure<int>(ApiError.network('Failed'));

      expect(result.dataOrNull, isNull);
    });

    test('errorOrNull should return error for failure', () {
      final error = ApiError.timeout();
      final result = ApiFailure<String>(error);

      expect(result.errorOrNull, error);
    });

    test('errorOrNull should return null for success', () {
      const result = ApiSuccess<String>('data');

      expect(result.errorOrNull, isNull);
    });

    test('when should execute onSuccess for success result', () {
      const result = ApiSuccess<String>('test');
      String? executedWith;

      result.when(
        onSuccess: (data) {
          executedWith = data;
          return 'success';
        },
        onFailure: (error) => 'failure',
      );

      expect(executedWith, 'test');
    });

    test('when should execute onFailure for failure result', () {
      final error = ApiError.network('Failed');
      final result = ApiFailure<String>(error);
      ApiError? executedWith;

      result.when(
        onSuccess: (data) => 'success',
        onFailure: (err) {
          executedWith = err;
          return 'failure';
        },
      );

      expect(executedWith, error);
    });

    test('map should transform success data', () {
      const result = ApiSuccess<int>(42);

      final mapped = result.map((data) => data.toString());

      expect(mapped, isA<ApiSuccess<String>>());
      expect(mapped.dataOrNull, '42');
    });

    test('map should preserve failure', () {
      final error = ApiError.timeout();
      final result = ApiFailure<int>(error);

      final mapped = result.map((data) => data.toString());

      expect(mapped, isA<ApiFailure<String>>());
      expect(mapped.errorOrNull, error);
    });

    test('should support equality comparison', () {
      const success1 = ApiSuccess<String>('data');
      const success2 = ApiSuccess<String>('data');
      const success3 = ApiSuccess<String>('other');

      expect(success1, equals(success2));
      expect(success1, isNot(equals(success3)));

      final error = ApiError.network('Failed');
      final failure1 = ApiFailure<String>(error);
      final failure2 = ApiFailure<String>(error);

      expect(failure1, equals(failure2));
    });
  });
}
