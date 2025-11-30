import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../../../shared/widgets/inputs/custom_text_input.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class MedicationsScreen extends StatefulWidget {
  const MedicationsScreen({super.key});

  @override
  State<MedicationsScreen> createState() => _MedicationsScreenState();
}

class _MedicationsScreenState extends State<MedicationsScreen> {
  final _medicationController = TextEditingController();
  final List<String> _medications = [];

  @override
  void initState() {
    super.initState();
    // Load existing medications from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _medications.addAll(state.data.currentMedications);
    }
  }

  @override
  void dispose() {
    _medicationController.dispose();
    super.dispose();
  }

  void _addMedication() {
    final medication = _medicationController.text.trim();
    if (medication.isNotEmpty && !_medications.contains(medication)) {
      setState(() {
        _medications.add(medication);
        _medicationController.clear();
      });
      context.read<OnboardingBloc>().add(
            OnboardingMedicationsUpdated(_medications),
          );
    }
  }

  void _removeMedication(int index) {
    setState(() {
      _medications.removeAt(index);
    });
    context.read<OnboardingBloc>().add(
          OnboardingMedicationsUpdated(_medications),
        );
  }

  void _handleContinue() {
    // Update BLoC with final medications list
    context.read<OnboardingBloc>().add(
          OnboardingMedicationsUpdated(_medications),
        );
    // Navigate to next screen
    Navigator.of(context).pushNamed('/onboarding/sglt2-check');
  }

  void _handleSkip() {
    // Clear medications and continue
    context.read<OnboardingBloc>().add(
          const OnboardingMedicationsUpdated([]),
        );
    Navigator.of(context).pushNamed('/onboarding/sglt2-check');
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
          'Step 1 of 10',
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
                    value: 1 / 10,
                    backgroundColor: AppColors.border,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                  ),
                  const SizedBox(height: 32),
                  // Title
                  Text(
                    'Current Medications',
                    style: AppTextStyles.h2.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'List any medications you\'re currently taking. This helps us identify potential contraindications.',
                    style: AppTextStyles.body.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Input field
                  Row(
                    children: [
                      Expanded(
                        child: CustomTextInput(
                          controller: _medicationController,
                          hint: 'Enter medication name',
                          prefixIcon: Icons.medication_outlined,
                          textInputAction: TextInputAction.done,
                          onSubmitted: (_) => _addMedication(),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        onPressed: _addMedication,
                        icon: Icon(
                          Icons.add_circle,
                          color: AppColors.primary,
                          size: 32,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  // Medications list
                  if (_medications.isNotEmpty) ...[
                    Text(
                      'Your Medications (${_medications.length})',
                      style: AppTextStyles.h4.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Expanded(
                      child: ListView.builder(
                        itemCount: _medications.length,
                        itemBuilder: (context, index) {
                          return Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: AppColors.surface,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppColors.border),
                            ),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.medication,
                                  color: AppColors.primary,
                                  size: 20,
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    _medications[index],
                                    style: AppTextStyles.body,
                                  ),
                                ),
                                IconButton(
                                  onPressed: () => _removeMedication(index),
                                  icon: Icon(
                                    Icons.close,
                                    color: AppColors.error,
                                    size: 20,
                                  ),
                                  padding: EdgeInsets.zero,
                                  constraints: const BoxConstraints(),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                  ] else ...[
                    Expanded(
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.medication_outlined,
                              size: 64,
                              color: AppColors.textSecondary.withOpacity(0.3),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No medications added yet',
                              style: AppTextStyles.body.copyWith(
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                  const SizedBox(height: 24),
                  // Continue button
                  CustomButton(
                    text: 'Continue',
                    onPressed: _medications.isNotEmpty ? _handleContinue : null,
                    isFullWidth: true,
                    size: ButtonSize.large,
                  ),
                  const SizedBox(height: 12),
                  // Skip button
                  CustomButton(
                    text: 'I don\'t take any medications',
                    onPressed: _handleSkip,
                    variant: ButtonVariant.text,
                    isFullWidth: true,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
