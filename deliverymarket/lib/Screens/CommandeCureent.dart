import 'package:flutter/material.dart';

class CommandeCurrent extends StatefulWidget {
  const CommandeCurrent({super.key});

  @override
  State<CommandeCurrent> createState() => _CommandeCurrentState();
}

class _CommandeCurrentState extends State<CommandeCurrent> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("Commande Current"),
      ),
    );
  }
}