package com.example.digitalmarket.signup

import android.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.R
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout

class SignUpStepOne : AppCompatActivity() {

    //Declaration
    lateinit var logdin: Button
    lateinit var Name:EditText
    lateinit var NameLayout:TextInputLayout
    lateinit var LastName:EditText
    lateinit var LastNameLayout:TextInputLayout
    lateinit var DescText:TextView;
    lateinit var signupbtn:Button
    lateinit var root:LinearLayout;

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        //Hide ActionBar
        supportActionBar?.hide()
        val role =intent.getStringExtra("role")
        setContentView(R.layout.activity_sign_up_step_one)
        DescText=findViewById(R.id.descSignup)
        DescText.text = "Add your details to sign up " + (if (role == null) "User" else role)

        //Initialiser
        Name=findViewById(R.id.Name);
        NameLayout=findViewById(R.id.NameLayout)

        LastName=findViewById(R.id.LastName);
        LastNameLayout=findViewById(R.id.LastNameLayout)

        logdin=findViewById(R.id.logdin)
        root=findViewById(R.id.root)
        signupbtn=findViewById(R.id.signupbtn)

        //Appel  Function
        setupTextWatchers();

        // Navigate to Login Page
        logdin.setOnClickListener {
            val intent= Intent(this,LoginActivity::class.java)
            startActivity(intent);
        }

        // Submit Formulaire
        signupbtn.setOnClickListener {
            if(TestAllValid()){
                if(Name.text.isEmpty() || LastName.text.isEmpty()){
                    Snackbar
                        .make(root, "All Fields Are Required", Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.Red))
                        .setAction("Try  Again", View.OnClickListener {  }).show()
                }else{
                    val intent= Intent(this,signup_second_step::class.java)
                    intent.putExtra("name",Name.text.toString());
                    intent.putExtra("last",LastName.text.toString());
                    intent.putExtra("role",role);
                    startActivity(intent);
                }
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
        addTextWatcher(Name, "Name")
        addTextWatcher(LastName, "Last" )
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
        if (NameLayout.error!=null) {
            valid = false
        }
        else if (LastNameLayout.error!=null) {
            valid = false
        }
        return valid
    }

    //Control de saisir
    fun Validator(NameField:String?):Boolean{
        if(NameField=="Name"){
            if(Name.text.isEmpty()){
                NameLayout.error="Name Required"
                return false
            }else if(Name.text.length>7){
                NameLayout.error=" name must be at least 7 characters long"
                return  false
            }
            NameLayout.error=null;
            return  true;
        }else if(NameField=="Last"){
            if(LastName.text.isEmpty()){
                LastNameLayout.error="LastName equired"
                return false
            }else if(LastName.text.length>10){
                LastNameLayout.error=" LastName must be at least 10 characters long"
                return  false
            }
            LastNameLayout.error=null;
            return  true;
        }
        return false;
    }

}


