import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class EducationSafetyScreen extends StatefulWidget {
  const EducationSafetyScreen({super.key});

  @override
  State<EducationSafetyScreen> createState() => _EducationSafetyScreenState();
}

class _EducationSafetyScreenState extends State<EducationSafetyScreen> {
  bool _acknowledged = false;

  @override
  void initState() {
    super.initState();
    // Load existing acknowledgment from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _acknowledged = state.data.safetyAcknowledged;
    }
  }

  void _handleContinue() {
    if (!_acknowledged) {
      _showAcknowledgmentDialog();
      return;
    }

    // Update BLoC
    context.read<OnboardingBloc>().add(
          const OnboardingSafetyAcknowledged(),
        );

    // Navigate to final consent
    Navigator.of(context).pushNamed('/onboarding/consent');
  }

  void _showAcknowledgmentDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text(
          'Please Acknowledge',
          style: AppTextStyles.h4.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        content: Text(
          'Please confirm that you understand the safety guidelines before continuing.',
          style: AppTextStyles.body,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              'OK',
              style: AppTextStyles.body.copyWith(
                color: AppColors.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
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
          'Step 9 of 10',
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
                  value: 9 / 10,
                  backgroundColor: AppColors.border,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Icon
                        Center(
                          child: Container(
                            width: 80,
                            height: 80,
                            decoration: BoxDecoration(
                              color: AppColors.error.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              Icons.health_and_safety_outlined,
                              size: 48,
                              color: AppColors.error,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Title
                        Text(
                          'Safety Guidelines',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Know when to seek medical attention and how to stay safe.',
                          style: AppTextStyles.body.copyWith(
                            color: AppColors.textSecondary,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 32),
                        // Seek immediate medical attention
                        _buildWarningCard(
                          title: '🚨 Seek Immediate Medical Attention If:',
                          items: [
                            'Severe abdominal pain',
                            'Persistent vomiting',
                            'Rapid heartbeat (> 120 bpm at rest)',
                            'Chest pain or difficulty breathing',
                            'Confusion or disorientation',
                            'Blood ketones > 5.0 mmol/L',
                            'Severe dehydration',
                          ],
                          color: AppColors.error,
                        ),
                        const SizedBox(height: 16),
                        // Contact physician
                        _buildWarningCard(
                          title: '⚠️ Contact Your Physician If:',
                          items: [
                            'Symptoms persist beyond 2 weeks',
                            'Significant changes in medication needs',
                            'Unusual fatigue or weakness',
                            'Persistent muscle cramps',
                            'Changes in menstrual cycle',
                            'Any concerning symptoms',
                          ],
                          color: AppColors.warning,
                        ),
                        const SizedBox(height: 16),
                        // Safety tips
                        _buildInfoCard(
                          title: '✅ Safety Tips',
                          content:
                              '• Monitor blood sugar if diabetic\n'
                              '• Track ketone levels weekly\n'
                              '• Stay hydrated (2-3L water/day)\n'
                              '• Don\'t skip electrolytes\n'
                              '• Listen to your body\n'
                              '• Report medication side effects\n'
                              '• Keep physician informed',
                          color: AppColors.success,
                        ),
                        const SizedBox(height: 16),
                        // Dr. Ketone reminder
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.info.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppColors.info),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                Icons.smart_toy_outlined,
                                color: AppColors.info,
                                size: 24,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Dr. Ketone Is Here to Help',
                                      style: AppTextStyles.body.copyWith(
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.info,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      'Our AI health agent monitors your progress and will proactively check in if it detects concerning patterns. But Dr. Ketone is NOT a replacement for your physician.',
                                      style: AppTextStyles.caption.copyWith(
                                        color: AppColors.textPrimary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Acknowledgment checkbox
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              _acknowledged = !_acknowledged;
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: _acknowledged
                                  ? AppColors.primary.withOpacity(0.1)
                                  : AppColors.surface,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: _acknowledged
                                    ? AppColors.primary
                                    : AppColors.border,
                                width: _acknowledged ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 24,
                                  height: 24,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(6),
                                    border: Border.all(
                                      color: _acknowledged
                                          ? AppColors.primary
                                          : AppColors.border,
                                      width: 2,
                                    ),
                                    color: _acknowledged
                                        ? AppColors.primary
                                        : Colors.transparent,
                                  ),
                                  child: _acknowledged
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
                                    'I understand the safety guidelines and will seek medical attention when appropriate',
                                    style: AppTextStyles.body.copyWith(
                                      fontWeight: _acknowledged
                                          ? FontWeight.w600
                                          : FontWeight.normal,
                                      color: _acknowledged
                                          ? AppColors.primary
                                          : AppColors.textPrimary,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Continue button
                        CustomButton(
                          text: 'Continue',
                          onPressed: _handleContinue,
                          isFullWidth: true,
                          size: ButtonSize.large,
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

  Widget _buildWarningCard({
    required String title,
    required List<String> items,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color, width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: AppTextStyles.body.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 12),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '• ',
                      style: AppTextStyles.caption.copyWith(
                        color: AppColors.textPrimary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Expanded(
                      child: Text(
                        item,
                        style: AppTextStyles.caption.copyWith(
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildInfoCard({
    required String title,
    required String content,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: AppTextStyles.body.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: AppTextStyles.caption.copyWith(
              color: AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
