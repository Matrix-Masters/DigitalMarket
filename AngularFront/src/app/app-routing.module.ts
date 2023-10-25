import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'classer',component:ClasserProductComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
