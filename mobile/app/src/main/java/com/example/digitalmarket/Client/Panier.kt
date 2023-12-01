package com.example.digitalmarket.Client

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.digitalmarket.Client.panier.PanierAdapter
import com.example.digitalmarket.R
import com.example.digitalmarket.listProduct.ListProductAdapter

class Panier : Fragment() ,PanierAdapter.OnItemClickListener{

    lateinit var recyle: RecyclerView
    lateinit var myadpter:PanierAdapter
    lateinit var emptyPanier:TextView
    lateinit var mycart:TextView
    lateinit var Totale:TextView
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
         val view= inflater.inflate(R.layout.activity_panier, container, false)
         val sharedPreference: sharedPreferncesConfig =sharedPreferncesConfig(requireContext());
        emptyPanier=view.findViewById(R.id.emptyPanier);
        emptyPanier.visibility=View.GONE;
        mycart=view.findViewById(R.id.mycart);
        recyle=view.findViewById(R.id.recyclePanier)
        Totale=view.findViewById(R.id.Totale)
        if(sharedPreference.getList("Products")!=null){
            val retrievedProductList =sharedPreference.getList("Products");
            mycart.setText("My Cart ( " + retrievedProductList?.size +" ) ");
            recyle.layoutManager= LinearLayoutManager(activity)
            myadpter=PanierAdapter(requireContext(), sharedPreference.getList("Products")!!,this)
            recyle.adapter=myadpter;
            Totale.setText(myadpter.TotalePrix().toString()+"$");
        }else{
            mycart.setText("My Cart");
            emptyPanier.visibility=View.VISIBLE;
            recyle.visibility=View.INVISIBLE;
        }
         return  view;
    }
    override fun onItemChanged() {
        Totale.setText(myadpter.TotalePrix().toString()+"$");
        mycart.setText("My Cart ( " + myadpter.getItemCount().toString() +" ) ");
    }

}