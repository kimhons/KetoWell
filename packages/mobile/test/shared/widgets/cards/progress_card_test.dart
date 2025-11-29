import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/widgets/cards/progress_card.dart';

void main() {
  group('ProgressCard', () {
    testWidgets('should render progress card with title and progress',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Daily Protein',
              current: 75.0,
              target: 100.0,
              unit: 'g',
            ),
          ),
        ),
      );

      expect(find.text('Daily Protein'), findsOneWidget);
      expect(find.text('75%'), findsOneWidget);
      expect(find.byType(LinearProgressIndicator), findsOneWidget);
    });

    testWidgets('should render subtitle when provided', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Calories',
              subtitle: 'Daily goal',
              current: 1500.0,
              target: 2000.0,
              unit: 'kcal',
            ),
          ),
        ),
      );

      expect(find.text('Calories'), findsOneWidget);
      expect(find.text('Daily goal'), findsOneWidget);
    });

    testWidgets('should calculate percentage correctly', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Water',
              current: 6.0,
              target: 8.0,
              unit: 'cups',
            ),
          ),
        ),
      );

      expect(find.text('75%'), findsOneWidget);
    });

    testWidgets('should show remaining amount', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Protein',
              current: 60.0,
              target: 100.0,
              unit: 'g',
            ),
          ),
        ),
      );

      expect(find.textContaining('40.0 g left'), findsOneWidget);
    });

    testWidgets('should show goal reached when current >= target',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Steps',
              current: 10000.0,
              target: 10000.0,
              unit: 'steps',
            ),
          ),
        ),
      );

      expect(find.text('Goal reached!'), findsOneWidget);
      expect(find.byIcon(Icons.check_circle), findsOneWidget);
    });

    testWidgets('should show goal reached when current > target',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Water',
              current: 10.0,
              target: 8.0,
              unit: 'cups',
            ),
          ),
        ),
      );

      expect(find.text('Goal reached!'), findsOneWidget);
      expect(find.text('100%'), findsOneWidget);
    });

    testWidgets('should cap progress at 100%', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Calories',
              current: 2500.0,
              target: 2000.0,
              unit: 'kcal',
            ),
          ),
        ),
      );

      expect(find.text('100%'), findsOneWidget);
    });

    testWidgets('should render icon when provided', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Protein',
              current: 75.0,
              target: 100.0,
              unit: 'g',
              icon: Icons.fitness_center,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.fitness_center), findsOneWidget);
    });

    testWidgets('should use custom progress color', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Fat',
              current: 50.0,
              target: 100.0,
              unit: 'g',
              progressColor: Colors.orange,
            ),
          ),
        ),
      );

      final progressIndicator = tester.widget<LinearProgressIndicator>(
        find.byType(LinearProgressIndicator),
      );
      final valueColor =
          progressIndicator.valueColor as AlwaysStoppedAnimation<Color>;
      expect(valueColor.value, Colors.orange);
    });

    testWidgets('should call onTap when tapped', (tester) async {
      var tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Carbs',
              current: 20.0,
              target: 50.0,
              unit: 'g',
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byType(ProgressCard));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('should show current and target values', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Protein',
              current: 75.5,
              target: 100.0,
              unit: 'g',
            ),
          ),
        ),
      );

      expect(find.textContaining('75.5'), findsOneWidget);
      expect(find.textContaining('100 g'), findsOneWidget);
    });

    testWidgets('should handle zero target gracefully', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Test',
              current: 50.0,
              target: 0.0,
              unit: 'g',
            ),
          ),
        ),
      );

      expect(find.text('0%'), findsOneWidget);
    });

    testWidgets('should handle negative current gracefully', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Test',
              current: -10.0,
              target: 100.0,
              unit: 'g',
            ),
          ),
        ),
      );

      expect(find.text('0%'), findsOneWidget);
    });

    testWidgets('should format decimal values correctly', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: ProgressCard(
              title: 'Ketones',
              current: 2.567,
              target: 3.0,
              unit: 'mmol/L',
            ),
          ),
        ),
      );

      expect(find.textContaining('2.6'), findsOneWidget);
      expect(find.textContaining('0.4 mmol/L left'), findsOneWidget);
    });
  });
}
