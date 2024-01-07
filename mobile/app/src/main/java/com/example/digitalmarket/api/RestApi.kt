package com.example.digitalmarket.api
import UserResponse
import com.example.digitalmarket.Models.User
import com.example.digitalmarket.Models.credentials
import okhttp3.ResponseBody
import okhttp3.MultipartBody
import retrofit2.http.*
import retrofit2.Response
interface RestApi {
    @POST("/INFOUSER-SERVICE/users/addUserInfo")
    suspend fun CreateAnAccount(@Body User: User);
    @POST("/INFOUSER-SERVICE/auth/login")
    suspend fun LoginUser(@Body payload: credentials): Response<UserResponse>
    @Multipart
    @POST("/PYTHON-SERVICE/api/upload")
    suspend fun ExtractData(@Part image: MultipartBody.Part):ResponseBody
}