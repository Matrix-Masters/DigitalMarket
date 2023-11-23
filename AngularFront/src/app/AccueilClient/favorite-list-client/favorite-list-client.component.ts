import { Component } from '@angular/core';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-favorite-list-client',
  templateUrl: './favorite-list-client.component.html',
  styleUrls: ['./favorite-list-client.component.scss']
})
export class FavoriteListClientComponent {
  constructor(private wishlistService: WishlistService , private commandeService: CommandeServiceService,private snackBar: MatSnackBar) { }

  isFavorite: boolean = false;
  wishlist: any[] = [];

  ngOnInit(): void {
    
    this.loadWishlist();
   this.getNotificationsByIdRecu(2);
  }

  loadWishlist() {
    const idUser = 2; 
    this.wishlistService.showList(idUser).subscribe(
      (response: any) => {
        this.wishlist = response;
        this.wishlist.forEach(item => {
          this.commandeService.DetailsProd(item.idProduct).subscribe(
            (productDetails: any) => {
              item.productDetails = productDetails;
            },
            error => {
              console.error('Error fetching product details', error);
            }
          );
        });
       
        
      },
      error => {
        console.error('Error fetching wishlist', error);
      }
    );
  }
  
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
          this.loadWishlist();
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

  notifications: string[] = [];
  getNotificationsByIdRecu(idRecu: any) {
    this.commandeService.getNotificationsByIdRecu(2).subscribe(
      (res: any) => {
       
        this.notifications = res;
        console.log(this.notifications); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  showNotifications = false;


  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

}
