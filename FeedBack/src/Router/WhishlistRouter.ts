import { AddToWishlist, ShowWishlist } from "../controller/WhishlistController";
module.exports=(router:any)=>{
    router.post('/addToWishlist',AddToWishlist);
    router.get('/showList/:idUser',ShowWishlist);

}