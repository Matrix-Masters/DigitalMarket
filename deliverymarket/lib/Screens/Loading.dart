import 'package:flutter/material.dart';

class Loading extends StatelessWidget {
  const Loading({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor:  Colors.white,
      body:   Center(
        child: CircularProgressIndicator(
          color: Colors.black,
          strokeWidth: 5,
        )
      ),
     );
  }
}