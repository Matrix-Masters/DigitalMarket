import { Component,OnInit } from '@angular/core';
import { SuperAdminServiceService } from 'src/app/Service/super-admin-service.service';

@Component({
  selector: 'app-list-empolyers',
  templateUrl: './list-empolyers.component.html',
  styleUrls: ['./list-empolyers.component.scss']
})
export class LIstEmpolyersComponent implements OnInit{
  constructor(private superAdminServiceService: SuperAdminServiceService) {}
  Employees: any;
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.superAdminServiceService.getAllEmployees().subscribe((res:any)=>{
      this.Employees=res;
      console.log(res);
    })
  }
}
