import 'package:equatable/equatable.dart';
import '../../../shared/models/onboarding.dart';

/// Base onboarding event
abstract class OnboardingEvent extends Equatable {
  const OnboardingEvent();

  @override
  List<Object?> get props => [];
}

/// Start onboarding flow
class OnboardingStarted extends OnboardingEvent {
  const OnboardingStarted();
}

/// Update medications list
class OnboardingMedicationsUpdated extends OnboardingEvent {
  final List<String> medications;

  const OnboardingMedicationsUpdated(this.medications);

  @override
  List<Object?> get props => [medications];
}

/// Update SGLT2 inhibitor status
class OnboardingSGLT2InhibitorUpdated extends OnboardingEvent {
  final bool takesSGLT2Inhibitor;

  const OnboardingSGLT2InhibitorUpdated(this.takesSGLT2Inhibitor);

  @override
  List<Object?> get props => [takesSGLT2Inhibitor];
}

/// Update medical conditions
class OnboardingMedicalConditionsUpdated extends OnboardingEvent {
  final List<String> conditions;

  const OnboardingMedicalConditionsUpdated(this.conditions);

  @override
  List<Object?> get props => [conditions];
}

/// Update physician clearance status
class OnboardingPhysicianClearanceUpdated extends OnboardingEvent {
  final bool hasPhysicianClearance;

  const OnboardingPhysicianClearanceUpdated(this.hasPhysicianClearance);

  @override
  List<Object?> get props => [hasPhysicianClearance];
}

/// Update primary goal
class OnboardingGoalUpdated extends OnboardingEvent {
  final HealthGoal goal;
  final double? targetWeight;
  final int? targetDays;

  const OnboardingGoalUpdated({
    required this.goal,
    this.targetWeight,
    this.targetDays,
  });

  @override
  List<Object?> get props => [goal, targetWeight, targetDays];
}

/// Update baseline measurements
class OnboardingMeasurementsUpdated extends OnboardingEvent {
  final double weight;
  final double height;
  final int age;
  final String gender;
  final ActivityLevel activityLevel;
  final double? initialKetones;

  const OnboardingMeasurementsUpdated({
    required this.weight,
    required this.height,
    required this.age,
    required this.gender,
    required this.activityLevel,
    this.initialKetones,
  });

  @override
  List<Object?> get props => [
        weight,
        height,
        age,
        gender,
        activityLevel,
        initialKetones,
      ];
}

/// Acknowledge education content
class OnboardingEducationAcknowledged extends OnboardingEvent {
  final bool electrolytes;
  final bool ketoFlu;
  final bool safety;

  const OnboardingEducationAcknowledged({
    this.electrolytes = false,
    this.ketoFlu = false,
    this.safety = false,
  });

  @override
  List<Object?> get props => [electrolytes, ketoFlu, safety];
}

/// Give consent
class OnboardingConsentGiven extends OnboardingEvent {
  const OnboardingConsentGiven();
}

/// Complete onboarding and submit to API
class OnboardingCompleteRequested extends OnboardingEvent {
  const OnboardingCompleteRequested();
}

/// Move to next step
class OnboardingNextStep extends OnboardingEvent {
  const OnboardingNextStep();
}

/// Move to previous step
class OnboardingPreviousStep extends OnboardingEvent {
  const OnboardingPreviousStep();
}
