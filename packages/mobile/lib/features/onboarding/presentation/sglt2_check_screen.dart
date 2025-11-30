import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class SGLT2CheckScreen extends StatefulWidget {
  const SGLT2CheckScreen({super.key});

  @override
  State<SGLT2CheckScreen> createState() => _SGLT2CheckScreenState();
}

class _SGLT2CheckScreenState extends State<SGLT2CheckScreen> {
  bool? _takesSGLT2Inhibitor;

  @override
  void initState() {
    super.initState();
    // Load existing value from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _takesSGLT2Inhibitor = state.data.takesSGLT2Inhibitor;
    }
  }

  void _handleSelection(bool value) {
    setState(() {
      _takesSGLT2Inhibitor = value;
    });
  }

  void _handleContinue() {
    if (_takesSGLT2Inhibitor == null) return;

    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingSGLT2InhibitorUpdated(_takesSGLT2Inhibitor!),
        );

    // Navigate based on answer
    if (_takesSGLT2Inhibitor!) {
      // Show contraindication warning
      Navigator.of(context).pushNamed('/onboarding/contraindication-warning');
    } else {
      // Continue to medical conditions
      Navigator.of(context).pushNamed('/onboarding/medical-conditions');
    }
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
          'Step 2 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Progress indicator
                  LinearProgressIndicator(
                    value: 2 / 10,
                    backgroundColor: AppColors.border,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                  ),
                  const SizedBox(height: 32),
                  // Warning icon
                  Center(
                    child: Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        color: AppColors.warning.withOpacity(0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.warning_amber_rounded,
                        size: 48,
                        color: AppColors.warning,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Title
                  Text(
                    'Critical Safety Question',
                    style: AppTextStyles.h2.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Are you currently taking an SGLT2 inhibitor?',
                    style: AppTextStyles.h3.copyWith(
                      color: AppColors.textPrimary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
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
                              'Common SGLT2 Inhibitors:',
                              style: AppTextStyles.body.copyWith(
                                fontWeight: FontWeight.w600,
                                color: AppColors.info,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '• Jardiance (empagliflozin)\n'
                          '• Farxiga (dapagliflozin)\n'
                          '• Invokana (canagliflozin)\n'
                          '• Steglatro (ertugliflozin)',
                          style: AppTextStyles.caption.copyWith(
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  // Yes/No buttons
                  _buildOptionButton(
                    'Yes, I take an SGLT2 inhibitor',
                    true,
                    _takesSGLT2Inhibitor == true,
                  ),
                  const SizedBox(height: 12),
                  _buildOptionButton(
                    'No, I don\'t take an SGLT2 inhibitor',
                    false,
                    _takesSGLT2Inhibitor == false,
                  ),
                  const SizedBox(height: 24),
                  // Continue button
                  CustomButton(
                    text: 'Continue',
                    onPressed: _takesSGLT2Inhibitor != null ? _handleContinue : null,
                    isFullWidth: true,
                    size: ButtonSize.large,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildOptionButton(String text, bool value, bool isSelected) {
    return GestureDetector(
      onTap: () => _handleSelection(value),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primary.withOpacity(0.1)
              : AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.primary : AppColors.border,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? AppColors.primary : AppColors.border,
                  width: 2,
                ),
                color: isSelected ? AppColors.primary : Colors.transparent,
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
            Expanded(
              child: Text(
                text,
                style: AppTextStyles.body.copyWith(
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                  color: isSelected ? AppColors.primary : AppColors.textPrimary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
