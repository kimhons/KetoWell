import 'package:equatable/equatable.dart';

/// User's primary health goal
enum HealthGoal {
  weightLoss,
  diabetes,
  epilepsy,
  cancer,
  cognitiveHealth,
  generalWellness,
}

/// User's activity level
enum ActivityLevel {
  sedentary,
  lightlyActive,
  moderatelyActive,
  veryActive,
  extremelyActive,
}

/// Onboarding data model
class OnboardingData extends Equatable {
  // Medical screening
  final List<String> currentMedications;
  final bool takesSGLT2Inhibitor;
  final List<String> medicalConditions;
  final bool hasContraindications;
  final bool hasPhysicianClearance;

  // Goals
  final HealthGoal primaryGoal;
  final double? targetWeight;
  final int? targetDays;

  // Baseline measurements
  final double weight;
  final double height;
  final int age;
  final String gender;
  final ActivityLevel activityLevel;
  final double? initialKetones;

  // Education acknowledgment
  final bool acknowledgedElectrolytes;
  final bool acknowledgedKetoFlu;
  final bool acknowledgedSafety;

  // Consent
  final bool consentGiven;
  final DateTime? consentDate;

  const OnboardingData({
    this.currentMedications = const [],
    this.takesSGLT2Inhibitor = false,
    this.medicalConditions = const [],
    this.hasContraindications = false,
    this.hasPhysicianClearance = false,
    required this.primaryGoal,
    this.targetWeight,
    this.targetDays,
    required this.weight,
    required this.height,
    required this.age,
    required this.gender,
    required this.activityLevel,
    this.initialKetones,
    this.acknowledgedElectrolytes = false,
    this.acknowledgedKetoFlu = false,
    this.acknowledgedSafety = false,
    this.consentGiven = false,
    this.consentDate,
  });

