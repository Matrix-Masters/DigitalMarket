import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { LocationCommandeComponent } from './ClientComponent/location-commande/location-commande.component';
import { NotFoundComponentComponent } from './notfound/not-found-component/not-found-component.component';

const routes: Routes = [
   {path:'',component:HomeComponent},
   {path:'classer',component:ClasserProductComponent},
   {path:"dash",component:DashboardComponent},
   {path:'gererProduit',component:GererProduitComponent},
   {path:'client',component:LocationCommandeComponent},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   {path:"**",component:NotFoundComponentComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
