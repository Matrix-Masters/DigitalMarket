package com.example.digitalmarket.Client.panier

import android.app.AlertDialog
import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.Client.sharedPreferncesConfig
import com.example.digitalmarket.R

class PanierAdapter (private val context: Context, private var products: ArrayList<PanierData>, private val listener: OnItemClickListener) : RecyclerView.Adapter<PanierAdapter.MyViewHolder>() {


    interface OnItemClickListener {
        fun onItemChanged()
    }
    private var selectedPosition = RecyclerView.NO_POSITION
    val sharedPreference: sharedPreferncesConfig = sharedPreferncesConfig(context)
    inner class MyViewHolder(itemview: View) : RecyclerView.ViewHolder(itemview), View.OnClickListener {
        val name: TextView = itemview.findViewById(R.id.prod_name)
        val img: ImageView = itemview.findViewById(R.id.prod_img)
        val price: TextView = itemview.findViewById(R.id.prod_price)
        val qte:TextView=itemview.findViewById(R.id.qte)
        val plus:Button=itemview.findViewById(R.id.plus)
        val moins:Button=itemview.findViewById(R.id.minus)
        val Delete:ImageView=itemview.findViewById(R.id.Delete)
        init {
            itemview.setOnClickListener(this)
        }

        override fun onClick(v: View?) {
            onItemClick(adapterPosition)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val layout = LayoutInflater.from(parent.context).inflate(R.layout.lignepanier, parent, false)
        return MyViewHolder(layout)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = products[position]
        holder.img.setImageResource(item.photo)
        holder.name.text = item.nameProduct
        holder.price.text = item.prix.toString()
        holder.qte.text=item.qte.toString()
        holder.plus.setOnClickListener {
            var retrievedProductList = sharedPreference.getList("Products")?.toMutableList() ?: mutableListOf()
            retrievedProductList[position].qte += 1
            sharedPreference.saveList("Products", retrievedProductList)
            notifyItemChanged(position);
            this.products=sharedPreference.getList("Products")!!
            listener.onItemChanged()
        }
        holder.moins.setOnClickListener {
            var retrievedProductList = sharedPreference.getList("Products")?.toMutableList() ?: mutableListOf()
            if( retrievedProductList[position].qte>1){
                retrievedProductList[position].qte -= 1
            }else{
                retrievedProductList.remove(item);
            }
            sharedPreference.saveList("Products", retrievedProductList)
            notifyItemChanged(position);
            notifyDataSetChanged();
            this.products=sharedPreference.getList("Products")!!
            listener.onItemChanged()
        }
        holder.Delete.setOnClickListener {
            var alert=AlertDialog.Builder(context);
            alert.setTitle("Confirmation")
            alert.setMessage("Do You Wanna Delete from Panier${item.nameProduct}");
            alert.setPositiveButton("Ok"){alert,Wich->
                var retrievedProductList = sharedPreference.getList("Products")?.toMutableList() ?: mutableListOf()
                retrievedProductList.remove(item);
                sharedPreference.saveList("Products", retrievedProductList)
                notifyItemChanged(position);
                notifyDataSetChanged();
                this.products=sharedPreference.getList("Products")!!
                listener.onItemChanged()
                Toast.makeText(context,"Deleted",Toast.LENGTH_LONG).show();
            }
            alert.setNegativeButton("No"){alert,Wich->alert.cancel()}
            alert.show();

        }
    }

    override fun getItemCount(): Int {
        return products.size
    }

    fun TotalePrix():Double{
        var total=0.0;
        for (product in products) {
            total+=product.prix*product.qte;
        }
        return  total;
    }

    fun onItemClick(position: Int) {
        sharedPreference.clearSharedPreference();
        selectedPosition = position
        notifyDataSetChanged()
    }
}