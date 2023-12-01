package com.example.digitalmarket.listProduct

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.R

class ListProduct : Fragment() {
    lateinit var recyle: RecyclerView
    lateinit var myadpter:ListProductAdapter
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view= inflater.inflate(R.layout.activity_list_product, container, false)

        var products = ArrayList<Product>()
        val p1=Product("portable1",10.32,R.drawable.product1)
        val p2=Product("portable2",5.252,R.drawable.product1)
        val p3=Product("portable3",6.0,R.drawable.product1)
        val p4=Product("portable4",15.32,R.drawable.product1)
        val p5=Product("portable5",9.252,R.drawable.product1)
        val p6=Product("portable6",10.0,R.drawable.product1)
        products.add(p1)
        products.add(p2)
        products.add(p3)
        products.add(p4)
        products.add(p5)
        products.add(p6)


        recyle=view.findViewById(R.id.recycler)
        recyle.layoutManager= LinearLayoutManager(activity)
        myadpter= ListProductAdapter(requireContext(),products)
        recyle.adapter=myadpter;

        return  view;
    }
}