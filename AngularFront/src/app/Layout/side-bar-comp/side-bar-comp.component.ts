import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-comp',
  templateUrl: './side-bar-comp.component.html',
  styleUrls: ['./side-bar-comp.component.scss']
})
export class SideBarCompComponent implements OnInit {
    OpenedSideBar:Boolean=true;
    current = this.router.url;
    constructor(private router: Router) {
        this.current = this.router.url;
        console.log(this.current);
        
    }
   
    ngOnInit(): void {
   
    }

}
