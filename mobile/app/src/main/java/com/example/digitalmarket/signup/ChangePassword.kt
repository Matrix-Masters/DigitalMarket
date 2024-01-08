package com.example.digitalmarket.signup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.Models.ForgotPassword
import com.example.digitalmarket.R
import com.example.digitalmarket.api.ServiceBuilder
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ChangePassword : AppCompatActivity() {
    lateinit var email:EditText
    lateinit var token:EditText
    lateinit var newPassword: EditText
    lateinit var confirm : Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_password)
        email = findViewById(R.id.email)
        token = findViewById(R.id.token)
        newPassword = findViewById(R.id.newPassword)
        confirm  = findViewById(R.id.Confirm)
        val intentEmail = intent.getStringExtra("email")
        email.setText(intentEmail)

        confirm.setOnClickListener {
            val scope = CoroutineScope(Dispatchers.Main)
            scope.launch {
                try{
                    val data = ForgotPassword(email.text.toString(),newPassword.text.toString(),token.text.toString())
                    val response = ServiceBuilder.apiService.ChangerPassword(data)
                    Log.i("test",response.isSuccessful.toString())
                    if(response.isSuccessful){
                        goLogin(email.text.toString())
                        Log.i("test1", response.body().toString()!!)
                    }else{
                        showToast("Email Invalid.")
                        Log.i("test2",email.text.toString())
                    }
                }catch (e: Exception){
                    Log.e("test3", "Exception: ${e.message}", e)
                }

            }
        }
    }
    fun goLogin(email:String){
        val intent = Intent(this, LoginActivity::class.java)
        intent.putExtra("email",email)
        intent.putExtra("message","Email verified successfully.")
        startActivity(intent)
    }
    fun showToast(message: String) {
        val toast = Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

}