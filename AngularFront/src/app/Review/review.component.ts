import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReviewServiceService, review } from '../Service/review-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  selectedRating: number | null = null;
  starIndexes: number[] = [0, 1, 2, 3, 4];
  content:any=''
  review: review ={content:'',note:'',product_id:"null",user_id:"null"};
  constructor(private reviewService:ReviewServiceService,private cdr: ChangeDetectorRef,private MatSnackBar:MatSnackBar){}
  allReviews:any

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.review.note=this.selectedRating+".0"
    console.log("note : "+this.review.note);

  }

  clearRating(): void {
    this.selectedRating = null;
  }

  changeContent(){
    console.log(this.content);

  }

  getAllReviews(){
    this.reviewService.getAllReviews().subscribe(res=>{
      this.allReviews=res
      console.log(this.allReviews)
    },
    err=>{
      console.log(err);

    }
  );
  }

  addReview(){

    if(this.content==''){
      this.MatSnackBar.open('Please add your message.', '', {
        duration: 3000,
      });
    }else{
      this.review.content=this.content
      this.reviewService.addReview(this.review).subscribe(res=>{
        console.log(res);
        this.MatSnackBar.open('Your review added successfully.', '', {
          duration: 3000,
        });
      this.content=''
      this.review.content=''
      this.review.note=''
      },
      err=>{
        console.log(err);

      });
    }


  }

  ngOnInit(): void {
  this.getAllReviews()
  }

}
