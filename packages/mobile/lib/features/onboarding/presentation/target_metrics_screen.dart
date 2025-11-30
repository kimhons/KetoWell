import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../../../shared/widgets/inputs/custom_text_input.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class TargetMetricsScreen extends StatefulWidget {
  const TargetMetricsScreen({super.key});

  @override
  State<TargetMetricsScreen> createState() => _TargetMetricsScreenState();
}

class _TargetMetricsScreenState extends State<TargetMetricsScreen> {
  final _targetWeightController = TextEditingController();
  final _targetDaysController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    // Load existing values from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      if (state.data.targetWeight != null) {
        _targetWeightController.text = state.data.targetWeight.toString();
      }
      if (state.data.targetDays != null) {
        _targetDaysController.text = state.data.targetDays.toString();
      }
    }
  }

  @override
  void dispose() {
    _targetWeightController.dispose();
    _targetDaysController.dispose();
    super.dispose();
  }

  void _handleContinue() {
    if (!_formKey.currentState!.validate()) return;

    final targetWeight = double.tryParse(_targetWeightController.text);
    final targetDays = int.tryParse(_targetDaysController.text);

    // Update BLoC with current goal and targets
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      context.read<OnboardingBloc>().add(
            OnboardingGoalUpdated(
              goal: state.data.primaryGoal,
              targetWeight: targetWeight,
              targetDays: targetDays,
            ),
          );
    }

    // Navigate to baseline measurements
    Navigator.of(context).pushNamed('/onboarding/baseline-measurements');
  }

  void _handleSkip() {
    // Continue without targets
    Navigator.of(context).pushNamed('/onboarding/baseline-measurements');
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
          'Step 6 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Progress indicator
                    LinearProgressIndicator(
                      value: 6 / 10,
                      backgroundColor: AppColors.border,
                      valueColor:
                          AlwaysStoppedAnimation<Color>(AppColors.primary),
                    ),
                    const SizedBox(height: 32),
                    // Icon
                    Center(
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: AppColors.primary.withOpacity(0.1),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.track_changes_outlined,
                          size: 48,
                          color: AppColors.primary,
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Title
                    Text(
                      'Set Your Target',
                      style: AppTextStyles.h2.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Having specific goals helps you stay motivated and track progress.',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.textSecondary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 32),
                    // Target weight input
                    Text(
                      'Target Weight',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _targetWeightController,
                      hint: 'Enter target weight (kg)',
                      type: TextInputType.number,
                      prefixIcon: Icons.monitor_weight_outlined,
                      suffixText: 'kg',
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your target weight';
                        }
                        final weight = double.tryParse(value);
                        if (weight == null || weight <= 0 || weight > 300) {
                          return 'Please enter a valid weight (1-300 kg)';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    // Target timeline input
                    Text(
                      'Timeline (Optional)',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _targetDaysController,
                      hint: 'How many days to reach your goal?',
                      type: TextInputType.number,
                      prefixIcon: Icons.calendar_today_outlined,
                      suffixText: 'days',
                      helperText: 'Recommended: 90-180 days for sustainable weight loss',
                    ),
                    const SizedBox(height: 24),
                    // Info box
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.info.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.info),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.lightbulb_outline,
                            color: AppColors.info,
                            size: 20,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              'Healthy weight loss is typically 0.5-1 kg per week. We\'ll help you set realistic expectations.',
                              style: AppTextStyles.caption.copyWith(
                                color: AppColors.textPrimary,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    // Continue button
                    CustomButton(
                      text: 'Continue',
                      onPressed: _handleContinue,
                      isFullWidth: true,
                      size: ButtonSize.large,
                    ),
                    const SizedBox(height: 12),
                    // Skip button
                    CustomButton(
                      text: 'Skip for now',
                      onPressed: _handleSkip,
                      variant: ButtonVariant.text,
                      isFullWidth: true,
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
