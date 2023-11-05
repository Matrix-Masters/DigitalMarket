class Commande {
  String NumCommande;
  String Name;
  String Cin;
  String LastName;
  String email;
  String phone;
  String PrixTotal; 
  Map<String, dynamic> location; 
  String Client_id;
  String Status;
  DateTime Date;
  List<Map<String, dynamic>> LigneCommandes; 

  Commande({
    required this.NumCommande,
    required this.Name,
    required this.Cin,
    required this.LastName,
    required this.email,
    required this.phone,
    required this.LigneCommandes,
    required this.Client_id,
    required this.Status,
    required this.location,
    required this.PrixTotal,
    required this.Date,
  });

  factory Commande.fromJson(Map<String, dynamic> json) {
    return Commande(
      NumCommande: json['NumCommande'],
      Name: json['Name'],
      Cin: json['Cin'],
      LastName: json['LastName'],
      email: json['email'],
      phone: json['phone'],
      LigneCommandes: List<Map<String, dynamic>>.from(json['LigneCommandes']),
      Client_id: json['Client_id'],
      Status: json['Status'],
      location: Map<String, dynamic>.from(json['location']), 
      PrixTotal: json['PrixTotal'], 
      Date: DateTime.parse(json['Date']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'NumCommande': NumCommande,
      'Name': Name,
      'Cin': Cin,
      'LastName': LastName,
      'email': email,
      'phone': phone,
      'LigneCommandes': LigneCommandes,
      'Client_id': Client_id,
      'Status': Status,
      'location': location,
      'PrixTotal': PrixTotal,
      'Date': Date.toIso8601String(),
    };
  }

  @override
  String toString() {
    return 'Commande { LigneCommandes:$LigneCommandes NumCommande:$NumCommande,Name:$Name ,Cin:$Cin,LastName:$LastName,email:$email,phone:$phone  Client_id:$Client_id Status:$Status location:$location PrixTotal:$PrixTotal Date:$Date}';
  }
}
