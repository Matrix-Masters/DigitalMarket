import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Product } from '../../Model/Product';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent  implements OnInit{
isFavorite:boolean = false;

constructor(public productServiceStorage:ProductsServiceLocalStorageService, private snackBar:MatSnackBar,private wishlistService: WishlistService,){}

@Input() products:any
@Input() productsRecommandations:any
@Input() new:boolean = true;
@Input() recommandations:boolean = true;


  toggleFavorite(id: any): void {
    this.wishlistService
      .addToWishlist({
        idUser: 2,
        idProduct: id,
      })
      .subscribe(
        (response: any) => {
          console.log('Added to wishlist successfully', response);
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
          });

          this.isFavorite = !this.isFavorite;
        },
        (error: any) => {
          console.error('Error adding to wishlist', error);

          this.isFavorite = !this.isFavorite;

          this.snackBar.open(
            'Failed to add the Product to your wishlist',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      );
  }

  addProduct(product: any) {
    this.productServiceStorage.addProduct(product);
      this.snackBar.open("Product Added",'',{
        duration:2000,
      })
  }

  clear() {
    this.productServiceStorage.clearProductList();
  }

  ngOnInit(): void {}
}
