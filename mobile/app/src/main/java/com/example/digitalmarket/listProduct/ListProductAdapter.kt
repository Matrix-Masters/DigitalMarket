package com.example.digitalmarket.listProduct

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.Client.panier.PanierData
import com.example.digitalmarket.Client.sharedPreferncesConfig
import com.example.digitalmarket.R

class ListProductAdapter(private val context: Context, private val products: ArrayList<Product>) : RecyclerView.Adapter<ListProductAdapter.MyViewHolder>() {

    private var selectedPosition = RecyclerView.NO_POSITION
    val sharedPreference: sharedPreferncesConfig = sharedPreferncesConfig(context)
    inner class MyViewHolder(itemview: View) : RecyclerView.ViewHolder(itemview), View.OnClickListener {
        val name: TextView = itemview.findViewById(R.id.prod_name)
        val img: ImageView = itemview.findViewById(R.id.prod_img)
        val price: TextView = itemview.findViewById(R.id.prod_price)
        val btn: TextView = itemview.findViewById(R.id.prod_btn)

        init {
            itemview.setOnClickListener(this)
        }

        override fun onClick(v: View?) {
            onItemClick(adapterPosition)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val layout = LayoutInflater.from(parent.context).inflate(R.layout.card, parent, false)
        return MyViewHolder(layout)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = products[position]
        holder.img.setImageResource(R.drawable.product1)
        holder.name.text = item.name
        holder.price.text = item.prix.toString()
        holder.btn.setOnClickListener {

            var retrievedProductList = sharedPreference.getList("Products")?.toMutableList() ?: mutableListOf()
            val existingProductIndex = retrievedProductList.indexOfFirst { it.nameProduct == item.name }

            if (existingProductIndex != -1) {
                retrievedProductList[existingProductIndex].qte += 1
            } else {
                retrievedProductList.add(PanierData(item.name,R.drawable.product1, 1, item.prix))
            }

            sharedPreference.saveList("Products", retrievedProductList)
            retrievedProductList = sharedPreference.getList("Products")?.toMutableList() ?: mutableListOf()
            Log.i("eee", retrievedProductList.toString())

        }

        if (selectedPosition == position) {
            holder.itemView.setBackgroundColor(ContextCompat.getColor(holder.itemView.context, R.color.white))

        } else {
            holder.itemView.setBackgroundColor(ContextCompat.getColor(holder.itemView.context, android.R.color.white))
        }
    }

    override fun getItemCount(): Int {
        return products.size
    }

    fun onItemClick(position: Int) {
        sharedPreference.clearSharedPreference();
        selectedPosition = position
        notifyDataSetChanged()
    }
}
