package com.example.digitalmarket.listProduct

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.R

class ListProduct : AppCompatActivity() {
    lateinit var go_back_img:ImageView
    lateinit var menu_img:ImageView
    lateinit var recyle: RecyclerView
    lateinit var myadpter:ListProductAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_product)
        go_back_img = findViewById(R.id.go_back_img)
        menu_img = findViewById(R.id.menu_img)

        var products = ArrayList<Product>()
        val p1=Product("portable",542.32,R.drawable.product1)
        val p2=Product("portable",356.252,R.drawable.product1)
        val p3=Product("portable",500.0,R.drawable.product1)
        products.add(p1)
        products.add(p2)
        products.add(p3)


        recyle=findViewById(R.id.recycler)
        recyle.layoutManager= LinearLayoutManager(this)
        myadpter= ListProductAdapter(products)
        recyle.adapter=myadpter;
    }
}