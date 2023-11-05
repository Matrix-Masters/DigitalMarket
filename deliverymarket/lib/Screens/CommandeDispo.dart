import 'package:deliverymarket/Models/Commande.dart';
import 'package:deliverymarket/Models/Product.dart';
import 'package:deliverymarket/Services/CommandeService.dart';
import 'package:flutter/material.dart';

class CommandeDispo extends StatefulWidget {
  const CommandeDispo({super.key});

  @override
  State<CommandeDispo> createState() => _CommandeDispoState();
}

class _CommandeDispoState extends State<CommandeDispo> {

  List<Product> products=[];
  late CommandeService commandeService=CommandeService();
  List<Commande> Commandes=[];

  Future<void> fetchProducts(int id)async {
    await commandeService.GetInfoProduct(id);
    setState(() {
      this.products=commandeService.products;
    });
 }

  @override
  void initState() { 
    super.initState();
    this.products=commandeService.products;
    this.fetchCommandes();
  }

 Future<void> fetchCommandes()async {
    Commandes=[];
    await commandeService.GetCommandes();
    setState(() {
      Commandes=commandeService.Commandes;
    });
 }

Future<void> ShowInfo(Commande commande) async {

   for (final ligneCommande in commande.LigneCommandes) {
    await fetchProducts(int.parse(ligneCommande['Product_id']));
  }
  
  String? res = await showDialog(
    context: context,
    builder: (context) {
      return SimpleDialog(
        title: Text(
          "Info Commande Num ${commande.NumCommande}",
          style: const TextStyle(fontSize: 18),
        ),
        children: [
          SimpleDialogOption(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Cin"),
                Text(commande.Cin),
              ],
            ),
          ),
          SimpleDialogOption(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Phone"),
                Text(commande.phone),
              ],
            ),
          ),
          SimpleDialogOption(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Email"),
                Text(commande.email),
              ],
            ),
          ),
          SimpleDialogOption(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Prix Total"),
                Text("${commande.PrixTotal} Dt"),
              ],
            ),
          ),
          SimpleDialogOption(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Date"),
                Text(commande.Date.toString().substring(0, 10)),
              ],
            ),
          ),
      Container(
        height: 200,
            width: 50,
    child: ListView.builder(
      shrinkWrap: true,
      itemCount: commande.LigneCommandes.length,
      itemBuilder: (context, index) {
         final ligneCommande = commande.LigneCommandes[index];
          Product product = products.firstWhere(
                  (p) => p.id == int.parse(ligneCommande['Product_id']),
                      orElse: () => Product(Name: "none", image: "",id: -1));
        return Card(
          margin: EdgeInsets.all(15),
          child: Row(children: [
            Container(
                width: 100,
               child: Image.network("http://10.0.2.2:8888/PRODUCT-SERVICE/products/images/" + product.image),
            ),
            Expanded(child:
              ListTile(
                title: Text(product.Name),
                subtitle: Text("Quantity :"+ligneCommande['Quantity'].toString() + "  " + "Prix" + ligneCommande['prix'].toString()),
              ),
            )
          ]),
        );
      },
    ),
),
        ],
      );
    },
  );
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
                      margin: EdgeInsets.all(15),
                      child: ListTile(
                        title: Text(commande.LastName.toString()+" "+commande.Name.toString()),
                        subtitle: Text("Nbr Products " + commande.LigneCommandes.length.toString() ),
                        trailing:Row(
                           mainAxisSize: MainAxisSize.min,
                            children: [
                               IconButton(onPressed:(){ShowInfo(commande);}, icon:const Icon(Icons.info,color:Colors.blue,)),
                               IconButton(onPressed: (){}, icon:const Icon(Icons.task,color: Colors.green,))
                            ],
                        ),
                      ),
                  );
             }))
         ],
      )
    );
  }
}