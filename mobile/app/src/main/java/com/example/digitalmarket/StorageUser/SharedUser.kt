package com.example.digitalmarket.StorageUser

import UserResponse
import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonSyntaxException
import com.google.gson.reflect.TypeToken

class SharedUser(val context: Context) {

    private val pref_name = "User"

    private val gson: Gson by lazy {
        GsonBuilder().setLenient().create()
    }

    val sharedPref: SharedPreferences = context.getSharedPreferences(pref_name, Context.MODE_PRIVATE)

    fun saveUser(key: String, user: UserResponse) {
        val editor = sharedPref.edit()
        val jsonString = gson.toJson(user)
        editor.putString(key, jsonString)
        editor.apply()
    }

    fun getUser(key: String):UserResponse? {
        val jsonString = sharedPref.getString(key, null)
        return try {
            val type = object : TypeToken<UserResponse>() {}.type
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



