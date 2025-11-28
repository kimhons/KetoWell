import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

/// Service to monitor network connectivity status
class ConnectivityService {
  final Connectivity _connectivity;
  StreamController<bool>? _connectivityController;

  ConnectivityService({Connectivity? connectivity})
      : _connectivity = connectivity ?? Connectivity();

  /// Stream of connectivity status (true = online, false = offline)
  Stream<bool> get onConnectivityChanged {
    _connectivityController ??= StreamController<bool>.broadcast(
      onListen: _startListening,
      onCancel: _stopListening,
    );
    return _connectivityController!.stream;
  }

  StreamSubscription<List<ConnectivityResult>>? _subscription;

  void _startListening() {
    _subscription = _connectivity.onConnectivityChanged.listen((results) {
      final isConnected = _isConnected(results);
      _connectivityController?.add(isConnected);
    });

    // Emit initial connectivity status
    _checkInitialConnectivity();
  }

  void _stopListening() {
    _subscription?.cancel();
    _subscription = null;
  }

  Future<void> _checkInitialConnectivity() async {
    final results = await _connectivity.checkConnectivity();
    final isConnected = _isConnected(results);
    _connectivityController?.add(isConnected);
  }

  bool _isConnected(List<ConnectivityResult> results) {
    // Consider connected if any result is not 'none'
    return results.any((result) => result != ConnectivityResult.none);
  }

  /// Check current connectivity status
  Future<bool> get isConnected async {
    final results = await _connectivity.checkConnectivity();
    return _isConnected(results);
  }

  /// Dispose resources
  void dispose() {
    _subscription?.cancel();
    _connectivityController?.close();
  }
}
