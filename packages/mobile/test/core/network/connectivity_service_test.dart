import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/network/connectivity_service.dart';

class MockConnectivity implements Connectivity {
  final StreamController<List<ConnectivityResult>> _controller =
      StreamController<List<ConnectivityResult>>.broadcast();

  List<ConnectivityResult> _currentResult = [ConnectivityResult.wifi];

  @override
  Stream<List<ConnectivityResult>> get onConnectivityChanged =>
      _controller.stream;

  @override
  Future<List<ConnectivityResult>> checkConnectivity() async {
    return _currentResult;
  }

  void emitConnectivity(List<ConnectivityResult> result) {
    _currentResult = result;
    _controller.add(result);
  }

  void dispose() {
    _controller.close();
  }
}

void main() {
  group('ConnectivityService', () {
    late MockConnectivity mockConnectivity;
    late ConnectivityService service;

    setUp(() {
      mockConnectivity = MockConnectivity();
      service = ConnectivityService(connectivity: mockConnectivity);
    });

    tearDown(() {
      service.dispose();
      mockConnectivity.dispose();
    });

    test('should return true when connected to WiFi', () async {
      // Arrange
      mockConnectivity.emitConnectivity([ConnectivityResult.wifi]);

      // Act
      final isConnected = await service.isConnected;

      // Assert
      expect(isConnected, isTrue);
    });

    test('should return true when connected to mobile', () async {
      // Arrange
      mockConnectivity.emitConnectivity([ConnectivityResult.mobile]);

      // Act
      final isConnected = await service.isConnected;

      // Assert
      expect(isConnected, isTrue);
    });

    test('should return false when not connected', () async {
      // Arrange
      mockConnectivity.emitConnectivity([ConnectivityResult.none]);

      // Act
      final isConnected = await service.isConnected;

      // Assert
      expect(isConnected, isFalse);
    });

    test('should emit connectivity changes', () async {
      // Arrange
      final events = <bool>[];
      final subscription = service.onConnectivityChanged.listen(events.add);

      // Wait for initial connectivity check
      await Future.delayed(const Duration(milliseconds: 100));

      // Act
      mockConnectivity.emitConnectivity([ConnectivityResult.wifi]);
      await Future.delayed(const Duration(milliseconds: 50));

      mockConnectivity.emitConnectivity([ConnectivityResult.none]);
      await Future.delayed(const Duration(milliseconds: 50));

      mockConnectivity.emitConnectivity([ConnectivityResult.mobile]);
      await Future.delayed(const Duration(milliseconds: 50));

      // Assert
      expect(events.length, greaterThanOrEqualTo(3));
      expect(events.last, isTrue); // Last event should be connected (mobile)

      subscription.cancel();
    });

    test('should handle multiple connectivity results', () async {
      // Arrange - Device has both WiFi and mobile data
      mockConnectivity.emitConnectivity([
        ConnectivityResult.wifi,
        ConnectivityResult.mobile,
      ]);

      // Act
      final isConnected = await service.isConnected;

      // Assert
      expect(isConnected, isTrue);
    });
  });
}
