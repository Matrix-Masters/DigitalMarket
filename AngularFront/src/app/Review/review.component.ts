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
  selectedStars: boolean[] = [false, false, false, false, false];
  content:any=''
  review: review ={content:'',note:'',product_id:"null",user_id:7};
  constructor(private reviewService:ReviewServiceService,private cdr: ChangeDetectorRef,private MatSnackBar:MatSnackBar){}
  allReviews:any

  clearRating(): void {
    this.selectedRating = null;
  }
  setRating(rating: number): void {
    this.selectedRating = rating || 0;
    this.toggleSelection();
    this.review.note = this.selectedRating + ".0";
  }

  toggleSelection() {
    for (let i = 0; i < this.selectedStars.length; i++) {
      this.selectedStars[i] = false;
    }
    if (this.selectedRating !== null) {

      for (let i = 0; i < this.selectedRating; i++) {
        this.selectedStars[i] = true;
      }
    }
    this.review.note = this.selectedRating + ".0";
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
