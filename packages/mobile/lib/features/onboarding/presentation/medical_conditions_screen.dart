import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class MedicalConditionsScreen extends StatefulWidget {
  const MedicalConditionsScreen({super.key});

  @override
  State<MedicalConditionsScreen> createState() =>
      _MedicalConditionsScreenState();
}

class _MedicalConditionsScreenState extends State<MedicalConditionsScreen> {
  final Set<String> _selectedConditions = {};

  // Common medical conditions relevant to ketogenic diet
  final List<Map<String, String>> _conditions = [
    {
      'name': 'Type 2 Diabetes',
      'description': 'High blood sugar, insulin resistance',
    },
    {
      'name': 'Type 1 Diabetes',
      'description': 'Insulin-dependent diabetes',
    },
    {
      'name': 'Epilepsy',
      'description': 'Seizure disorder',
    },
    {
      'name': 'Cancer',
      'description': 'Active cancer or in remission',
    },
    {
      'name': 'Cardiovascular Disease',
      'description': 'Heart disease, high blood pressure',
    },
    {
      'name': 'Kidney Disease',
      'description': 'Chronic kidney problems',
    },
    {
      'name': 'Liver Disease',
      'description': 'Fatty liver, cirrhosis, hepatitis',
    },
    {
      'name': 'Thyroid Disorder',
      'description': 'Hypothyroidism, hyperthyroidism',
    },
    {
      'name': 'PCOS',
      'description': 'Polycystic ovary syndrome',
    },
    {
      'name': 'Alzheimer\'s/Dementia',
      'description': 'Cognitive decline',
    },
    {
      'name': 'Parkinson\'s Disease',
      'description': 'Movement disorder',
    },
    {
      'name': 'Multiple Sclerosis',
      'description': 'Autoimmune neurological condition',
    },
  ];

  @override
  void initState() {
    super.initState();
    // Load existing conditions from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _selectedConditions.addAll(state.data.medicalConditions);
    }
  }

  void _toggleCondition(String condition) {
    setState(() {
      if (_selectedConditions.contains(condition)) {
        _selectedConditions.remove(condition);
      } else {
        _selectedConditions.add(condition);
      }
    });
  }

  void _handleContinue() {
    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingMedicalConditionsUpdated(_selectedConditions.toList()),
        );
    // Navigate to physician clearance
    Navigator.of(context).pushNamed('/onboarding/physician-clearance');
  }

  void _handleSkip() {
    // Clear conditions and continue
    context.read<OnboardingBloc>().add(
          const OnboardingMedicalConditionsUpdated([]),
        );
    Navigator.of(context).pushNamed('/onboarding/physician-clearance');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Step 3 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Progress indicator
                LinearProgressIndicator(
                  value: 3 / 10,
                  backgroundColor: AppColors.border,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Title
                        Text(
                          'Medical Conditions',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Select any medical conditions you have. This helps us provide personalized guidance.',
                          style: AppTextStyles.body.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Conditions list
                        Expanded(
                          child: ListView.builder(
                            itemCount: _conditions.length,
                            itemBuilder: (context, index) {
                              final condition = _conditions[index];
                              final isSelected = _selectedConditions
                                  .contains(condition['name']);

                              return GestureDetector(
                                onTap: () =>
                                    _toggleCondition(condition['name']!),
                                child: Container(
                                  margin: const EdgeInsets.only(bottom: 12),
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: isSelected
                                        ? AppColors.primary.withOpacity(0.1)
                                        : AppColors.surface,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: isSelected
                                          ? AppColors.primary
                                          : AppColors.border,
                                      width: isSelected ? 2 : 1,
                                    ),
                                  ),
                                  child: Row(
                                    children: [
                                      // Checkbox
                                      Container(
                                        width: 24,
                                        height: 24,
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(6),
                                          border: Border.all(
                                            color: isSelected
                                                ? AppColors.primary
                                                : AppColors.border,
                                            width: 2,
                                          ),
                                          color: isSelected
                                              ? AppColors.primary
                                              : Colors.transparent,
                                        ),
                                        child: isSelected
                                            ? Icon(
                                                Icons.check,
                                                size: 16,
                                                color: AppColors.background,
                                              )
                                            : null,
                                      ),
                                      const SizedBox(width: 12),
                                      // Condition info
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              condition['name']!,
                                              style: AppTextStyles.body.copyWith(
                                                fontWeight: isSelected
                                                    ? FontWeight.w600
                                                    : FontWeight.normal,
                                                color: isSelected
                                                    ? AppColors.primary
                                                    : AppColors.textPrimary,
                                              ),
                                            ),
                                            const SizedBox(height: 2),
                                            Text(
                                              condition['description']!,
                                              style:
                                                  AppTextStyles.caption.copyWith(
                                                color: AppColors.textSecondary,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Selected count
                        if (_selectedConditions.isNotEmpty)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: Text(
                              '${_selectedConditions.length} condition(s) selected',
                              style: AppTextStyles.caption.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w600,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        // Continue button
                        CustomButton(
                          text: 'Continue',
                          onPressed:
                              _selectedConditions.isNotEmpty ? _handleContinue : null,
                          isFullWidth: true,
                          size: ButtonSize.large,
                        ),
                        const SizedBox(height: 12),
                        // Skip button
                        CustomButton(
                          text: 'I don\'t have any of these conditions',
                          onPressed: _handleSkip,
                          variant: ButtonVariant.text,
                          isFullWidth: true,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
