import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/utils/logger.dart';
import '../../../shared/models/onboarding.dart';
import 'onboarding_event.dart';
import 'onboarding_state.dart';

/// BLoC for managing onboarding flow
class OnboardingBloc extends Bloc<OnboardingEvent, OnboardingState> {
  final Logger _logger = Logger.tagged('OnboardingBloc');

  static const int totalSteps = 10; // Total onboarding screens

  OnboardingBloc() : super(const OnboardingInitial()) {
    on<OnboardingStarted>(_onStarted);
    on<OnboardingMedicationsUpdated>(_onMedicationsUpdated);
    on<OnboardingSGLT2InhibitorUpdated>(_onSGLT2InhibitorUpdated);
    on<OnboardingMedicalConditionsUpdated>(_onMedicalConditionsUpdated);
    on<OnboardingPhysicianClearanceUpdated>(_onPhysicianClearanceUpdated);
    on<OnboardingGoalUpdated>(_onGoalUpdated);
    on<OnboardingMeasurementsUpdated>(_onMeasurementsUpdated);
    on<OnboardingEducationAcknowledged>(_onEducationAcknowledged);
    on<OnboardingConsentGiven>(_onConsentGiven);
    on<OnboardingCompleteRequested>(_onCompleteRequested);
    on<OnboardingNextStep>(_onNextStep);
    on<OnboardingPreviousStep>(_onPreviousStep);
  }

  void _onStarted(
    OnboardingStarted event,
    Emitter<OnboardingState> emit,
  ) {
    _logger.info('Starting onboarding flow');

    // Create initial onboarding data with default values
    final initialData = OnboardingData(
      primaryGoal: HealthGoal.generalWellness,
      weight: 70.0,
      height: 170.0,
      age: 30,
      gender: 'male',
      activityLevel: ActivityLevel.sedentary,
    );

    emit(OnboardingInProgress(
      data: initialData,
      currentStep: 1,
      totalSteps: totalSteps,
    ));
  }

  void _onMedicationsUpdated(
    OnboardingMedicationsUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        currentMedications: event.medications,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Updated medications: ${event.medications.length} items');
    }
  }

  void _onSGLT2InhibitorUpdated(
    OnboardingSGLT2InhibitorUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        takesSGLT2Inhibitor: event.takesSGLT2Inhibitor,
        hasContraindications: event.takesSGLT2Inhibitor,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.warning(
        'SGLT2 inhibitor status: ${event.takesSGLT2Inhibitor}',
      );
    }
  }

  void _onMedicalConditionsUpdated(
    OnboardingMedicalConditionsUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        medicalConditions: event.conditions,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Updated medical conditions: ${event.conditions.length} items');
    }
  }

  void _onPhysicianClearanceUpdated(
    OnboardingPhysicianClearanceUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        hasPhysicianClearance: event.hasPhysicianClearance,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Physician clearance: ${event.hasPhysicianClearance}');
    }
  }

  void _onGoalUpdated(
    OnboardingGoalUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        primaryGoal: event.goal,
        targetWeight: event.targetWeight,
        targetDays: event.targetDays,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Updated goal: ${event.goal.name}');
    }
  }

  void _onMeasurementsUpdated(
    OnboardingMeasurementsUpdated event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        weight: event.weight,
        height: event.height,
        age: event.age,
        gender: event.gender,
        activityLevel: event.activityLevel,
        initialKetones: event.initialKetones,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Updated measurements: ${event.weight}kg, ${event.height}cm');
    }
  }

  void _onEducationAcknowledged(
    OnboardingEducationAcknowledged event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        acknowledgedElectrolytes: event.electrolytes ||
            currentState.data.acknowledgedElectrolytes,
        acknowledgedKetoFlu:
            event.ketoFlu || currentState.data.acknowledgedKetoFlu,
        acknowledgedSafety:
            event.safety || currentState.data.acknowledgedSafety,
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Education acknowledged');
    }
  }

  void _onConsentGiven(
    OnboardingConsentGiven event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      final updatedData = currentState.data.copyWith(
        consentGiven: true,
        consentDate: DateTime.now(),
      );

      emit(currentState.copyWith(data: updatedData));
      _logger.info('Consent given');
    }
  }

  Future<void> _onCompleteRequested(
    OnboardingCompleteRequested event,
    Emitter<OnboardingState> emit,
  ) async {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;

      if (!currentState.data.isComplete) {
        emit(const OnboardingError('Onboarding is not complete'));
        emit(currentState);
        return;
      }

      emit(const OnboardingLoading());

      // TODO: Submit to API
      await Future.delayed(const Duration(seconds: 1));

      emit(OnboardingCompleted(currentState.data));
      _logger.info('Onboarding completed successfully');
    }
  }

  void _onNextStep(
    OnboardingNextStep event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      if (currentState.currentStep < totalSteps) {
        emit(currentState.copyWith(
          currentStep: currentState.currentStep + 1,
        ));
        _logger.debug('Moved to step ${currentState.currentStep + 1}');
      }
    }
  }

  void _onPreviousStep(
    OnboardingPreviousStep event,
    Emitter<OnboardingState> emit,
  ) {
    if (state is OnboardingInProgress) {
      final currentState = state as OnboardingInProgress;
      if (currentState.currentStep > 1) {
        emit(currentState.copyWith(
          currentStep: currentState.currentStep - 1,
        ));
        _logger.debug('Moved to step ${currentState.currentStep - 1}');
      }
    }
  }
}
