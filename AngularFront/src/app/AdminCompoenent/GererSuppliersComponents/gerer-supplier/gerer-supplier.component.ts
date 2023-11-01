import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gerer-supplier',
  templateUrl: './gerer-supplier.component.html',
  styleUrls: ['./gerer-supplier.component.scss']
})
export class GererSupplierComponent {
  searchControl = new FormControl('');
  statusControl = new FormControl('all');
  dateControl = new FormControl(new Date());
  suppliersWithProducts = false;
  suppliersWithoutProducts = false;
}
