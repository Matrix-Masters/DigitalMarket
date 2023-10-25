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
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { BodyComponent } from './home/body/body.component';
import { CardComponent } from './home/card/card.component';
import { FooterComponent } from './home/footer/footer.component';
import { DialogInfoComponent } from './AdminCompoenent/classer-product/dialog-info/dialog-info.component';
import { SideBarCompComponent } from './Layout/side-bar-comp/side-bar-comp.component';
import { NavbarCompComponent } from './Layout/navbar-comp/navbar-comp.component';
@NgModule({
  declarations: [
    AppComponent,
    ClasserProductComponent,
    NavbarComponent,
    HomeComponent,
    BodyComponent,
    CardComponent,
    FooterComponent
    DialogInfoComponent,
    SideBarCompComponent,
    NavbarCompComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
