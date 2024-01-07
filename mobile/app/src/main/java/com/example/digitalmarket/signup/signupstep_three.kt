package com.example.digitalmarket.signup

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.digitalmarket.LoginActivity
import com.example.digitalmarket.Models.User
import com.example.digitalmarket.R
import com.example.digitalmarket.api.ServiceBuilder
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.util.jar.Manifest

lateinit var RadioLayout:TextInputLayout
lateinit var radioGroup:RadioGroup
lateinit var radioButtonHomme:RadioButton
lateinit var radioButtonFemme:RadioButton
lateinit var UploadFile:TextView
lateinit var imageView: ImageView
lateinit var uploadcard:TextView
private  val PICK_IMAGE_REQUEST = 1
lateinit var ContainerPhoto:LinearLayout
lateinit var imageFile: File
var upload = false
private const val PERMISSION_REQUEST_CODE = 1
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
        val password =intent.getStringExtra("Password")
        uploadcard=findViewById(R.id.uploadcard)
        DescText=findViewById(R.id.descSignup)
        ContainerPhoto=findViewById(R.id.ContainerPhoto)
        if(role.toString()=="Client"){
            ContainerPhoto.visibility=View.GONE
            uploadcard.visibility=View.GONE
        }
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
        logdin=findViewById(R.id.logdin)
        logdin.setOnClickListener {
            val intent= Intent(this,LoginActivity::class.java)
            startActivity(intent);
        }
        //Navigate to login with Message
        fun LoginWithSuccess(){
            //Send Message to Login
            val scope = CoroutineScope(Dispatchers.Main)
            scope.launch {
                try {
                    val gendre = if (radioButtonFemme.isChecked) {
                        "Female"
                    } else {
                        "Male"
                    }
                    if(role=="Client"){
                        var user=User(name,lastname,email,password,num_tlf,null,gendre,null,role);
                        ServiceBuilder.apiService.CreateAnAccount(user);
                    }else{
                        val requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), imageFile)
                        val imagePart = MultipartBody.Part.createFormData("image", imageFile.name, requestFile)
                        val response = ServiceBuilder.apiService.ExtractData(imagePart);
                        val responseData = response.toString();
                        Log.i("test", "Response from Python: $responseData")
                        var user=User(name,lastname,email,password,num_tlf,null,gendre,null,role);
                        ServiceBuilder.apiService.CreateAnAccount(user);
                        Log.i("test", "Response from Python: $responseData")
                    }
                }catch (e:Exception){
                    Log.i("Errror",e.toString());
                }
            }
            var message=name.toString() + " Added With Success";
            val intent= Intent(this,LoginActivity::class.java)
            intent.putExtra("message",message);
            startActivity(intent);
        }

        signupbtn.setOnClickListener {
            if(TestAllValid()){
                var Required = role != "Client"
                if(!upload && Required){
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
                    var message="  Name : ${name.toString()}  \n" +
                                "  LastName : ${lastname.toString()}  \n" +
                                "  email : ${email.toString()}  \n " +
                                "  Mobile: ${num_tlf.toString()} \n " +
                                "  Gendre :${gendre} \n" ;
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
                    .setBackgroundTint(getResources().getColor(R.color.Red))
                    .setAction("Try  Again", View.OnClickListener {  }).show()
            }
        }
    }

    //Test All Valid
    fun TestAllValid(): Boolean {
        var valid = true
         if (RadioLayout.error != null) {
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
        requestPermissionsIfNeeded(view);
    }


    // Chose Image
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK) {
            val selectedImageUri = data?.data
            imageView.setImageURI(selectedImageUri)
            try {
                val inputStream = contentResolver.openInputStream(selectedImageUri!!)
                imageFile = File(getRealPathFromURI(selectedImageUri))
                upload = true
                clearError()
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(this, "Error opening image", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun getRealPathFromURI(uri: Uri?): String? {
        val projection = arrayOf(MediaStore.Images.Media.DATA)
        val cursor = contentResolver.query(uri!!, projection, null, null, null)
        cursor?.use {
            if (it.moveToFirst()) {
                val columnIndex = it.getColumnIndexOrThrow(MediaStore.Images.Media.DATA)
                return it.getString(columnIndex)
            }
        }
        return null
    }
    private fun requestPermissionsIfNeeded(v: View) {
        val permission = android.Manifest.permission.READ_EXTERNAL_STORAGE
        if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(permission), PERMISSION_REQUEST_CODE)
        } else {
            // Permission already granted, perform your operations here
            pickImage(v)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            PERMISSION_REQUEST_CODE -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // Permission granted, perform your operations here
                    pickImage(findViewById(android.R.id.content))
                } else {
                    // Permission denied, handle accordingly
                    Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }


}

