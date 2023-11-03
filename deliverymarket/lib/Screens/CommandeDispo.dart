import 'package:flutter/material.dart';

class CommandeDispo extends StatefulWidget {
  const CommandeDispo({super.key});

  @override
  State<CommandeDispo> createState() => _CommandeDispoState();
}

class _CommandeDispoState extends State<CommandeDispo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("Commande Disponible"),
      ),
    );
  }
}