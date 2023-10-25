package com.example.digitalmarket
import android.view.View
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity(){
    lateinit var Loginbutton: Button;
    lateinit var Email:EditText;
    lateinit var Password:EditText;
    lateinit var errorText:TextView;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login)
        Loginbutton=findViewById(R.id.loginButton)
        Email=findViewById(R.id.email)
        Password=findViewById(R.id.password)
        errorText=findViewById(R.id.error)
        Loginbutton.setOnClickListener(){
        validForm();
        }
    }
     fun validForm(){
    if(Password.text.isEmpty()){
        errorText.text = "fill out all the form fields!"
        errorText.visibility=View.VISIBLE;
    }
    }
}