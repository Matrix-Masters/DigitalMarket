import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import confetti from 'canvas-confetti';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent {
 


  constructor(private MatSnackBar:MatSnackBar,private _formBuilder: FormBuilder,private CommandeServiceService:CommandeServiceService) {
    
    this.FormInfo = this._formBuilder.group({
        Name:this.NameForm,
        Cin:this.CinForm,
        phone:this.phoneForm,
        LastName:this.LastNameForm,
        email:this.emailForm
    })
    this.Product.Quantity=2;
    this.Product.prix=100;
    this.Product.Product_id="1";
    this.Products.push(this.Product);
    this.Product.Quantity=8;
    this.Product.prix=120;
    this.Product.Product_id="2";
    this.Products.push(this.Product);
    this.Product.Quantity=8;
    this.Product.prix=120;
    this.Product.Product_id="2";
    this.Products.push(this.Product);
    localStorage.setItem("Products",JSON.stringify(this.Products));
    // Init Form
    this.NameForm.setValue("Talel");
    this.LastNameForm.setValue("Mejri");
    this.CinForm.setValue("12345678");
    this.phoneForm.setValue("12345678");
    this.emailForm.setValue("talel@gmail.com")
  } 

  NameForm=new FormControl('',[Validators.required,Validators.minLength(3)]);
  LastNameForm=new FormControl('',[Validators.required,Validators.minLength(3)]);
  CinForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  phoneForm=new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]);
  emailForm=new FormControl('',[Validators.required,Validators.email]);

  getFirstNameFormError(){
    if(this.NameForm.touched){
      if(this.NameForm.hasError("required")){
         return 'You must enter a first name';
      } else if(this.NameForm.hasError("minlength")){
        return 'You must enter a valid first name';
    }
  }
  return '';
}
 getLastNameError(){
  if(this.LastNameForm.touched){
    if(this.LastNameForm.hasError("required")){
       return 'You must enter a first name';
    } else if(this.LastNameForm.hasError("minlength")){
      return 'You must enter a valid first name';
  }
 }
 return '';
}

getPhoneError(){
  if(this.phoneForm.touched){
    console.log(this.phoneForm);
    if(this.phoneForm.hasError("required")){
       return 'You must enter a phone number';
    }else if(this.phoneForm.hasError("minlength")){
      return 'You must enter a valid phone number';  
    }else if(this.phoneForm.hasError("maxlength")){
      return 'You must enter a valid phone number';
    }else if(this.phoneForm.hasError("pattern")){
       return 'You must enter Just numbers';
    }
  }
  return '';
}

getCinError(){
  if(this.CinForm.touched){
    if(this.CinForm.hasError("required")){
       return 'You must enter a phone number';
    }else if(this.CinForm.hasError("minlength")){
      return 'You must enter a valid phone number';  
    }else if(this.CinForm.hasError("maxlength")){
      return 'You must enter a valid phone number';
    }else if(this.CinForm.hasError("pattern")){
       return 'You must enter Just numbers';
    }
  }
  return '';
}

getEmailError(){
  if(this.emailForm.touched){
    if(this.emailForm.hasError("required")){
       return 'You must enter a phone number';
    }else if(this.emailForm.hasError("email")){
      return 'You must enter a valid phone number';  
    }
  }
  return '';
}

 FormInfo:FormGroup;
 isLinear = false;


  Location:any={
    lat:0,
    lng:0,
    name:""
  }

  isConfettiActive = false;
  confettiCount = 200;
  confettiSpread = 360;
  confettiDuration = 10000;

  CurrentLocation(lat:any,lng:any,name:any){
    this.Location.lat=lat;
    this.Location.lng=lng;
    this.Location.name=name;
  }
  
  Step1(){
    if(this.FormInfo.valid){
      console.log(this.FormInfo.value);
    }else{
      this.FormInfo.markAllAsTouched();
    }
  }

  StartConfetti(){
    var myCanvas = document.createElement('canvas');
    var Content=document.getElementById("Content");
    Content?.appendChild(myCanvas);
    var myConfetti = confetti.create(myCanvas, {
        useWorker: true
   });
    myConfetti({
        spread: 160
    });
    confetti();
  }
  Product:any={
    Quantity:"",
    prix:0.0,
    Product_id:""
  }

  Products:any=[];
  ConfirmCommande(){
   //* add product yal gas
  //  this.Product.Quantity=2;
  //  this.Product.prix=100;
  //  this.Product.Product_id="1";
  //  this.Products.push(this.Product);
  //  this.Product.Quantity=8;
  //  this.Product.prix=120;
  //  this.Product.Product_id="2";
  //  this.Products.push(this.Product);
  //  this.Product.Quantity=8;
  //  this.Product.prix=120;
  //  this.Product.Product_id="2";
  //  this.Products.push(this.Product);
  //  localStorage.setItem("Products",JSON.stringify(this.Products));
   //**********Name *//

   
    // Num commande Random King
   var num_com=Math.floor(Math.random() * 99999);
   this.Products = this.Products = JSON.parse(localStorage.getItem("Products") ?? '[]');
   this.CommandeServiceService.AddCommande(
        {
          "NumCommande":num_com,
          "LigneCommandes":this.Products,
          "Name":this.FormInfo.value['Name'], 
          "Cin":this.FormInfo.value['Cin'],
          "phone":this.FormInfo.value['phone'],
          "LastName":this.FormInfo.value['LastName'],
          "email":this.FormInfo.value['email'],
          "Client_id":1,
          "location":{
            "latitude":this.Location.lat,
            "longitude":this.Location.lng,
            "name":this.Location.name
          }
        }
      )
        .subscribe((res:any)=>{
        },(err:any)=>{
          this.StartConfetti();
          this.FormInfo.reset();
          this.Products=[];
          localStorage.setItem("Products",JSON.stringify(this.Products));
          this.Location.lat=0;
          this.Location.lng=0;
          this.Location.name="";
          this.MatSnackBar.open("Commande Confirmer","Ok",{ duration: 2000,});
        })
  }
}