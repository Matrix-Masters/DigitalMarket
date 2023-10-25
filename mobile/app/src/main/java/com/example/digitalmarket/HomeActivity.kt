package com.example.digitalmarket

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class HomeActivity : AppCompatActivity() {
    lateinit var btnClient:Button
    lateinit var btnSupplier:Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.home)
        btnClient = findViewById(R.id.btnClient)
        btnSupplier = findViewById(R.id.btnSupplier)

        btnClient.setOnClickListener {
            goSignup("client")
        }

        btnSupplier.setOnClickListener {
            goSignup("supplier")
        }


    }

    private fun goSignup(role:String){
        var intent = Intent(this,signup::class.java)
        intent.putExtra("role",role.toString())
        startActivity(intent)
    }
}