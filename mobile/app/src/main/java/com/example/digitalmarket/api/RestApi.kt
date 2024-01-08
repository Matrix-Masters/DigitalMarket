package com.example.digitalmarket.api
import UserResponse
import com.example.digitalmarket.Models.ForgotPassword
import com.example.digitalmarket.Models.User

import com.example.digitalmarket.Models.VerifyEmail
import com.example.digitalmarket.listProduct.Product
import com.example.digitalmarket.product_data
import com.example.digitalmarket.Models.credentials
import okhttp3.ResponseBody
import okhttp3.MultipartBody
import retrofit2.http.*
interface RestApi {
    @POST("/INFOUSER-SERVICE/users/addUserInfo")
    suspend fun CreateAnAccount(@Body User: User);
    @POST("/INFOUSER-SERVICE/auth/login")
    suspend fun LoginUser(@Body payload: credentials): Response<UserResponse>
    @Multipart
    @POST("/PYTHON-SERVICE/api/upload")
    suspend fun ExtractData(@Part image: MultipartBody.Part):ResponseBody


    @POST("/INFOUSER-SERVICE/auth/verifyMail")
    suspend fun verify(@Body data:VerifyEmail) : Response<ResponseBody>

    @POST("/INFOUSER-SERVICE/auth/ForgotPassword")
    suspend fun forgotPassword(@Body data:ForgotPassword) : Response<ResponseBody>

    @POST("/INFOUSER-SERVICE/auth/ChangerPassword")
    suspend fun ChangerPassword(@Body data:ForgotPassword) : Response<ResponseBody>
    @GET("/PRODUCT-SERVICE/products/getAllProducts")
    suspend fun getProducts():Response<MutableList<Product>>
}