package com.example.digitalmarket

import android.app.Activity
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent
import android.provider.MediaStore
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout

class signup : AppCompatActivity() {
     lateinit var button2: Button
     lateinit var logdin: Button
     lateinit var imageView: ImageView
     lateinit var Name:EditText
     lateinit var NameLayout:TextInputLayout
     lateinit var LastName:EditText
     lateinit var LastNameLayout:TextInputLayout
     lateinit var Email:EditText
     lateinit var EmailLayout:TextInputLayout
     lateinit var Mobile:EditText
     lateinit var MobileLayout:TextInputLayout
     lateinit var PasswordLayout:TextInputLayout
     lateinit var Password:EditText
     lateinit var RadioLayout:TextInputLayout
     lateinit var radioGroup:RadioGroup
     lateinit var radioButtonHomme:RadioButton
     lateinit var radioButtonFemme:RadioButton
     lateinit var signupbtn:Button
     lateinit var UploadFile:TextView
     private val PICK_IMAGE_REQUEST = 1
     lateinit var root:LinearLayout;
     var upload = false

    override fun onCreate(savedInstanceState: Bundle?) {

            super.onCreate(savedInstanceState)
            supportActionBar?.hide()
            val role = intent.getStringExtra("role")
            setContentView(R.layout.activity_signup)

            button2 = findViewById(R.id.button2)
            logdin=findViewById(R.id.logdin)
            imageView = findViewById(R.id.imageView)

            Name=findViewById(R.id.Name);
            NameLayout=findViewById(R.id.NameLayout)

            LastName=findViewById(R.id.LastName);
            LastNameLayout=findViewById(R.id.LastNameLayout)

            Email=findViewById(R.id.Email);
            EmailLayout=findViewById(R.id.EmailLayout)

            Mobile=findViewById(R.id.mobile);
            MobileLayout=findViewById(R.id.MobileLayout)

            Password=findViewById(R.id.Password);
            PasswordLayout=findViewById(R.id.PasswordLayout)

            RadioLayout=findViewById(R.id.RadioLayout)
            radioGroup=findViewById(R.id.radioGroup)
            radioButtonHomme=findViewById(R.id.radioButtonHomme)
            radioButtonFemme=findViewById(R.id.radioButtonFemme)

            UploadFile=findViewById(R.id.RequirePhoto)

            signupbtn=findViewById(R.id.signupbtn)

         // Navigate to Login Page
          logdin.setOnClickListener {
                  val intent= Intent(this,HomeActivity::class.java)
                  startActivity(intent);
          }

         // Submit Formulaire
          signupbtn.setOnClickListener {
             var validTest=Validator("Name") && Validator("Last") && Validator("Email") && Validator("Mobile") && Validator("Password") && Validator("gendre")  ;
             if(validTest){
                    if(!upload){
                        UploadFile.error = ""
                        UploadFile.text = "Image upload is required"
                    }else{
                        Snackbar.make(
                            root,"User Created",Snackbar.LENGTH_LONG
                        ).setAction("close", View.OnClickListener {  }).show();
                    }
             }
          }
    }

    //Control de saisir
    fun Validator(NameField:String?):Boolean{
        if(NameField=="Name"){
            if(Name.text.isEmpty()){
                NameLayout.error="Name Required"
                return false
            }else if(Name.text.length>25){
                NameLayout.error=" name must be at least 15 characters long"
                return  false
            }
            NameLayout.error=null;
            return  true;
        }else if(NameField=="Last"){
            if(LastName.text.isEmpty()){
                LastNameLayout.error="LastName est Obligatoire"
                return false
            }else if(LastName.text.length>15){
                LastNameLayout.error=" LastName must be at least 15 characters long"
                return  false
            }
            LastNameLayout.error=null;
            return  true;
        }else if(NameField=="Email"){
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
            }
            PasswordLayout.error=null;
            return true
        }else if(NameField=="gendre"){
            if(!radioButtonFemme.isChecked && !radioButtonHomme.isChecked){
                RadioLayout.error="Gendre Required"
                return false
            }
            RadioLayout.error=null;
            return true
        }
        return false;
    }
    //refresh Upload File
    fun clearError() {
        UploadFile.error = null
        UploadFile.text="";
    }
    //Open PickImage
   fun pickImage(view: View) {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, PICK_IMAGE_REQUEST)
    }

    //Chose Image
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK) {
            val selectedImageUri = data?.data
            imageView.setImageURI(selectedImageUri)
            upload=true;
            clearError()
        }
    }

}
