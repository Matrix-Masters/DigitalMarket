import 'package:deliverymarket/Screens/CommandeCureent.dart';
import 'package:deliverymarket/Screens/CommandeDispo.dart';
import 'package:deliverymarket/Screens/CommandeOld.dart';
import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';


class HomeCommande extends StatefulWidget {
  const HomeCommande({super.key});

  @override
  State<HomeCommande> createState() => _HomeCommandeState();
}

class _HomeCommandeState extends State<HomeCommande> {

  int _selectIndex=0;

  String Commande="Disponible";
  late Widget layout=CommandeDispo();
   
  void changeSelectedINdex(int index){
    setState(() {
      if(index==0){
          layout=CommandeDispo();
          Commande="Disponible";
      }else if(index==1){
          layout=CommandeCurrent();
          Commande="Chargement";
        }else{
          layout=CommandeOld();
          Commande="Old";
        }
      _selectIndex=index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Commande $Commande"),
      ),
      bottomNavigationBar: CurvedNavigationBar(
         color:Colors.blue,
          buttonBackgroundColor:Colors.blue,
          backgroundColor:Colors.white,
          animationCurve: Curves.easeInOut,
          animationDuration:const  Duration(milliseconds: 600),
          onTap: (index){changeSelectedINdex(index);},
          index: _selectIndex,
          items:<Widget> [
             Icon(Icons.newspaper,color: Colors.white,),
             Icon(Icons.delivery_dining,color: Colors.white,),
             Icon(Icons.delete_forever,color: Colors.white,),
          ],
        ),
      body: layout
    );
  }
}