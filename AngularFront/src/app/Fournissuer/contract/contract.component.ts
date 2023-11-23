import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { ContractServiceService } from 'src/app/Service/contract-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})

export class ContractComponent implements OnInit {

  constructor(private ContractServiceService:ContractServiceService,private MatSnackBar:MatSnackBar,private datePipe: DatePipe) { }
  canvas: any;
  c: p5.Color[] = [];

  ngOnInit(): void {
    this.InitSignature();
  }


  InitSignature(){
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 1400, s.windowHeight - 600);
        canvas2.parent('sketch-holder');
        s.background(255);
        this.c[0] = s.color(0, 0, 0);
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          } else if (s.mouseButton === s.CENTER) {
            s.background(255);
          }
        }
      };
    };
    this.canvas = new p5(sketch);
  }



  image:string="";

  captureSignature() {

    const signatureDataUrl = this.canvas.canvas.toDataURL();
    this.canvas.clear();
   // this.canvas.isEmpty();
    this.image=signatureDataUrl
    const doc = new jsPDF();
    doc.addImage(signatureDataUrl, 2, 2, 20, 20);
    doc.addImage('../../../assets/DIGITAL MARKET logo.png','png', 2, 2, 20, 20);
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text('DIGITAL MARKET',158,10);
    doc.setFont("times", "normal");
    doc.text('Bahra El Kef',158,15);
    doc.text('7116',158,20);
    doc.text('78232013',158,25);
    doc.setFont("times", "normal");
    doc.setFontSize(25);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text('Work Contract',68,40 );
    doc.setFontSize(18);
    doc.setFont("times", "normal");
    doc.text('INDETERMINATE – DETERMINED DURATION',30,49 );
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text('Nom :',12,85);
    doc.text('Prénom :',12,90);
    doc.text('Email :',12,95);
    doc.setFont("times", "normal");
    doc.text(`${this.name}`,24,85);
    doc.text(`${this.last}`,30,90);
    doc.text(`${this.email}`,26,95);
    doc.setFontSize(15);
    doc.setFont("times", "bold");
    doc.text("Article 1: PURPOSE OF THE CONTRACT",12,110);
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text("This contract is intended to define the rights and obligations of the contractors during the term",15,118);
    doc.text(" of the work.",15,125)

    doc.setFontSize(15);
    doc.setFont("times", "bold");
    doc.text("Article 2: The Contractors During",12,140);
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text(`This contract is Start from ${new Date().toString()} to ${this.date}`,15,148);
    doc.text("Signature",158,doc.internal.pageSize.height - 50);
    doc.addImage(this.image, 158, doc.internal.pageSize.height - 47, 20, 20);

    const header = ['Name Product'];
    const body = this.products.map((product:any) => [product]);
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    doc.text("Article 3: Your Products",12,160);
      autoTable(doc, {
        theme:'grid',
        bodyStyles:{fontStyle:'bold',halign:'center'},
        margin: { top: 168 },
        head: [header],
        body: body
      })

    doc.setFontSize(12);
    doc.text('If you have any questions about Contract, do not hesitate to contact us' ,45, doc.internal.pageSize.height - 20);
    doc.text('1/1',105, doc.internal.pageSize.height - 10);
    var nameContract:string=`${Math.random()+this.name}.pdf`;
    doc.save(`${nameContract}`);
    const pdfBase64 = doc.output('datauristring');
    const pdfFile = this.base64ToFile(pdfBase64, `${nameContract}`, 'application/pdf');
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'));
    this.ContractServiceService.AddConract(
          pdfFile,
          nameContract,
          new Date(this.date),
          this.products,
          1
    ).subscribe((res:any)=>{
        this.MatSnackBar.open("Contract added successfully","Close",
          {
            duration: 2000,
            verticalPosition: 'bottom',
            panelClass: ['red-snackbar']
          }
        );
    })

  }
  products: string[] = [];
  Product:string="";
  clearSignature(){
    this.canvas.clear();
    //this.InitSignature();
  }

  deleteProduct(product:string){
    this.products = this.products.filter((v:any)=>v!=product);
  }

  AddProduct(){
    if(this.products.includes(this.Product)){
      alert("This product is already exist");
      return;
    }else if(this.Product==""){
      alert("Please fill the product name");
      return;
    }
    this.products.push(this.Product);
    this.Product="";
  }
  name="";
  last="";
  email="";
  date="";

  MakeContract(){
      if(this.name!="" && this.last!="" && this.email!="" && this.date!="" && this.products.length>0){
        this.captureSignature();
      }else{
        alert("Please fill all the fields");
      }
  }

  base64ToFile(base64: string, filename: string, mimeType: string): File {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays: number[] = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const byteArray = new Uint8Array(byteArrays);
    return new File([byteArray], filename, { type: mimeType });
  }

}
