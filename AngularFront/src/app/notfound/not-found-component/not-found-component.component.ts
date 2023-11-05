import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.scss']
})
export class NotFoundComponentComponent {

  constructor(private Router:Router){}
  
  ngOnInit(): void {
    setTimeout(() => {
        this.Router.navigate(['/']);
    },5000)
  }

}
