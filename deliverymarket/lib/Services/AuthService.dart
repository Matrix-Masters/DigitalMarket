import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:deliverymarket/Models/User.dart';

class AuthService{
  bool isAuth=false;
  String token="";

   // String url="http://192.168.1.19:8000/Auth";  // device externe
   String url="http://10.0.2.2:8000"; // emulator

   final Storage=FlutterSecureStorage();


  AuthService() {
      GetAuth();
  }

  Future<void> GetAuth() async {
    var token = await Storage.read(key: "token");
    if (token != null) {
        isAuth = true;
    }else{
        isAuth=false;
    }
  }

  Future<void> logout()async{
      await Storage.delete(key: "token");
  }

   Future<bool> SendToken()async{
        this.token = "Test";
        Storage.write(key: "token", value: token); 
        return true;
   }

}
