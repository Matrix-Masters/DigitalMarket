package com.example.digitalmarket.listProduct

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import android.widget.Toast.makeText
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.R

class ListProductAdapter(private val products: ArrayList<Product>) : RecyclerView.Adapter<ListProductAdapter.MyViewHolder>() {

    private var selectedPosition = RecyclerView.NO_POSITION

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
        holder.name.text = item.name
        holder.price.text = item.price.toString()

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
        selectedPosition = position
        notifyDataSetChanged()
    }
}
