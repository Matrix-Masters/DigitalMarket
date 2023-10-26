package com.example.digitalmarket

import android.app.Activity
import android.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent
import android.provider.MediaStore
import android.text.Editable
import android.text.TextWatcher
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

    //Declaration
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
     lateinit var DescText:TextView;
     lateinit var signupbtn:Button
     lateinit var UploadFile:TextView
     private  val PICK_IMAGE_REQUEST = 1
     lateinit var root:LinearLayout;
     var upload = false

    override fun onCreate(savedInstanceState: Bundle?) {

            super.onCreate(savedInstanceState)
            //Hide ActionBar
            supportActionBar?.hide()
            val role =intent.getStringExtra("role")
            setContentView(R.layout.activity_signup)
            DescText=findViewById(R.id.descSignup)
            DescText.text = "Add your details to sign up " + (if (role == null) "User" else role)
            //Initialiser
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
            root=findViewById(R.id.root)
            signupbtn=findViewById(R.id.signupbtn)

         //Appel  Function
            setupTextWatchers();

         // Navigate to Login Page
          logdin.setOnClickListener {
                  val intent= Intent(this,LoginActivity::class.java)
                  startActivity(intent);
          }


        //Navigate to login with Message
        fun LoginWithSuccess(){
           /* Snackbar.make(
                root,"User Created",Snackbar.LENGTH_LONG
            ).setBackgroundTint(getResources().getColor(R.color.teal_200))
                .setAction("close", View.OnClickListener {  })
                .show();
                */
            //Send Message to Login
            var message=Name.text.toString()+" Added With Success";
            val intent= Intent(this,LoginActivity::class.java)
            intent.putExtra("message",message);
            startActivity(intent);
        }

         // Submit Formulaire
          signupbtn.setOnClickListener {
              if(TestAllValid()){
                      if(!upload){
                          UploadFile.error = ""
                          UploadFile.text = "Image upload is required"
                      }else{
                          val gendre = if (radioButtonFemme.isChecked) {
                              "Female"
                          } else {
                              "Male"
                          }
                          val ad: AlertDialog.Builder
                          ad = AlertDialog.Builder(this)
                          var message=" Name : ${Name.text}  \n" +
                                  " LastName : ${LastName.text}  \n" +
                                  " email : ${Email.text}  \n " +
                                  "Mobile: ${Mobile.text} \n " +
                                  "Gendre :${gendre} \n" ;
                          ad.setMessage(message)
                          ad.setTitle("Confirmation")

                          //confirm
                          ad.setPositiveButton(
                              "Confirm"
                          ) { dialogInterface, i ->  LoginWithSuccess() }

                          //close
                          ad.setNegativeButton("close",
                              { dialogInterface, i -> Int })
                          val a = ad.create()
                          a.show()


                      }
              }else{
                     Snackbar
                      .make(root, "All Fields Are Required", Snackbar.LENGTH_LONG)
                      .setBackgroundTint(getResources().getColor(R.color.red))
                      .setAction("Try  Again", View.OnClickListener {  }).show()
              }

          }
    }

    //Make Watcher For All Fields
    private fun setupTextWatchers() {
        addTextWatcher(Name, "Name")
        addTextWatcher(LastName, "Last" )
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
        if (NameLayout.error != null) {
            valid = false
        }
        else if (LastNameLayout.error != null) {
            valid = false
        }
        else if (EmailLayout.error != null) {
            valid = false
        }
        else if (MobileLayout.error != null) {
            valid = false
        }
        else if (PasswordLayout.error != null) {
            valid = false
        }
        else if (RadioLayout.error != null) {
            valid = false
        }
        else if (!upload) {
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
                LastNameLayout.error="LastName est Obligatoire"
                return false
            }else if(LastName.text.length>10){
                LastNameLayout.error=" LastName must be at least 10 characters long"
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
            } else if (!Password.text.toString().matches(Regex(".*[!@#\$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*"))) {
                PasswordLayout.error = "validate Special Character"
                return false
            } else if (!Password.text.toString().matches(Regex(".*[A-Z].*"))) {
                PasswordLayout.error = "validate Capitalized Letter"
                return false
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
