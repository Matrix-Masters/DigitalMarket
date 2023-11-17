import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { CategoryListComponent } from './AdminCompoenent/GererCategory/category-list/category-list.component';
import { GererCommandeComponent } from './AdminCompoenent/gerer-commande/gerer-commande.component';

const routes: Routes = [
   {path:'',component:HomeComponent},
   {path:'classer',component:ClasserProductComponent},
   {path:"dash",component:DashboardComponent},
   {path:'gererProduit',component:GererProduitComponent},
   {path:'listCategory',component:CategoryListComponent},
   {path:'Commandes',component:GererCommandeComponent},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
