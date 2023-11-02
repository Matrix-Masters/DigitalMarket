import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { GravatarService } from 'src/app/Service/gravatar.service';
@Component({
  selector: 'app-gerer-supplier',
  templateUrl: './gerer-supplier.component.html',
  styleUrls: ['./gerer-supplier.component.scss']
})
export class GererSupplierComponent implements OnInit{
  constructor(private AdminServiceService: AdminServiceService,private gravatarService: GravatarService) {
    this.gravatarUrl = this.gravatarService.getGravatarUrl('hkimiamin02@gmail.com', 200,'mm');
  }
  searchControl = new FormControl('');
  statusControl = new FormControl('all');
  dateControl = new FormControl(new Date());
  suppliersWithProducts = new FormControl(false);
  suppliersWithoutProducts = new FormControl(false);
  gravatarUrl:string;

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {

    });

    this.statusControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {

    });

    this.dateControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {

    });

    this.suppliersWithProducts.valueChanges.pipe(debounceTime(300)).subscribe((value) => {

    });

    this.suppliersWithoutProducts.valueChanges.pipe(debounceTime(300)).subscribe((value) => {

    });
  }

}
