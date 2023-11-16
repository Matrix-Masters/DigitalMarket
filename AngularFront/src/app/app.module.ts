import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { MaterialModule } from './material/material.module';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { AcceptedProductsComponent } from './AdminCompoenent/GererProduitComponents/accepted-products/accepted-products.component';
import { InfoProduitComponent } from './AdminCompoenent/GererProduitComponents/info-produit/info-produit.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { BodyComponent } from './home/body/body.component';
import { CardComponent } from './home/card/card.component';
import { FooterComponent } from './home/footer/footer.component';
import { DialogInfoComponent } from './AdminCompoenent/classer-product/dialog-info/dialog-info.component';
import { SideBarCompComponent } from './Layout/side-bar-comp/side-bar-comp.component';
import { NavbarCompComponent } from './Layout/navbar-comp/navbar-comp.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryListComponent } from './AdminCompoenent/GererCategory/category-list/category-list.component'
import { GererSupplierComponent } from './AdminCompoenent/GererSuppliersComponents/gerer-supplier/gerer-supplier.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LocationCommandeComponent } from './ClientComponent/location-commande/location-commande.component';

import { AccueilClientComponent } from './AccueilClient/accueil-client/accueil-client.component';
import { AccueilBodyComponent } from './AccueilClient/accueil-body/accueil-body.component';
import { AccueilCartComponent } from './AccueilClient/accueil-cart/accueil-cart.component';
import { CardCartComponent } from './AccueilClient/card-cart/card-cart.component';

import { NotFoundComponentComponent } from './notfound/not-found-component/not-found-component.component';
import { CommandeComponent } from './ClientComponent/commande/commande.component';
import { CommandeClientComponent } from './ClientComponent/commande-client/commande-client.component';


@NgModule({
  declarations: [
    AppComponent,
    ClasserProductComponent,
    GererProduitComponent,
    AcceptedProductsComponent,
    InfoProduitComponent,
    NavbarComponent,
    HomeComponent,
    BodyComponent,
    CardComponent,
    FooterComponent,
    DialogInfoComponent,
    SideBarCompComponent,
    NavbarCompComponent,
    DashboardComponent,
    CategoryListComponent,
    AccueilClientComponent,
    AccueilBodyComponent,
    AccueilCartComponent,
    CardCartComponent,
    CategoryListComponent,
    NotFoundComponentComponent,
    CommandeComponent,
    GererSupplierComponent,
    LocationCommandeComponent,
    CommandeClientComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

