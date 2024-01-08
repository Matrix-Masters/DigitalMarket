package com.example.digitalmarket
import android.content.Intent
import android.view.View
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.digitalmarket.Client.DashboardClient
import com.example.digitalmarket.Client.sharedPreferncesConfig
import com.example.digitalmarket.Models.credentials
import com.example.digitalmarket.StorageUser.SharedUser
import com.example.digitalmarket.api.ServiceBuilder
import com.example.digitalmarket.signup.ForgotPassword
import com.example.digitalmarket.signup.SignUpStepOne
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity(){
    lateinit var Loginbutton: Button;
    lateinit var Email:EditText;
    lateinit var Password:EditText;
    lateinit var errorText:TextView;
    lateinit var signupBtn:Button
    lateinit var root:LinearLayout
    lateinit var forgetPassword:TextView
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.login)
        supportActionBar?.hide()
        val sharedPreference: SharedUser = SharedUser(this);
        Loginbutton=findViewById(R.id.loginButton)
        Email=findViewById(R.id.email)
        signupBtn=findViewById(R.id.signup)
        Password=findViewById(R.id.password)
        root=findViewById(R.id.root)
        forgetPassword = findViewById(R.id.forgetPassword)
        forgetPassword.setOnClickListener {
            val intent = Intent(this,ForgotPassword::class.java)
            startActivity(intent)
        }
        errorText=findViewById(R.id.error)
        val email_verified = intent.getStringExtra("email")
        Email.setText(email_verified)
        val Message =intent.getStringExtra("message")
        if(Message!=null){
            Snackbar
                .make(root, Message?.trimIndent().toString(), Snackbar.LENGTH_LONG)
                .setBackgroundTint(getResources().getColor(R.color.teal_200))
                .setAction("close", View.OnClickListener {  }).show()
        }
        Loginbutton.setOnClickListener{
            if(!validForm()){
                errorText.text = "fill out all the form fields!"
                errorText.visibility=View.VISIBLE;
            }else{
                val scope = CoroutineScope(Dispatchers.Main)
                scope.launch {
                    try{
                        var payload=credentials(Email.text.toString(),Password.text.toString());
                        var response=  ServiceBuilder.apiService.LoginUser(payload);
                        if (response.isSuccessful && response.body() != null) {
                            sharedPreference.saveUser("user",response.body()!!);
                            navigateToDashboard()
                        }else{
                            Log.e("Error",response.message())
                            errorText.text = response.message().toString();
                            errorText.visibility=View.VISIBLE;
                        }
                    }catch (e:Exception){
                        Log.e("Error",e.message.toString())
                        errorText.text = e.message.toString();
                        errorText.visibility=View.VISIBLE;
                    }
                }

            }

        }

        signupBtn.setOnClickListener {
            val intent= Intent(this,SignUpStepOne::class.java)
            startActivity(intent);
        }
    }

    fun navigateToDashboard() {
        val intent = Intent(this, DashboardClient::class.java)
        startActivity(intent)
    }
    fun validForm():Boolean{
         if(Password.text.isEmpty()){
              return false;
         }else if(Email.text.isEmpty()){
             return false;
         }
        return  true;
    }

}