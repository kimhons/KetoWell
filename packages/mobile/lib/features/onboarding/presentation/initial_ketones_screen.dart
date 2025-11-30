import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../../../shared/widgets/inputs/custom_text_input.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class InitialKetonesScreen extends StatefulWidget {
  const InitialKetonesScreen({super.key});

  @override
  State<InitialKetonesScreen> createState() => _InitialKetonesScreenState();
}

class _InitialKetonesScreenState extends State<InitialKetonesScreen> {
  final _ketonesController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    // Load existing value from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress && state.data.initialKetones != null) {
      _ketonesController.text = state.data.initialKetones.toString();
    }
  }

  @override
  void dispose() {
    _ketonesController.dispose();
    super.dispose();
  }

  void _handleContinue() {
    double? ketones;
    if (_ketonesController.text.isNotEmpty) {
      if (!_formKey.currentState!.validate()) return;
      ketones = double.parse(_ketonesController.text);
    }

    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingInitialKetonesUpdated(ketones),
        );

    // Navigate to education screens
    Navigator.of(context).pushNamed('/onboarding/education-electrolytes');
  }

  void _handleSkip() {
    // Continue without ketone reading
    context.read<OnboardingBloc>().add(
          const OnboardingInitialKetonesUpdated(null),
        );
    Navigator.of(context).pushNamed('/onboarding/education-electrolytes');
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
          'Step 8 of 10',
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
                      value: 8 / 10,
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
                          Icons.science_outlined,
                          size: 48,
                          color: AppColors.primary,
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Title
                    Text(
                      'Initial Ketone Reading',
                      style: AppTextStyles.h2.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'If you have a ketone meter, enter your current reading. This is optional.',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.textSecondary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 32),
                    // Info box
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.info.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.info),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.info_outline,
                                color: AppColors.info,
                                size: 20,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'About Ketone Levels:',
                                style: AppTextStyles.body.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.info,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            '• Normal (not in ketosis): < 0.5 mmol/L\n'
                            '• Light ketosis: 0.5 - 1.0 mmol/L\n'
                            '• Optimal ketosis: 1.0 - 3.0 mmol/L\n'
                            '• High ketosis: 3.0 - 5.0 mmol/L\n'
                            '• Concerning (seek medical): > 5.0 mmol/L',
                            style: AppTextStyles.caption.copyWith(
                              color: AppColors.textPrimary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Ketone input
                    Text(
                      'Blood Ketone Level (Optional)',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _ketonesController,
                      hint: 'Enter ketone reading',
                      type: TextInputType.number,
                      prefixIcon: Icons.science_outlined,
                      suffixText: 'mmol/L',
                      helperText: 'Leave blank if you don\'t have a meter',
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return null; // Optional field
                        }
                        final ketones = double.tryParse(value);
                        if (ketones == null || ketones < 0 || ketones > 10) {
                          return 'Please enter a valid reading (0-10 mmol/L)';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    // Warning for high ketones
                    if (_ketonesController.text.isNotEmpty)
                      Builder(
                        builder: (context) {
                          final ketones =
                              double.tryParse(_ketonesController.text);
                          if (ketones != null && ketones > 5.0) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 24),
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: AppColors.error.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: AppColors.error),
                              ),
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.warning_outlined,
                                    color: AppColors.error,
                                    size: 20,
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      'This reading is concerning. Please consult your physician before continuing.',
                                      style: AppTextStyles.caption.copyWith(
                                        color: AppColors.error,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }
                          return const SizedBox.shrink();
                        },
                      ),
                    // Info about meters
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Don\'t have a ketone meter?',
                            style: AppTextStyles.body.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'No problem! You can track ketosis using other methods:\n\n'
                            '• Urine test strips (less accurate)\n'
                            '• Breath ketone meter\n'
                            '• Physical symptoms (energy, mental clarity)\n\n'
                            'You can add your first reading later in the app.',
                            style: AppTextStyles.caption.copyWith(
                              color: AppColors.textSecondary,
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
