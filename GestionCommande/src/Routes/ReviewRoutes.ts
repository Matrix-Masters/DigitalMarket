import { addReview ,getAllReviews, getReviewByProductId } from "../Controller/ReviewController";
module.exports=(router:any)=>{
    router.post('/addReview',addReview);
    router.get('/getReviews',getAllReviews);
    router.get('/getProductsReviews',getReviewByProductId);
}