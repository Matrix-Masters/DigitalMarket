package com.example.digitalmarket.signup

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.R
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout

//Declaration
lateinit var logdin: Button
lateinit var Email:EditText
lateinit var EmailLayout:TextInputLayout
lateinit var Mobile:EditText
lateinit var MobileLayout:TextInputLayout
lateinit var PasswordLayout:TextInputLayout
lateinit var Password:EditText
lateinit var DescText:TextView;
lateinit var signupbtn:Button
lateinit var root:LinearLayout;
class signup_second_step : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportActionBar?.hide()
        setContentView(R.layout.activity_signup_second_step)
        DescText=findViewById(R.id.descSignup)
        val role =intent.getStringExtra("role")
        val name =intent.getStringExtra("name")
        val last =intent.getStringExtra("last")
        DescText.text = "Add your details to sign up " + (if (role == null) "User" else role)
        Email=findViewById(R.id.Email);
        EmailLayout=findViewById(R.id.EmailLayout)
        root=findViewById(R.id.root)

        logdin=findViewById(R.id.logdin)
        Mobile=findViewById(R.id.mobile);
        MobileLayout=findViewById(R.id.MobileLayout)

        Password=findViewById(R.id.Password);
        PasswordLayout=findViewById(R.id.PasswordLayout)
        signupbtn=findViewById(R.id.signupbtn)
        setupTextWatchers();

        // Navigate to Login Page
        logdin.setOnClickListener {
            val intent= Intent(this,LoginActivity::class.java)
            startActivity(intent);
        }

        // Submit Formulaire
        signupbtn.setOnClickListener {
            if(TestAllValid()){
                val intent= Intent(this,signupstep_three::class.java)
                intent.putExtra("name",name);
                intent.putExtra("last",last);
                intent.putExtra("num_tlf", Mobile.text.toString())
                intent.putExtra("email", Email.text.toString());
                startActivity(intent);
            }else{
                Snackbar
                    .make(root, "All Fields Are Required", Snackbar.LENGTH_LONG)
                    .setBackgroundTint(getResources().getColor(R.color.Red))
                    .setAction("Try  Again", View.OnClickListener {  }).show()
            }

        }

    }

    //Make Watcher For All Fields
    private fun setupTextWatchers() {
        addTextWatcher(Email, "Email" )
        addTextWatcher(Mobile, "Mobile" )
        addTextWatcher(Password, "Password" )
    }


    //Run Watcher
    private fun addTextWatcher(
        editText: EditText,
        nameField: String,
    ) {
        editText.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                Validator(nameField)
            }
            override fun afterTextChanged(s: Editable?) {
                Validator(nameField)
            }
        })
    }

    //Test All Valid
    fun TestAllValid(): Boolean {
        var valid = true
       if (EmailLayout.error != null) {
            valid = false
        }
        else if (MobileLayout.error != null) {
            valid = false
        }
        else if (PasswordLayout.error != null) {
            valid = false
        }
        return valid
    }

    //Control de saisir
    fun Validator(NameField:String?):Boolean{
         if(NameField=="Email"){
            if(Email.text.isEmpty()){
                EmailLayout.error="Email Required"
                return false
            }else if(!Email.text.toString().matches(Regex("^[A-Za-z0-9+_.-]+@(.+)\$"))){
                EmailLayout.error="Email Invalid"
                return  false
            }
            EmailLayout.error=null;
            return  true;
        }else if(NameField=="Mobile"){
            if(Mobile.text.isEmpty()){
                MobileLayout.error="Mobile Required"
                return false
            }else if(Mobile.text.length>8){
                MobileLayout.error="Mobile Should be 8 Numbers"
                return false
            }
            MobileLayout.error=null;
            return  true;
        }else if(NameField=="Password"){

            if(Password.text.isEmpty()){
                PasswordLayout.error="Password Required"
                return false
            }else if(Password.text.length>10){
                PasswordLayout.error = "Password must be at least 10 characters long"
                return  false
            } else if (!Password.text.toString().matches(Regex(".*[!@#\$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*"))) {
                PasswordLayout.error = "validate Special Character"
                return false
            } else if (!Password.text.toString().matches(Regex(".*[A-Z].*"))) {
                PasswordLayout.error = "validate Capitalized Letter"
                return false
            }
            PasswordLayout.error=null;
            return true
        }
        return false;
    }

    //refresh Upload File


}