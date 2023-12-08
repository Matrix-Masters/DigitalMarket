package com.example.digitalmarket

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.app.AlertDialog
import androidx.activity.OnBackPressedCallback
import com.example.digitalmarket.signup.SignUpStepOne

class HomeActivity : AppCompatActivity() {
    lateinit var btnClient:Button
    lateinit var btnSupplier:Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.home)
        supportActionBar?.hide()
        btnClient = findViewById(R.id.btnClient)
        btnSupplier = findViewById(R.id.btnSupplier)
        onBackPressedDispatcher.addCallback(this,onBackPressedCallback)
        btnClient.setOnClickListener {
            btnClient.animate()
                .scaleX(0.5f).scaleY(0.5f)
                .translationY((btnClient.height / 4).toFloat())
                .translationX((btnClient.width / 4).toFloat())
                .alpha(0.5f)
                .rotation(360f)
                .setDuration(500)
                .withEndAction {
                    goSignup("Client")
                    btnClient.animate()
                        .scaleX(1.0f)
                        .scaleY(1.0f)
                        .translationY(0f)
                        .translationX(0f)
                        .alpha(1.0f)
                        .rotation(0f)
                        .setDuration(0)
                }
        }

        btnSupplier.setOnClickListener {
            btnSupplier.animate()
                .scaleX(0.5f).scaleY(0.5f)
                .translationY((btnSupplier.height / 4).toFloat())
                .translationX((btnSupplier.width / 4).toFloat())
                .alpha(0.5f)
                .rotation(360f)
                .setDuration(500)
                .withEndAction {
                    goSignup("Supplier")
                    btnSupplier.animate()
                        .scaleX(1.0f)
                        .scaleY(1.0f)
                        .translationY(0f)
                        .translationX(0f)
                        .alpha(1.0f)
                        .rotation(0f)
                        .setDuration(0)
                }
        }
    }

    private fun goSignup(role:String){
        var intent = Intent(this,SignUpStepOne::class.java)
        intent.putExtra("role",role.toString())
        startActivity(intent)

    }
    private val onBackPressedCallback = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            showDialog()
        }
    }

    fun showDialog(){
        val builder = AlertDialog.Builder(this)
        builder.setMessage("Are you sure you want to exit Digital Market ?")
        builder.setPositiveButton("Yes") { dialog, which ->
            finish()
        }
        builder.setNegativeButton("No") { dialog, which ->
            dialog.dismiss()
        }
        builder.show()
    }

}