import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { GererSupplierComponent } from './AdminCompoenent/GererSuppliersComponents/gerer-supplier/gerer-supplier.component';

const routes: Routes = [
   {path:'',component:HomeComponent},
   {path:'classer',component:ClasserProductComponent},
   {path:"dash",component:DashboardComponent},
   {path:'gererProduit',component:GererProduitComponent},
   {path:'gererSupplier',component:GererSupplierComponent},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
