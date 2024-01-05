package com.example.digitalmarket.api
import com.example.digitalmarket.Models.User
import com.example.digitalmarket.listProduct.Product
import com.example.digitalmarket.product_data
import okhttp3.ResponseBody
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.*

interface RestApi {
    @POST("/INFOUSER-SERVICE/addUserInfo")
    suspend fun CreateAnAccount(@Body User: User);
    @Multipart
    @POST("/PYTHON-SERVICE/api/upload")
    suspend fun ExtractData(@Part image: MultipartBody.Part):ResponseBody
    @GET("/PRODUCT-SERVICE/products/getAllProducts")
    suspend fun getProducts():Response<MutableList<Product>>
}