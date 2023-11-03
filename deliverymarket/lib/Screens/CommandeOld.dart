import 'package:flutter/material.dart';

class CommandeOld extends StatefulWidget {
  const CommandeOld({super.key});

  @override
  State<CommandeOld> createState() => _CommandeOldState();
}

class _CommandeOldState extends State<CommandeOld> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("Commande Old"),
      ),
    );
  }
}