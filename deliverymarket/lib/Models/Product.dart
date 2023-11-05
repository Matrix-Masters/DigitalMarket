class Product {
  String Name;
  String image;
  int id;

  Product({
    required this.Name,
    required this.image,
    required this.id
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      Name: json['name'],
      image: json['image'],
      id:json['id']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': Name,
      'image': image,
      'id':id
    };
  }

  @override
  String toString() {
    return 'Product { name:$Name Image:$image id:$id}';
  }
}
