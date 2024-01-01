import { getNbSales } from "../Controller/StatsController"

module.exports=(router:any)=>{
    router.get('/getStats/:id',getNbSales)
}