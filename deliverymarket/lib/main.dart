import 'package:deliverymarket/Screens/Auth/Login.dart';
import 'package:deliverymarket/Screens/CommandeDispo.dart';
import 'package:deliverymarket/Screens/HomeCommande.dart';
import 'package:deliverymarket/Screens/Loading.dart';
import 'package:deliverymarket/Services/AuthService.dart';
import 'package:flutter/material.dart';

void main(){
  runApp(const StartApp());
}
class StartApp extends StatefulWidget {
  const StartApp({super.key});

  @override
  State<StartApp> createState() => _StartAppState();
}

class _StartAppState extends State<StartApp> {
  late Widget main;

  AuthService authService=AuthService();

   @override
  void initState() {
    super.initState();
    main = const Loading();
    Future.delayed(const Duration(seconds: 5), () {
          setState((){
              main=authService.isAuth ? const LoginDelivery() :   HomeCommande();
          });
    });
  }

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Wamya',
        theme: ThemeData(
            primarySwatch: Colors.blue,
       ),
      home:main,
    );
  }
}