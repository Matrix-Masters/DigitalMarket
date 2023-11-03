import 'package:deliverymarket/Models/Commande.dart';
import 'package:deliverymarket/Services/CommandeService.dart';
import 'package:flutter/material.dart';

class CommandeDispo extends StatefulWidget {
  const CommandeDispo({super.key});

  @override
  State<CommandeDispo> createState() => _CommandeDispoState();
}

class _CommandeDispoState extends State<CommandeDispo> {


   late CommandeService commandeService=CommandeService();
   List<Commande> Commandes=[];

  @override
  void initState() { 
    super.initState();
    this.fetchCommandes();
  }

 Future<void> fetchCommandes()async {
    Commandes=[];
    await commandeService.GetCommandes();
    setState(() {
      Commandes=commandeService.Commandes;
    });
 }
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body:Column(
         children: [
           Expanded(child: 
             ListView.builder(
              itemCount:Commandes.length,
              itemBuilder: (context,index){
                  final commande=Commandes[index];
                  return Card(
                      child: ListTile(
                        leading: Text(commande.NumCommande),
                        title: Text(commande.location['latitude'].toString()),
                        subtitle: Text(commande.PrixTotal),
                        trailing: Text(commande.Status),
                      ),
                  );
             }))
         ],
      )
    );
  }
}