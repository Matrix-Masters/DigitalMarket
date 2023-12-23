import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { CategoryServiceService } from 'src/app/Service/category-service.service';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { Websocket } from 'src/app/Service/websocket.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories:any;
  id:any
  products:any
  nbrArticle:number=0


  constructor(public AuthServiceService:AuthServiceService, public categoriesService : CategoryServiceService ,private commandeService: CommandeServiceService,private webSocketService: Websocket){}



  getListProducts(){
    const productString = localStorage.getItem('products');
    if(productString) {
      this.products = JSON.parse(productString);
    }
  }




  ngOnInit():void {
    
    this.categoriesService.getAllCategories().subscribe(
      (res:any)=>{
        this.categories=res;
      },
      err=>{
        console.log(err);
      }
    )

    this.getListProducts()
    for(let i = 0; i < this.products?.length; i++){
      this.nbrArticle = (this.products.length)
    }
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));

    this.getNotificationsByIdRecu(3); 
  }


//-------notification code-----------//
  notifications: any[] = [];
  notificationListOpened : boolean = false;

  openNotificationMenu(event: MouseEvent): void {
    event.stopPropagation(); 
    this.notificationListOpened = !this.notificationListOpened;
    this.getNotificationsByIdRecu(3); 
  }

  getNotificationsByIdRecu(idRecu: any) {
    this.commandeService.getNotificationsByIdRecu(idRecu).subscribe(
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


  messageTyping(): void {
    this.webSocketService.emit('typing', "test");    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message:"msg",
      handle: "this.userName"
    }); 
  }

  updateMessage(data:any) {
    this.getNotificationsByIdRecu(3)
    console.log(this.notifications);
  }



}
