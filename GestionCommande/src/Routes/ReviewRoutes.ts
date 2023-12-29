import { addReview ,getAllReviews } from "../Controller/ReviewController";
module.exports=(router:any)=>{
    router.post('/addReview',addReview);
    router.get('/getReviews',getAllReviews);
}