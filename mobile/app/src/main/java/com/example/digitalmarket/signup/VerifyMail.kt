package com.example.digitalmarket.signup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Message
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.Models.VerifyEmail
import com.example.digitalmarket.R
import com.example.digitalmarket.api.ServiceBuilder
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class VerifyMail : AppCompatActivity() {
    lateinit var email:EditText
    lateinit var code:EditText
    lateinit var confirm:Button
    lateinit var root:LinearLayout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        setContentView(R.layout.activity_verify_mail)
        email = findViewById(R.id.email)
        code = findViewById(R.id.code)
        confirm = findViewById(R.id.Confirm)
        root = findViewById(R.id.root)


        confirm.setOnClickListener {
            val scope = CoroutineScope(Dispatchers.Main)
            scope.launch {
                try {
                    val data = VerifyEmail(email.text.toString(),code.text.toString())
                    val response = ServiceBuilder.apiService.verify(data)
                    if (response.isSuccessful) {
                        goLogin(email.text.toString())
                        Log.i("test1", response.body().toString()!!)
                    } else {

                        snackbar("Email or Code Invalid.")
                        Log.e("test2", email.text.toString() + code.text.toString() + response)
                    }
                } catch (e: Exception) {
                    // Handle other exceptions
                    Log.e("test3", "Exception: ${e.message}", e)
                }
            }
        }
    }
    fun snackbar(message: String) {
        Snackbar
            .make(root, message, Snackbar.LENGTH_SHORT)
            .setBackgroundTint(resources.getColor(R.color.Red))
            .setAction("Try Again") {
                // Add your action here
            }
            .setActionTextColor(resources.getColor(R.color.Red))
            .show()
    }

    fun goLogin(email:String){
        val intent = Intent(this,LoginActivity::class.java)
        intent.putExtra("email",email)
        intent.putExtra("message","Email verified successfully.")
        startActivity(intent)
    }


}
