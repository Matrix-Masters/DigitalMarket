import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur-side-bar-comp',
  templateUrl: './fournisseur-side-bar-comp.component.html',
  styleUrls: ['./fournisseur-side-bar-comp.component.scss']
})
export class FournisseurSideBarCompComponent {
  OpenedSideBar:Boolean=true;
  current = this.router.url;
  constructor(private router: Router) {
      this.current = this.router.url;
      console.log(this.current);

  }
  ngOnInit(): void {

  }
}
