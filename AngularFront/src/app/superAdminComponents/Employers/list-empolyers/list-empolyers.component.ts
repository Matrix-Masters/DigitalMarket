import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuperAdminServiceService } from 'src/app/Service/super-admin-service.service';
import { ConfirmDialogComponentComponent } from '../confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-list-empolyers',
  templateUrl: './list-empolyers.component.html',
  styleUrls: ['./list-empolyers.component.scss']
})
export class LIstEmpolyersComponent implements OnInit{
  constructor(private superAdminServiceService: SuperAdminServiceService, private dialog: MatDialog) {}

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
  openConfirmDialog(employerId: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this employer?' },
      panelClass: 'custom-dialog-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployer(employerId);
      }
    });
  }
  deleteEmployer(employerId: any) {
    this.superAdminServiceService.deleteEmployer(employerId).subscribe((res:any) => {
      this.getAllEmployees();
    });
  }
}