  /// Create OnboardingData from JSON
  factory OnboardingData.fromJson(Map<String, dynamic> json) {
    return OnboardingData(
      currentMedications: (json['currentMedications'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      takesSGLT2Inhibitor: json['takesSGLT2Inhibitor'] as bool? ?? false,
      medicalConditions: (json['medicalConditions'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      hasContraindications: json['hasContraindications'] as bool? ?? false,
      hasPhysicianClearance: json['hasPhysicianClearance'] as bool? ?? false,
      primaryGoal: HealthGoal.values.firstWhere(
        (e) => e.name == json['primaryGoal'],
        orElse: () => HealthGoal.generalWellness,
      ),
      targetWeight: json['targetWeight'] as double?,
      targetDays: json['targetDays'] as int?,
      weight: (json['weight'] as num).toDouble(),
      height: (json['height'] as num).toDouble(),
      age: json['age'] as int,
      gender: json['gender'] as String,
      activityLevel: ActivityLevel.values.firstWhere(
        (e) => e.name == json['activityLevel'],
        orElse: () => ActivityLevel.sedentary,
      ),
      initialKetones: json['initialKetones'] as double?,
      acknowledgedElectrolytes:
          json['acknowledgedElectrolytes'] as bool? ?? false,
      acknowledgedKetoFlu: json['acknowledgedKetoFlu'] as bool? ?? false,
      acknowledgedSafety: json['acknowledgedSafety'] as bool? ?? false,
      consentGiven: json['consentGiven'] as bool? ?? false,
      consentDate: json['consentDate'] != null
          ? DateTime.parse(json['consentDate'] as String)
          : null,
    );
  }

  /// Convert OnboardingData to JSON
  Map<String, dynamic> toJson() {
    return {
      'currentMedications': currentMedications,
      'takesSGLT2Inhibitor': takesSGLT2Inhibitor,
      'medicalConditions': medicalConditions,
      'hasContraindications': hasContraindications,
      'hasPhysicianClearance': hasPhysicianClearance,
      'primaryGoal': primaryGoal.name,
      'targetWeight': targetWeight,
      'targetDays': targetDays,
      'weight': weight,
      'height': height,
      'age': age,
      'gender': gender,
      'activityLevel': activityLevel.name,
      'initialKetones': initialKetones,
      'acknowledgedElectrolytes': acknowledgedElectrolytes,
      'acknowledgedKetoFlu': acknowledgedKetoFlu,
      'acknowledgedSafety': acknowledgedSafety,
      'consentGiven': consentGiven,
      'consentDate': consentDate?.toIso8601String(),
    };
  }

  /// Create a copy with updated fields
  OnboardingData copyWith({
    List<String>? currentMedications,
    bool? takesSGLT2Inhibitor,
    List<String>? medicalConditions,
    bool? hasContraindications,
    bool? hasPhysicianClearance,
    HealthGoal? primaryGoal,
    double? targetWeight,
    int? targetDays,
    double? weight,
    double? height,
    int? age,
    String? gender,
    ActivityLevel? activityLevel,
    double? initialKetones,
    bool? acknowledgedElectrolytes,
    bool? acknowledgedKetoFlu,
    bool? acknowledgedSafety,
    bool? consentGiven,
    DateTime? consentDate,
  }) {
    return OnboardingData(
      currentMedications: currentMedications ?? this.currentMedications,
      takesSGLT2Inhibitor: takesSGLT2Inhibitor ?? this.takesSGLT2Inhibitor,
      medicalConditions: medicalConditions ?? this.medicalConditions,
      hasContraindications: hasContraindications ?? this.hasContraindications,
      hasPhysicianClearance:
          hasPhysicianClearance ?? this.hasPhysicianClearance,
      primaryGoal: primaryGoal ?? this.primaryGoal,
      targetWeight: targetWeight ?? this.targetWeight,
      targetDays: targetDays ?? this.targetDays,
      weight: weight ?? this.weight,
      height: height ?? this.height,
      age: age ?? this.age,
      gender: gender ?? this.gender,
      activityLevel: activityLevel ?? this.activityLevel,
      initialKetones: initialKetones ?? this.initialKetones,
      acknowledgedElectrolytes:
          acknowledgedElectrolytes ?? this.acknowledgedElectrolytes,
      acknowledgedKetoFlu: acknowledgedKetoFlu ?? this.acknowledgedKetoFlu,
      acknowledgedSafety: acknowledgedSafety ?? this.acknowledgedSafety,
      consentGiven: consentGiven ?? this.consentGiven,
      consentDate: consentDate ?? this.consentDate,
    );
  }

  /// Check if onboarding is complete
  bool get isComplete {
    return consentGiven &&
        hasPhysicianClearance &&
        acknowledgedElectrolytes &&
        acknowledgedKetoFlu &&
        acknowledgedSafety;
  }

  /// Calculate BMI
  double get bmi {
    final heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }

  @override
  List<Object?> get props => [
        currentMedications,
        takesSGLT2Inhibitor,
        medicalConditions,
        hasContraindications,
        hasPhysicianClearance,
        primaryGoal,
        targetWeight,
        targetDays,
        weight,
        height,
        age,
        gender,
        activityLevel,
        initialKetones,
        acknowledgedElectrolytes,
        acknowledgedKetoFlu,
        acknowledgedSafety,
        consentGiven,
        consentDate,
      ];
}

/// Extension for HealthGoal display names
extension HealthGoalExtension on HealthGoal {
  String get displayName {
    switch (this) {
      case HealthGoal.weightLoss:
        return 'Weight Loss';
      case HealthGoal.diabetes:
        return 'Type 2 Diabetes Management';
      case HealthGoal.epilepsy:
        return 'Epilepsy Management';
      case HealthGoal.cancer:
        return 'Cancer Support';
      case HealthGoal.cognitiveHealth:
        return 'Cognitive Health';
      case HealthGoal.generalWellness:
        return 'General Wellness';
    }
  }

  String get description {
    switch (this) {
      case HealthGoal.weightLoss:
        return 'Lose weight and improve body composition';
      case HealthGoal.diabetes:
        return 'Improve blood sugar control and reduce medication';
      case HealthGoal.epilepsy:
        return 'Reduce seizure frequency';
      case HealthGoal.cancer:
        return 'Support cancer treatment and recovery';
      case HealthGoal.cognitiveHealth:
        return 'Enhance mental clarity and brain function';
      case HealthGoal.generalWellness:
        return 'Improve overall health and energy';
    }
  }
}

/// Extension for ActivityLevel display names
extension ActivityLevelExtension on ActivityLevel {
  String get displayName {
    switch (this) {
      case ActivityLevel.sedentary:
        return 'Sedentary';
      case ActivityLevel.lightlyActive:
        return 'Lightly Active';
      case ActivityLevel.moderatelyActive:
        return 'Moderately Active';
      case ActivityLevel.veryActive:
        return 'Very Active';
      case ActivityLevel.extremelyActive:
        return 'Extremely Active';
    }
  }

  String get description {
    switch (this) {
      case ActivityLevel.sedentary:
        return 'Little or no exercise';
      case ActivityLevel.lightlyActive:
        return 'Exercise 1-3 days/week';
      case ActivityLevel.moderatelyActive:
        return 'Exercise 3-5 days/week';
      case ActivityLevel.veryActive:
        return 'Exercise 6-7 days/week';
      case ActivityLevel.extremelyActive:
        return 'Very intense exercise daily';
    }
  }
}
