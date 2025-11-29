import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/widgets/cards/stat_card.dart';

void main() {
  group('StatCard', () {
    testWidgets('should render stat card with label, value, and icon',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Weight',
              value: '75.5',
              unit: 'kg',
              icon: Icons.monitor_weight,
            ),
          ),
        ),
      );

      expect(find.text('Weight'), findsOneWidget);
      expect(find.text('75.5'), findsOneWidget);
      expect(find.text('kg'), findsOneWidget);
      expect(find.byIcon(Icons.monitor_weight), findsOneWidget);
    });

    testWidgets('should render stat card without unit', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Steps',
              value: '10,000',
              icon: Icons.directions_walk,
            ),
          ),
        ),
      );

      expect(find.text('Steps'), findsOneWidget);
      expect(find.text('10,000'), findsOneWidget);
      expect(find.byIcon(Icons.directions_walk), findsOneWidget);
    });

    testWidgets('should render positive trend', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Ketones',
              value: '2.5',
              unit: 'mmol/L',
              icon: Icons.science,
              trend: '0.5',
              isTrendPositive: true,
            ),
          ),
        ),
      );

      expect(find.text('0.5'), findsOneWidget);
      expect(find.byIcon(Icons.arrow_upward), findsOneWidget);
    });

    testWidgets('should render negative trend', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Carbs',
              value: '25',
              unit: 'g',
              icon: Icons.grain,
              trend: '5',
              isTrendPositive: false,
            ),
          ),
        ),
      );

      expect(find.text('5'), findsOneWidget);
      expect(find.byIcon(Icons.arrow_downward), findsOneWidget);
    });

    testWidgets('should call onTap when tapped', (tester) async {
      var tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Weight',
              value: '75.5',
              unit: 'kg',
              icon: Icons.monitor_weight,
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byType(StatCard));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('should render with custom icon color', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Calories',
              value: '1,800',
              unit: 'kcal',
              icon: Icons.local_fire_department,
              iconColor: Colors.orange,
            ),
          ),
        ),
      );

      final icon = tester.widget<Icon>(find.byIcon(Icons.local_fire_department));
      expect(icon.color, Colors.orange);
    });

    testWidgets('should render with custom background color', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Steps',
              value: '10,000',
              icon: Icons.directions_walk,
              backgroundColor: Colors.blue,
            ),
          ),
        ),
      );

      final container = tester.widget<Container>(
        find.descendant(
          of: find.byType(StatCard),
          matching: find.byType(Container),
        ).first,
      );

      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, Colors.blue);
    });

    testWidgets('should not render trend when trend is null', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Weight',
              value: '75.5',
              unit: 'kg',
              icon: Icons.monitor_weight,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.arrow_upward), findsNothing);
      expect(find.byIcon(Icons.arrow_downward), findsNothing);
    });

    testWidgets('should default to positive trend when isTrendPositive is null',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: StatCard(
              label: 'Ketones',
              value: '2.5',
              unit: 'mmol/L',
              icon: Icons.science,
              trend: '0.5',
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.arrow_upward), findsOneWidget);
    });
  });
}
