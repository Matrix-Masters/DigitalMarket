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


@NgModule({
  declarations: [
    AppComponent,
    ClasserProductComponent,
    GererProduitComponent,
    AcceptedProductsComponent,
    InfoProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
