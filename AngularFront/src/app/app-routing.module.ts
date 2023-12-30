import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { CategoryListComponent } from './AdminCompoenent/GererCategory/category-list/category-list.component';
import { GererCommandeComponent } from './AdminCompoenent/gerer-commande/gerer-commande.component';
import { GererSupplierComponent } from './AdminCompoenent/GererSuppliersComponents/gerer-supplier/gerer-supplier.component';
import { LocationCommandeComponent } from './ClientComponent/location-commande/location-commande.component';
import { AccueilClientComponent } from './AccueilClient/accueil-client/accueil-client.component';
import { AccueilCartComponent } from './AccueilClient/accueil-cart/accueil-cart.component';
import { NotFoundComponentComponent } from './notfound/not-found-component/not-found-component.component';
import { CommandeComponent } from './ClientComponent/commande/commande.component';
import { FavoriteListClientComponent } from './AccueilClient/favorite-list-client/favorite-list-client.component';
import { LIstEmpolyersComponent } from './superAdminComponents/Employers/list-empolyers/list-empolyers.component';
import { AddEmployerComponent } from './superAdminComponents/Employers/add-employer/add-employer.component';
import { CommandeClientComponent } from './ClientComponent/commande-client/commande-client.component';
import { FournisseurInterfaceComponent } from './Fournissuer/fournisseur-interface/fournisseur-interface.component';
import { FournisseurDashboardComponent } from './Fournissuer/fournisseur-dashboard/fournisseur-dashboard.component';
import { AddProductComponent } from './Fournissuer/add-product/add-product.component';
import { ListCommandesComponent } from './ClientComponent/list-commandes/list-commandes.component';
import { ListProductsFournisseurComponent } from './Fournissuer/list-products-fournisseur/list-products-fournisseur.component';
import { ContractComponent } from './Fournissuer/contract/contract.component';
import { EditProfileComponent } from './EditProfile/edit-profile/edit-profile.component';
import { StockAdminComponent } from './AdminCompoenent/stock-admin/stock-admin.component';
import { ImageProductComponent } from './AdminCompoenent/image-product/image-product.component';
import { IsAuthGuard } from './guard/is-auth.guard';
import { DetailsProductComponent } from './AccueilClient/details-product/details-product.component';

const routes: Routes = [
   {path:'',component:HomeComponent},
   {path:'classer',component:ClasserProductComponent,canActivate :[IsAuthGuard]},
   {path:"dash",component:DashboardComponent,canActivate :[IsAuthGuard]},
   {path:'gererProduit',component:GererProduitComponent,canActivate :[IsAuthGuard]},
   {path:'listCategory',component:CategoryListComponent},
   {path:'Commandes',component:GererCommandeComponent},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   {path:'gererSupplier',component:GererSupplierComponent,canActivate :[IsAuthGuard]},
   {path:'Commandes_Taken',component:LocationCommandeComponent,canActivate :[IsAuthGuard]},
   {path:'categories/:id',component:AccueilClientComponent},
   {path:'cart',component:AccueilCartComponent},
   {path:'Commande',component:CommandeComponent,canActivate :[IsAuthGuard]},
   {path:'FavoriteList',component:FavoriteListClientComponent,canActivate :[IsAuthGuard]},
   {path:"gererEmployers",component:LIstEmpolyersComponent,canActivate :[IsAuthGuard]},
   {path:"addEmploye",component:AddEmployerComponent,canActivate :[IsAuthGuard]},
   {path:'CommandeLocation',component:CommandeClientComponent,canActivate :[IsAuthGuard]},
   {path:"fournisseur",component:FournisseurInterfaceComponent,canActivate :[IsAuthGuard]},
   {path:"fournisseurDash",component:FournisseurDashboardComponent,canActivate :[IsAuthGuard]},
   {path:"addProductFournisseur",component:AddProductComponent,canActivate :[IsAuthGuard]},
   {path:"listeCommandesClient",component:ListCommandesComponent,canActivate :[IsAuthGuard]},
   {path:"ListProductsFournisseur",component:ListProductsFournisseurComponent,canActivate :[IsAuthGuard]},
   {path:"ContractComponent",component:ContractComponent,canActivate :[IsAuthGuard]},
   {path:"editProfile",component:EditProfileComponent,canActivate :[IsAuthGuard]},
   {path:"stockadmin",component:StockAdminComponent,canActivate :[IsAuthGuard]},
   {path:"ImageProduct/:id",component:ImageProductComponent},
   {path:"DetailProduct/:id",component:DetailsProductComponent},
   {path:"**",component:NotFoundComponentComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
