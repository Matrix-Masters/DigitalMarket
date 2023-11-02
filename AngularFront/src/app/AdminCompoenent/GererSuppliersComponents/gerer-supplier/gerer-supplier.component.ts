import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
import { GravatarService } from 'src/app/Service/gravatar.service';
@Component({
  selector: 'app-gerer-supplier',
  templateUrl: './gerer-supplier.component.html',
  styleUrls: ['./gerer-supplier.component.scss']
})
export class GererSupplierComponent {
  constructor(private AdminServiceService: AdminServiceService,private gravatarService: GravatarService) {
    this.gravatarUrl = this.gravatarService.getGravatarUrl('hkimiamin02@gmail.com', 200,'mm');
  }
  searchControl = new FormControl('');
  statusControl = new FormControl('all');
  dateControl = new FormControl(new Date());
  suppliersWithProducts = false;
  suppliersWithoutProducts = false;
  gravatarUrl:string;

}
