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

const routes: Routes = [
   {path:'',component:HomeComponent},
   {path:'classer',component:ClasserProductComponent},
   {path:"dash",component:DashboardComponent},
   {path:'gererProduit',component:GererProduitComponent},
   {path:'listCategory',component:CategoryListComponent},
   {path:'Commandes',component:GererCommandeComponent},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   {path:'gererSupplier',component:GererSupplierComponent},
   {path:'Commandes_Taken',component:LocationCommandeComponent},
   {path:'categories/:id',component:AccueilClientComponent},
   {path:'cart',component:AccueilCartComponent},
   {path:'Commande',component:CommandeComponent},
   {path:'FavoriteList',component:FavoriteListClientComponent},
   {path:"**",component:NotFoundComponentComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
