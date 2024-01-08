package com.example.digitalmarket.signup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.Models.ForgotPassword
import com.example.digitalmarket.Models.VerifyEmail
import com.example.digitalmarket.R
import com.example.digitalmarket.api.ServiceBuilder
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.Dispatcher

class ForgotPassword : AppCompatActivity() {
    lateinit var confirm:Button
    lateinit var email:EditText
    lateinit var linear:LinearLayout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_forgot_password)
        confirm = findViewById(R.id.Confirm)
        email = findViewById(R.id.email)
        linear = findViewById(R.id.root)
        confirm.setOnClickListener {
            val scope = CoroutineScope(Dispatchers.Main)
            scope.launch {
                try {
                    val data = ForgotPassword(email.text.toString(),null,null)
                    val response = ServiceBuilder.apiService.forgotPassword(data)
                    if(response.isSuccessful){
                        gochanger(email.text.toString())
                        Log.i("test1", response.body().toString()!!)
                    }else{
                        showToast("Email Invalid.")
                        Log.i("test2",email.text.toString())
                    }

                } catch (e: Exception) {
                    // Handle other exceptions
                    Log.e("test3", "Exception: ${e.message}", e)
                }
            }
            val intent = Intent(this,ChangePassword::class.java)
            startActivity(intent)
        }

    }
    fun gochanger(email:String){
        val intent = Intent(this, ChangePassword::class.java)
        intent.putExtra("email",email)
        intent.putExtra("message","Email verified successfully.")
        startActivity(intent)
    }

    fun showToast(message: String) {
        val toast = Toast.makeText(this, message, Toast.LENGTH_SHORT)
        val view = toast.view
        if (view != null) {
            view.setBackgroundColor(resources.getColor(R.color.Red))
        }
        toast.show()
    }
}