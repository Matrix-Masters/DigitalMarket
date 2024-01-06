export class User{

    constructor( 
         public _id :String,
         public username:String,
         public firstName:String,
         public lastName:String,
         public email:String,
         public emailVerified:any,
         public enabled:boolean,
         public createdTimestamp:any,
         public attributes:any
        ){}
}