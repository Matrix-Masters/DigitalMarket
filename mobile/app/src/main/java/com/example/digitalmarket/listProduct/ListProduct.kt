package com.example.digitalmarket.listProduct

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.R
import com.example.digitalmarket.api.RestApi
import com.example.digitalmarket.api.ServiceBuilder
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ListProduct : Fragment() {
    lateinit var recyle: RecyclerView
    lateinit var myadpter:ListProductAdapter
    lateinit var products:ArrayList<Product>
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view= inflater.inflate(R.layout.activity_list_product, container, false)



        /*val p1=Product("portable1",10.32,R.drawable.product1)
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
        products.add(p6)*/
        products = ArrayList()

        recyle=view.findViewById(R.id.recycler)
        recyle.layoutManager= LinearLayoutManager(activity)
        myadpter= ListProductAdapter(requireContext(),products)
        recyle.adapter=myadpter;
        this.getAllProducts();

        return  view;
    }
    private fun getAllProducts() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ServiceBuilder.apiService.getProducts()

                if (response.isSuccessful) {
                    val productList: MutableList<Product>? = response.body()

                    withContext(Dispatchers.Main) {
                        // Update products on the main thread
                        products.clear()  // Clear existing data
                        productList?.let { products.addAll(it) }  // Add new data if not null
                        myadpter.notifyDataSetChanged()  // Notify the adapter of the data change


                    }
                }
            } catch (e: Exception) {
               Log.i("i",e.message.toString())
            }
        }
    }

}