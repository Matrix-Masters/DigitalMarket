package com.example.digitalmarket

import android.content.Intent
import android.os.Bundle
import android.view.animation.AnimationUtils
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat

class FournisseurIntroScreen1 : AppCompatActivity() {
    lateinit var navBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fournisseurintroscreen1)
        navBtn = findViewById(R.id.introButton)

        navBtn.setOnClickListener() {
            val intent = Intent(this, FournisseurIntoScreen2::class.java)
            val slideLeftAnimation = AnimationUtils.loadAnimation(this, R.anim.slide_left)
            navBtn.startAnimation(slideLeftAnimation)


            startActivity(intent, ActivityOptionsCompat.makeCustomAnimation(this, R.anim.slide_in_right, R.anim.slide_out_left).toBundle())
        }
    }
}
