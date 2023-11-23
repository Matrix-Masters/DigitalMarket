import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { GravatarService } from 'src/app/Service/gravatar.service';
@Component({
  selector: 'app-gerer-supplier',
  templateUrl: './gerer-supplier.component.html',
  styleUrls: ['./gerer-supplier.component.scss']
})
export class GererSupplierComponent implements OnInit{
  constructor(private AdminServiceService: AdminServiceService,private gravatarService: GravatarService,private datePipe:DatePipe,
    private _snackBar: MatSnackBar) {
    this.gravatarUrl = this.gravatarService.getGravatarUrl('hkimiamin02@gmail.com', 200,'mm');
  }
  searchControl = new FormControl('');
  statusControl = new FormControl('all');
  dateControl = new FormControl(new Date());
  loading = false;
  suppliers=null;
  gravatarUrl:string;

  ngOnInit(): void {
    this.dateControl.setValue(new Date(new Date().setDate(new Date().getDate() + 1)));
    this.getSuppliersFilter();
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.getSuppliersFilter();
    });

    this.statusControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.getSuppliersFilter();
    });

    this.dateControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.getSuppliersFilter();
    });
  }
  getSuppliersFilter(){
    var status=3
    var search_value=this.searchControl.value==null ? "" : this.searchControl.value
    let dateString = this.datePipe.transform(this.dateControl.value, 'yyyy-MM-dd');
    if(this.statusControl.value=="all"){
        status=3
    }else if(this.statusControl.value=="accepted"){
      status=1
    }else if(this.statusControl.value=="refused"){
      status=2
    }else{
      status=0
    }
    this.AdminServiceService.getSuppliersFilter(search_value,status,dateString).subscribe((res: any)=>{
      this.suppliers=res;
      console.log(this.suppliers);
    }),
    (error:any)=>{
      this.suppliers==null;
    }
  }
  AcceptSupplier(id: any) {
    this.loading = true;
    this.AdminServiceService.AcceptSupplier(id).subscribe(
      (res: any) => {
        this._snackBar.open('Supplier accepted', 'close', {
          duration: 3000,
        });
        this.loading = false;
        this.getSuppliersFilter();
      },
      (error: any) => {
        console.error('Error accepting supplier:', error);
        this.loading = false;
      }
    );
  }

  RefuseSupplier(id: any) {
    this.loading = true;
    this.AdminServiceService.RefuseSiupplier(id).subscribe(
      (res: any) => {
        this._snackBar.open('Supplier Refused', 'close', {
          duration: 3000,
        });
        this.loading = false;
        this.getSuppliersFilter();
      },
      (error: any) => {
        console.error('Error refusing supplier:', error);
        this.loading = false;
      }
    );
  }

}
