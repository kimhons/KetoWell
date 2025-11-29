import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/widgets/navigation/custom_bottom_nav.dart';

void main() {
  group('CustomBottomNav', () {
    final testItems = [
      const NavItem(
        label: 'Home',
        icon: Icons.home_outlined,
        activeIcon: Icons.home,
        route: '/home',
      ),
      const NavItem(
        label: 'Track',
        icon: Icons.add_circle_outline,
        activeIcon: Icons.add_circle,
        route: '/track',
      ),
      const NavItem(
        label: 'Progress',
        icon: Icons.show_chart,
        route: '/progress',
      ),
      const NavItem(
        label: 'Settings',
        icon: Icons.settings_outlined,
        activeIcon: Icons.settings,
        route: '/settings',
      ),
    ];

    testWidgets('should render all navigation items', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: testItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Track'), findsOneWidget);
      expect(find.text('Progress'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });

    testWidgets('should show active icon for selected item', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: testItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      // Home is selected, should show filled icon
      expect(find.byIcon(Icons.home), findsOneWidget);
      // Others should show outlined icons
      expect(find.byIcon(Icons.add_circle_outline), findsOneWidget);
      expect(find.byIcon(Icons.settings_outlined), findsOneWidget);
    });

    testWidgets('should use regular icon when activeIcon is not provided',
        (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 2, // Progress selected
              items: testItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      // Progress doesn't have activeIcon, should use regular icon
      expect(find.byIcon(Icons.show_chart), findsOneWidget);
    });

    testWidgets('should call onTap with correct index', (tester) async {
      int? tappedIndex;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: testItems,
              onTap: (index) {
                tappedIndex = index;
              },
            ),
          ),
        ),
      );

      // Tap on Track (index 1)
      await tester.tap(find.text('Track'));
      await tester.pump();

      expect(tappedIndex, 1);
    });

    testWidgets('should highlight selected item', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 1, // Track selected
              items: testItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      // Track should show active icon
      expect(find.byIcon(Icons.add_circle), findsOneWidget);
      // Home should show inactive icon
      expect(find.byIcon(Icons.home_outlined), findsOneWidget);
    });

    testWidgets('should render with custom colors', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: testItems,
              onTap: (_) {},
              backgroundColor: Colors.blue,
              selectedColor: Colors.red,
              unselectedColor: Colors.grey,
            ),
          ),
        ),
      );

      final container = tester.widget<Container>(
        find.descendant(
          of: find.byType(CustomBottomNav),
          matching: find.byType(Container),
        ).first,
      );

      final decoration = container.decoration as BoxDecoration;
      expect(decoration.color, Colors.blue);
    });

    testWidgets('should handle 3 items', (tester) async {
      final threeItems = testItems.sublist(0, 3);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: threeItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Track'), findsOneWidget);
      expect(find.text('Progress'), findsOneWidget);
      expect(find.text('Settings'), findsNothing);
    });

    testWidgets('should handle 5 items', (tester) async {
      final fiveItems = [
        ...testItems,
        const NavItem(
          label: 'Profile',
          icon: Icons.person_outline,
          activeIcon: Icons.person,
          route: '/profile',
        ),
      ];

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: fiveItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Track'), findsOneWidget);
      expect(find.text('Progress'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
      expect(find.text('Profile'), findsOneWidget);
    });

    testWidgets('should truncate long labels', (tester) async {
      final longLabelItems = [
        const NavItem(
          label: 'Very Long Label Name',
          icon: Icons.home,
          route: '/home',
        ),
      ];

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: CustomBottomNav(
              currentIndex: 0,
              items: longLabelItems,
              onTap: (_) {},
            ),
          ),
        ),
      );

      final text = tester.widget<Text>(find.text('Very Long Label Name'));
      expect(text.maxLines, 1);
      expect(text.overflow, TextOverflow.ellipsis);
    });

    testWidgets('should change selection when tapped multiple times',
        (tester) async {
      int currentIndex = 0;

      await tester.pumpWidget(
        MaterialApp(
          home: StatefulBuilder(
            builder: (context, setState) {
              return Scaffold(
                bottomNavigationBar: CustomBottomNav(
                  currentIndex: currentIndex,
                  items: testItems,
                  onTap: (index) {
                    setState(() {
                      currentIndex = index;
                    });
                  },
                ),
              );
            },
          ),
        ),
      );

      // Initially Home is selected
      expect(find.byIcon(Icons.home), findsOneWidget);

      // Tap Track
      await tester.tap(find.text('Track'));
      await tester.pump();
      expect(find.byIcon(Icons.add_circle), findsOneWidget);

      // Tap Settings
      await tester.tap(find.text('Settings'));
      await tester.pump();
      expect(find.byIcon(Icons.settings), findsOneWidget);
    });
  });

  group('NavItem', () {
    test('should create NavItem with required fields', () {
      const item = NavItem(
        label: 'Home',
        icon: Icons.home,
        route: '/home',
      );

      expect(item.label, 'Home');
      expect(item.icon, Icons.home);
      expect(item.route, '/home');
      expect(item.activeIcon, isNull);
    });

    test('should create NavItem with activeIcon', () {
      const item = NavItem(
        label: 'Home',
        icon: Icons.home_outlined,
        activeIcon: Icons.home,
        route: '/home',
      );

      expect(item.activeIcon, Icons.home);
    });
  });
}
