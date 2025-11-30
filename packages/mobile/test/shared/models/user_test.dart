import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/models/user.dart';

void main() {
  group('User', () {
    final testDate = DateTime(2024, 1, 1);
    final testUser = User(
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: testDate,
      lastLoginAt: testDate,
    );

    test('should create User instance', () {
      expect(testUser.id, '123');
      expect(testUser.email, 'test@example.com');
      expect(testUser.name, 'Test User');
      expect(testUser.avatarUrl, 'https://example.com/avatar.jpg');
      expect(testUser.createdAt, testDate);
      expect(testUser.lastLoginAt, testDate);
    });

    test('should create User from JSON', () {
      final json = {
        'id': '123',
        'email': 'test@example.com',
        'name': 'Test User',
        'avatarUrl': 'https://example.com/avatar.jpg',
        'createdAt': '2024-01-01T00:00:00.000',
        'lastLoginAt': '2024-01-01T00:00:00.000',
      };

      final user = User.fromJson(json);

      expect(user.id, '123');
      expect(user.email, 'test@example.com');
      expect(user.name, 'Test User');
      expect(user.avatarUrl, 'https://example.com/avatar.jpg');
    });

    test('should create User from JSON without optional fields', () {
      final json = {
        'id': '123',
        'email': 'test@example.com',
        'name': 'Test User',
        'createdAt': '2024-01-01T00:00:00.000',
      };

      final user = User.fromJson(json);

      expect(user.id, '123');
      expect(user.avatarUrl, isNull);
      expect(user.lastLoginAt, isNull);
    });

    test('should convert User to JSON', () {
      final json = testUser.toJson();

      expect(json['id'], '123');
      expect(json['email'], 'test@example.com');
      expect(json['name'], 'Test User');
      expect(json['avatarUrl'], 'https://example.com/avatar.jpg');
      expect(json['createdAt'], isA<String>());
      expect(json['lastLoginAt'], isA<String>());
    });

    test('should create copy with updated fields', () {
      final updated = testUser.copyWith(
        name: 'Updated Name',
        email: 'updated@example.com',
      );

      expect(updated.id, '123');
      expect(updated.name, 'Updated Name');
      expect(updated.email, 'updated@example.com');
      expect(updated.avatarUrl, 'https://example.com/avatar.jpg');
    });

    test('should support equality comparison', () {
      final user1 = User(
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: testDate,
      );

      final user2 = User(
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: testDate,
      );

      expect(user1, equals(user2));
    });

    test('should not be equal with different values', () {
      final user1 = User(
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: testDate,
      );

      final user2 = User(
        id: '456',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: testDate,
      );

      expect(user1, isNot(equals(user2)));
    });
  });

  group('AuthTokens', () {
    final testExpiry = DateTime(2024, 1, 1, 12, 0);

    test('should create AuthTokens instance', () {
      final tokens = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: testExpiry,
      );

      expect(tokens.accessToken, 'access123');
      expect(tokens.refreshToken, 'refresh456');
      expect(tokens.expiresAt, testExpiry);
    });

    test('should create AuthTokens from JSON', () {
      final json = {
        'accessToken': 'access123',
        'refreshToken': 'refresh456',
        'expiresAt': '2024-01-01T12:00:00.000',
      };

      final tokens = AuthTokens.fromJson(json);

      expect(tokens.accessToken, 'access123');
      expect(tokens.refreshToken, 'refresh456');
    });

    test('should convert AuthTokens to JSON', () {
      final tokens = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: testExpiry,
      );

      final json = tokens.toJson();

      expect(json['accessToken'], 'access123');
      expect(json['refreshToken'], 'refresh456');
      expect(json['expiresAt'], isA<String>());
    });

    test('should check if token is expired', () {
      final expiredTokens = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: DateTime.now().subtract(const Duration(hours: 1)),
      );

      expect(expiredTokens.isExpired, isTrue);
    });

    test('should check if token is not expired', () {
      final validTokens = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: DateTime.now().add(const Duration(hours: 1)),
      );

      expect(validTokens.isExpired, isFalse);
    });

    test('should support equality comparison', () {
      final tokens1 = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: testExpiry,
      );

      final tokens2 = AuthTokens(
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expiresAt: testExpiry,
      );

      expect(tokens1, equals(tokens2));
    });
  });

  group('SignUpRequest', () {
    test('should create SignUpRequest instance', () {
      const request = SignUpRequest(
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      );

      expect(request.email, 'test@example.com');
      expect(request.password, 'Password123');
      expect(request.name, 'Test User');
    });

    test('should convert SignUpRequest to JSON', () {
      const request = SignUpRequest(
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      );

      final json = request.toJson();

      expect(json['email'], 'test@example.com');
      expect(json['password'], 'Password123');
      expect(json['name'], 'Test User');
    });
  });

  group('LoginRequest', () {
    test('should create LoginRequest instance', () {
      const request = LoginRequest(
        email: 'test@example.com',
        password: 'Password123',
      );

      expect(request.email, 'test@example.com');
      expect(request.password, 'Password123');
    });

    test('should convert LoginRequest to JSON', () {
      const request = LoginRequest(
        email: 'test@example.com',
        password: 'Password123',
      );

      final json = request.toJson();

      expect(json['email'], 'test@example.com');
      expect(json['password'], 'Password123');
    });
  });

  group('AuthResponse', () {
    final testDate = DateTime(2024, 1, 1);
    final testUser = User(
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: testDate,
    );

    final testTokens = AuthTokens(
      accessToken: 'access123',
      refreshToken: 'refresh456',
      expiresAt: testDate,
    );

    test('should create AuthResponse instance', () {
      final response = AuthResponse(
        user: testUser,
        tokens: testTokens,
      );

      expect(response.user, testUser);
      expect(response.tokens, testTokens);
    });

    test('should create AuthResponse from JSON', () {
      final json = {
        'user': {
          'id': '123',
          'email': 'test@example.com',
          'name': 'Test User',
          'createdAt': '2024-01-01T00:00:00.000',
        },
        'tokens': {
          'accessToken': 'access123',
          'refreshToken': 'refresh456',
          'expiresAt': '2024-01-01T00:00:00.000',
        },
      };

      final response = AuthResponse.fromJson(json);

      expect(response.user.id, '123');
      expect(response.tokens.accessToken, 'access123');
    });

    test('should convert AuthResponse to JSON', () {
      final response = AuthResponse(
        user: testUser,
        tokens: testTokens,
      );

      final json = response.toJson();

      expect(json['user'], isA<Map<String, dynamic>>());
      expect(json['tokens'], isA<Map<String, dynamic>>());
    });
  });
}
