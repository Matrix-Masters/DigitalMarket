import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { Product } from 'src/app/Model/Product';
import { CommandeServiceService } from 'src/app/Service/commande-service.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { port } from 'src/env';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-gerer-commande',
  templateUrl: './gerer-commande.component.html',
  styleUrls: ['./gerer-commande.component.scss']
})
export class GererCommandeComponent {

  constructor(private commandeService: CommandeServiceService, private MatSnackBar: MatSnackBar, private ProductServiceService: ProductServiceService) {
    this.pagination = {
      currentPage: 1,
      total: 0,
      per_page: 5
    }

    this.InfoCommande = {
      prixTotal: 0,
      ListProducts: [],
      infoUser: []
    }

  }
  selectedCommand!: any

  changePage(num: number) {
    this.pagination.currentPage = num;
  }
  isPopupOpen: boolean = false;


  openPopup(CommandeId: any) {

    //  this.selectedCommand = this.commandes.find((item) => item.id === CommandeId) || null;


  }


  closePopup() {
    this.isPopupOpen = false;
    console.log("closed")
  }

  pagination: {
    currentPage: number,
    total: number,
    per_page: number
  }

  CommandeId!: any
  paginationPages: number[] = [];
  pageSearch = "";
  commandes: any[] = [];

  ngOnInit() {
    this.getCommande();
    console.log(this.notifications)
  }

  LimitPage = [
    2, 5, 3, 10
  ]

  private productList: Product[] = [];

  InfoCommande: {
    prixTotal: number,
    ListProducts: {
      image: string,
      id: number,
      name: string,
      qte: number,
      price: number
    }[],
    infoUser:
    {
      NumCommande: string,
      Name: string,
      Cin: string,
      LastName: string,
      email: string,
      phone: string
    }[]
  }

  AccepteCommade(commande: any) {
    this.GererFactureWithCodeQr(commande);
    this.commandeService.AcceptCommand(commande.NumCommande,{
       "userid":2
     }).subscribe((res:any)=>{
        this.getCommande();
        this.IncermetnbSalesProduct(commande);
        this.GererFactureWithCodeQr(commande);
        this.MatSnackBar.open("Accept Commande",'close',{
          duration:3000
        })
     })
  }

  IncermetnbSalesProduct(commande:any){
    commande.LigneCommandes.forEach((val: any) => {
      var idProduct = val.Product_id;
      this.ProductServiceService.IncrementNbSales(idProduct).subscribe((res:any)=>{
         console.log(res);
      })
    })
  }

  GererFactureWithCodeQr(commande: any) {
    this.clearInfo();
    commande.LigneCommandes.forEach((val: any) => {
      var idProduct = val.Product_id;
      this.commandeService.DetailsProd(idProduct).subscribe((res: any) => {
        this.InfoCommande.ListProducts.push(
          {
            'image': res.image as string,
            'id': res.id as number,
            'name': res.name as string,
            'qte': val.Quantity as number,
            'price': val.prix as number
          }
        );
      });
    });
    this.ProductServiceService.GenerateCodeQr(
      {
        "numCommande": commande.NumCommande,
        "name": commande.Name,
        "lastName": commande.LastName,
        "phone": commande.phone,
        "prixTotal": commande.PrixTotal,
        "location_logitude": commande.location.longitude,
        "location_latitude": commande.location.latitude,
        "location_name": commande.location.name,
      }
    ).subscribe((res: any) => {
      console.log(res);
      this.GeneratePdf(commande, res.name);
    })
  }

