import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from 'src/app/superAdminComponents/Employers/confirm-dialog-component/confirm-dialog-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Model/User_Store';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ])
  ]
})
export class ListCommandesComponent implements OnInit{

  user:User;
  productDataMap: { [key: string]: any } = {};
  selectedCommandes=-1;
  pagesArray: number[] = [];
  page = 1;
  limit = 1;
  limit_model = 0;
  pages = 0;
  total=0;
  commandes:any;
    constructor( private store:Store,private CommandeService :  CommandeServiceService , private productService:ProductServiceService,private dialog: MatDialog,private snackbar:MatSnackBar) {
      this.user=this.store.selectSnapshot(s=>s.AuthStore?.User)
     }
    ngOnInit(): void {
      this.getCommandeByIdClient();
    }
    getCommandeByIdClient(){
      this.CommandeService.getCommandeByIdClient(this.user?.iduser,this.page,this.limit).subscribe((res:any)=>{
          this.commandes=res.docs;
          this.total=res.total;
          this.pages=res.pages;
          this.page=res.page;
          this.limit=res.limit;
          this.pagesArray = Array.from({ length: this.pages }, (_, index) => index + 1);
      }),
      (error:any)=>{
        console.log(error);
      }
  }
  toggleRowDetails(index: number): void {
    this.selectedCommandes = index==this.selectedCommandes ? -1 : index;
  }

  onLimitChange(): void {
    this.getCommandeByIdClient();
  }

  getProductById(id: any): any {
    if (this.productDataMap[id]) {
      return this.productDataMap[id];
    }


    this.productService.getProductById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.productDataMap[id] = res;
      },
      (error: any) => {
        console.log(error);
        return null;
      }
    )
  }
  nextPage(): void {
    if (this.page < this.pages) {
      this.page++;
      this.getCommandeByIdClient();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getCommandeByIdClient();
    }
  }
  onDeleteCommand(commandId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent,{
      width: '300px',
      data: { message: 'Are you sure you want to delete this commande?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
      this.CommandeService.deleteCommandeById(commandId).subscribe((res: any) => {
        this.snackbar._openedSnackBarRef = this.snackbar.open('Commande deleted successfully', 'Close', {
          duration: 3000,
        });
        this.getCommandeByIdClient();
      }),((error: any) => {
        this.snackbar._openedSnackBarRef = this.snackbar.open('Error while deleting Commande', 'Close', {
          duration: 3000,
        });
      });
    }
    });


  }
  hasNextPage(): boolean {
    return this.page < this.pages;
  }

  hasPreviousPage(): boolean {
    return this.page > 1;
  }
}
