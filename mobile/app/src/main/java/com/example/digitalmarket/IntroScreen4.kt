package com.example.digitalmarket

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class IntroScreen4 : AppCompatActivity() {
    lateinit var navBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.intro_screen_4)
        navBtn = findViewById(R.id.introButton)

        navBtn.setOnClickListener(){
            val intent = Intent(this,IntroScreen2::class.java)
            startActivity(intent)
        }
    }

}