  GeneratePdf(commande: any, name: string) {
    const doc = new jsPDF();
    doc.addImage('../../../assets/wamya.png', 'png', 58, 9, 90, 20);
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text('Industrial Zone El Kef', 12, 45);
    doc.text(`Phone : ${commande.phone}`, 12, 52);
    doc.text('Mail  : dmarket606@gmail.com', 12, 59);
    doc.text(`Date : ${commande.Date.substr(0, 10)}`, 150, 45);
    doc.text(`Num Commande : ${(commande.NumCommande).toString()}`, 150, 52);

    const header = ['Product Name', "Quantity", "Price"];
    const body = this.InfoCommande.ListProducts.map((prod: any) => [prod.name, prod.qte, prod.price]);
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    autoTable(doc, {
      theme: 'striped',
      bodyStyles: { fontStyle: 'bold'},
      margin: { top: 90 },
      head: [header],
      body: body
    })
   
    const toWords = new ToWords({ localeCode: 'en-US', });
    let total = toWords.convert(commande.PrixTotal as any);
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text(`Total : ${commande.PrixTotal} DT`, 160, 130);
    doc.setFontSize(10);
    doc.text(`Total : ${total} DT`, 17, 130);
    doc.setFontSize(12);
    doc.text(`More info regarding this receipt`, 14, doc.internal.pageSize.height - 66);
    doc.addImage(`${port}/PRODUCT-SERVICE/codeQr/${name}`, 'jpg', 25, doc.internal.pageSize.height - 65, 30, 30);
    doc.setFontSize(12);
    doc.text('We value your customers', 80, doc.internal.pageSize.height - 30);
    doc.text('If you have any questions about this invoice, do not hesitate to contact us.', 45, doc.internal.pageSize.height - 20);
    doc.save(`Facture_${commande.NumCommande}.pdf`);

  }

  commandeType: string = "Waiting"
  choseCommande(type: string) {
    this.commandeType = type;
    this.getCommande();
  }

  RefusedCommand(num: number) {
    this.commandeService.RefusedCommand(num, {
      "userid": 2
    }).subscribe((res: any) => {
      this.getCommande();
      this.MatSnackBar.open("Commande Refused", 'close', {
        duration: 3000
      })
    })
  }

  getCommande() {
    this.commandeService.getCommandes(
      this.pagination.currentPage,
      this.pagination.per_page,
      this.pageSearch,
      this.commandeType
    ).subscribe(
      (res: any) => {
        const previousCommandCount = this.commandes.length;
        // Update the commandes array with the new data
        this.commandes = res.docs;
        this.pagination.currentPage = res.page;
        this.pagination.total = res.pages;
        this.pagination.per_page = res.limit;
        this.paginationPages = Array.from({ length: this.pagination.total }, (_, i) => i + 1);
        const newCommandCount = this.commandes.length - previousCommandCount;
        if (newCommandCount > 0) {
          this.notifications.push(`${newCommandCount} new commande Arrived`);
          this.hasNewNotifications = true;
        }
      },
      (error) => {
        console.error('Error fetching commands:', error);
      }
    );
  }
  clearInfo() {
    this.InfoCommande.ListProducts = [];
    this.InfoCommande.infoUser = [];
    this.InfoCommande.prixTotal = 0;
  }


  showCommandeInfo(command: any) {
    this.isPopupOpen = true;
    this.clearInfo();
    command.LigneCommandes.forEach((val: any) => {
      var idProduct = val.Product_id;
      this.commandeService.DetailsProd(idProduct).subscribe((res: any) => {
        this.InfoCommande.ListProducts.push(
          {
            'image': res.image as string,
            'id': res.id as number,
            'name': res.name as string,
            'qte': val.Quantity as number,
            'price': val.prix as number
          }
        );
      });
    });
    this.InfoCommande.infoUser.push({
      'NumCommande': command.NumCommande as string,
      'Name': command.Name as string,
      'Cin': command.Cin as string,
      'LastName': command.LastName as string,
      'email': command.email as string,
      'phone': command.phone as string,
    });
    this.InfoCommande.prixTotal = command.PrixTotal
    console.log(this.InfoCommande.infoUser[0].NumCommande);

  }

  notifications: string[] = [];
  showDropdown = false;

  hasNewNotifications: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;

  }

  resetNotifications() {
    // Reset notifications.length to 0 when the dropdown is opened
    this.notifications.length = 0;
  }


}

