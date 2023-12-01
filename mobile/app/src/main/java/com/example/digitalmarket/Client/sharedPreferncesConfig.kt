    package com.example.digitalmarket.Client

    import android.content.Context
    import android.content.SharedPreferences
    import com.example.digitalmarket.Client.panier.PanierData
    import com.example.digitalmarket.listProduct.Product
    import com.google.gson.Gson
    import com.google.gson.GsonBuilder
    import com.google.gson.JsonSyntaxException
    import com.google.gson.reflect.TypeToken

    class sharedPreferncesConfig(val context: Context) {

        private val pref_name = "Products"

        private val gson: Gson by lazy {
            GsonBuilder().setLenient().create()
        }

        val sharedPref: SharedPreferences = context.getSharedPreferences(pref_name, Context.MODE_PRIVATE)

        fun saveList(key: String, productList: List<PanierData>) {
            val editor = sharedPref.edit()
            val jsonString = gson.toJson(productList)
            editor.putString(key, jsonString)
            editor.apply()
        }

        fun getList(key: String): ArrayList<PanierData>? {
            val jsonString = sharedPref.getString(key, null)
            return try {
                val type = object : TypeToken<ArrayList<PanierData>>() {}.type
                gson.fromJson(jsonString, type)
            } catch (e: JsonSyntaxException) {
                null
            }
        }

        fun clearSharedPreference() {
            val editor: SharedPreferences.Editor = sharedPref.edit()
            editor.clear()
            editor.commit()
        }

    }



