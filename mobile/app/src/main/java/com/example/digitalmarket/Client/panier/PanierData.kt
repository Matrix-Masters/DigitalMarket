package com.example.digitalmarket.Client.panier

data class PanierData(
        val nameProduct:String,
        val photo:Int,
        var qte:Int,
        val prix:Double
) {
}