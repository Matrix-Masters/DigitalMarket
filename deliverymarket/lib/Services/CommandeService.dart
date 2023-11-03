import 'dart:convert';
import 'package:deliverymarket/Models/Commande.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:deliverymarket/Models/User.dart';

class CommandeService{

  List<Commande> Commandes=[];
  String url="http://10.0.2.2:8888"; 

  Future<List<Commande>> GetCommandes() async{
    try{
      final response=await http.get(Uri.parse("$url/GESTIONCOMMANDE-SERVICE/Commande/GetCommandeDispo?size=500"));
      if(response.statusCode==200){
        final jsonData=jsonDecode(response.body);
          /*for (var item in jsonData['docs']) {
              Commandes.add(Commande.fromJson(item));
              print(item);
           }*/
         Commandes = jsonData['docs'].map<Commande>((json) => Commande.fromJson(json)).toList();
         return Commandes;
      }else{
        return [];
      }
    }catch(e){
      print(e);
      return [];
    }
  }

}