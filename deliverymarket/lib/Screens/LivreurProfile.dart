import 'package:flutter/material.dart';



class Profile extends StatelessWidget {
  const Profile({super.key});

  @override
Widget build(BuildContext context) {
    return Scaffold(
       body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const SizedBox(height: 30),
            CircleAvatar(
              radius: 50,
            backgroundImage: AssetImage("assets/images/livreur.jpg"),
            ),


            const SizedBox(height: 40),
            itemProfile('Name', 'Souissi Youssef', Icons.person),
            const SizedBox(height: 10),
            itemProfile('Phone', '123453546567', Icons.phone),
            const SizedBox(height: 10),
            itemProfile('Address', 'tunis', Icons.location_on),
            const SizedBox(height: 10),
            itemProfile('Email', 'souissiyoussef9@gmail.com', Icons.mail),
            const SizedBox(height: 40,),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.all(15),
                    backgroundColor: Colors.redAccent
                  ),
                  child: const Text('Logout',style: TextStyle(fontSize: 18),)
              ),
            )
          ],
        ),
      ),
    );
  }

  itemProfile(String title, String subtitle, IconData iconData) {
    return Container(
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
                offset: Offset(0, 5),
                color: const Color.fromARGB(255, 52, 52, 53).withOpacity(.2),
                spreadRadius: 2,
                blurRadius: 10
            )
          ]
      ),
      child: ListTile(
        title: Text(title),
        subtitle: Text(subtitle),
        leading: Icon(iconData),
        tileColor: Colors.white,
      ),
    );
  }
}