import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";


const routes: Routes = [
  {path:'',redirectTo:"signup/:role",pathMatch:'full'},
  {path:'signup/:role',component:SignupComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [
    SignupComponent
  ]
})
export class AuthRoutingModule { }
