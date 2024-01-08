package com.example.digitalmarket.Models

data class ForgotPassword(
    val email : String ?=null,
    val password : String ?=null,
    val token : String ?=null,
)
