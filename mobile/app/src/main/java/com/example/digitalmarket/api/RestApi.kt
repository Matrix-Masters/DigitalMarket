package com.example.digitalmarket.api
import com.example.digitalmarket.Models.User
import okhttp3.ResponseBody
import okhttp3.MultipartBody
import retrofit2.http.*

interface RestApi {
    @POST("/INFOUSER-SERVICE/addUserInfo")
    suspend fun CreateAnAccount(@Body User: User);
    @Multipart
    @POST("/PYTHON-SERVICE/api/upload")
    suspend fun ExtractData(@Part image: MultipartBody.Part):ResponseBody
}