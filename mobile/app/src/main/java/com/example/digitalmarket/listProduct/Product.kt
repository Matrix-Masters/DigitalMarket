package com.example.digitalmarket.listProduct

import android.widget.ImageView

import java.sql.Timestamp

data class Product(
    val id: Long?,
    val name: String,
    val description: String,
    val imageProduct: String,
    val status: Int = 0,
    val quantite: Int,
    val prix: Double,
    val idUser: Long = 0,
    val nbSales: Long = 0,
    val createdAt: Timestamp?,
    val updatedAt: Timestamp?,
)
