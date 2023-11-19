package com.example.digitalmarket.signup

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.R
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout

lateinit var RadioLayout:TextInputLayout
lateinit var radioGroup:RadioGroup
lateinit var radioButtonHomme:RadioButton
lateinit var radioButtonFemme:RadioButton
lateinit var UploadFile:TextView
lateinit var imageView: ImageView
private  val PICK_IMAGE_REQUEST = 1
var upload = false
class signupstep_three : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signupstep_three)

        //Hide ActionBar
        supportActionBar?.hide()
        val role =intent.getStringExtra("role")
        val email =intent.getStringExtra("email")
        val num_tlf =intent.getStringExtra("num_tlf")
        val name =intent.getStringExtra("name")
        val lastname =intent.getStringExtra("last")
        DescText=findViewById(R.id.descSignup)
        DescText.text = "Add your details to sign up " + (if (role == null) "User" else role)
        //Initialiser
        imageView = findViewById(R.id.imageView)

        RadioLayout=findViewById(R.id.RadioLayout)
        radioGroup=findViewById(R.id.radioGroup)
        radioButtonHomme=findViewById(R.id.radioButtonHomme)
        radioButtonFemme=findViewById(R.id.radioButtonFemme)

        UploadFile=findViewById(R.id.RequirePhoto)
        root=findViewById(R.id.root)
        signupbtn=findViewById(R.id.signupbtn)
        logdin.setOnClickListener {
            val intent= Intent(this,LoginActivity::class.java)
            startActivity(intent);
        }

        //Navigate to login with Message
        fun LoginWithSuccess(){

            //Send Message to Login
            var message=name.toString() + " Added With Success";
            val intent= Intent(this,LoginActivity::class.java)
            intent.putExtra("message",message);
            startActivity(intent);
        }

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
                    var message=" Name : ${name.toString()}  \n" +
                            " LastName : ${lastname.toString()}  \n" +
                            " email : ${email.toString()}  \n " +
                            "Mobile: ${num_tlf.toString()} \n " +
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

    //Run Watcher

    //Test All Valid
    fun TestAllValid(): Boolean {
        var valid = true
         if (RadioLayout.error != null) {
            valid = false
        }
        else if (!upload) {
            valid = false
        }
        return valid
    }
    //Control de saisir


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

