import 'package:equatable/equatable.dart';
import '../../../shared/models/onboarding.dart';

/// Base onboarding state
abstract class OnboardingState extends Equatable {
  const OnboardingState();

  @override
  List<Object?> get props => [];
}

/// Initial state - no data yet
class OnboardingInitial extends OnboardingState {
  const OnboardingInitial();
}

/// Onboarding in progress with current data
class OnboardingInProgress extends OnboardingState {
  final OnboardingData data;
  final int currentStep;
  final int totalSteps;

  const OnboardingInProgress({
    required this.data,
    required this.currentStep,
    required this.totalSteps,
  });

  @override
  List<Object?> get props => [data, currentStep, totalSteps];

  OnboardingInProgress copyWith({
    OnboardingData? data,
    int? currentStep,
    int? totalSteps,
  }) {
    return OnboardingInProgress(
      data: data ?? this.data,
      currentStep: currentStep ?? this.currentStep,
      totalSteps: totalSteps ?? this.totalSteps,
    );
  }
}

/// Onboarding completed successfully
class OnboardingCompleted extends OnboardingState {
  final OnboardingData data;

  const OnboardingCompleted(this.data);

  @override
  List<Object?> get props => [data];
}

/// Onboarding failed with error
class OnboardingError extends OnboardingState {
  final String message;

  const OnboardingError(this.message);

  @override
  List<Object?> get props => [message];
}

/// Loading state for API calls
class OnboardingLoading extends OnboardingState {
  const OnboardingLoading();
}
