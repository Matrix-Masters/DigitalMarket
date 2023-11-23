package com.example.digitalmarket

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class product_adapter(private val data: Array<product_data>):RecyclerView.Adapter<product_adapter.MyViewHolder>() {

    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val name: TextView = itemView.findViewById(R.id.name)
        val image: ImageView = itemView.findViewById(R.id.img)
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): product_adapter.MyViewHolder {
        val layout =
            LayoutInflater.from(parent.context).inflate(R.layout.product_card, parent, false);
        return MyViewHolder(layout);
    }

    override fun getItemCount(): Int {
       return data.size;
    }


    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = data[position]
        holder.name.text = item.name
        holder.image.setImageResource(item.imageResId)



    }
}