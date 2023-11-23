package com.example.digitalmarket.listProduct

import android.widget.ImageView

data class Product (val name:String,val price:Double,val img_id:Int,var isSelected:Boolean=false) {
}