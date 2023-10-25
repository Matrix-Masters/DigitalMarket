package com.example.digitalmarket
import android.content.Intent
import android.view.View
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar

class LoginActivity : AppCompatActivity(){
    lateinit var Loginbutton: Button;
    lateinit var Email:EditText;
    lateinit var Password:EditText;
    lateinit var errorText:TextView;
    lateinit var signupBtn:Button
    lateinit var root:LinearLayout
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.login)
        supportActionBar?.hide()
        Loginbutton=findViewById(R.id.loginButton)
        Email=findViewById(R.id.email)
        signupBtn=findViewById(R.id.signup)
        Password=findViewById(R.id.password)
        root=findViewById(R.id.root)
        errorText=findViewById(R.id.error)
        val Message =intent.getStringExtra("message")
        if(Message!=null){
            Snackbar
                .make(root, Message?.trimIndent().toString(), Snackbar.LENGTH_LONG)
                .setBackgroundTint(getResources().getColor(R.color.teal_200))
                .setAction("close", View.OnClickListener {  }).show()
        }
        Loginbutton.setOnClickListener{
            validForm();
        }
        signupBtn.setOnClickListener {
            val intent= Intent(this,signup::class.java)
            startActivity(intent);
        }
    }
    fun validForm(){
    if(Password.text.isEmpty()){
        errorText.text = "fill out all the form fields!"
        errorText.visibility=View.VISIBLE;
    }else{
        errorText.text = ""
        errorText.visibility=View.INVISIBLE;
    }
    }

}