package com.example.digitalmarket

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.navigation.NavigationView
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

class fournisseur_profile : AppCompatActivity() {
    private lateinit var topAppBar: MaterialToolbar
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fournisseur_profile)
        topAppBar = findViewById(R.id.topAppBar)
        drawerLayout = findViewById(R.id.drawerLayout)
        navigationView = findViewById(R.id.navigationView)

        topAppBar.setNavigationOnClickListener {
            drawerLayout.open()
        }

        navigationView.setNavigationItemSelectedListener { menuItem ->

            menuItem.isChecked = true
            drawerLayout.close()
            when (menuItem.itemId) {
                R.id.item1 -> startNewActivity(FournisseurDashboard::class.java)
                R.id.item2 -> startNewActivity(FournisseurAddProduct::class.java)
                R.id.profile -> startNewActivity(fournisseur_profile::class.java)
                R.id.logout -> showLogoutConfirmationDialog()
            }
            true
        }

        val usernameInputLayout = findViewById<TextInputLayout>(R.id.usernameInputLayout)
        val usernameEditText = findViewById<TextInputEditText>(R.id.usernameEditText)
        val emailInputLayout = findViewById<TextInputLayout>(R.id.emailInputLayout)
        val emailEditText = findViewById<TextInputEditText>(R.id.emailEditText)
        val phoneInputLayout = findViewById<TextInputLayout>(R.id.phoneInputLayout)
        val phoneEditText = findViewById<TextInputEditText>(R.id.phoneEditText)
        val passwordInputLayout = findViewById<TextInputLayout>(R.id.passwordInputLayout)
        val passwordEditText = findViewById<TextInputEditText>(R.id.passwordEditText)
        val saveChangesButton = findViewById<Button>(R.id.saveChangesButton)

        // Set random values as initial text
        usernameEditText.setText("Fournisseur name")
        emailEditText.setText("fournisseur@gmail.com")
        phoneEditText.setText("+216 20 257 687")
        passwordEditText.setText("password")





    }
    private fun showLogoutConfirmationDialog() {
        val builder = AlertDialog.Builder(this, R.style.CustomAlertDialog)
        builder.setTitle("Logout")
        builder.setMessage("Are you sure you want to logout?")
        builder.setPositiveButton("Yes") { dialog, which ->
            startNewActivity(LoginActivity::class.java)
        }
        builder.setNegativeButton("No") { dialog, which ->
        }
        builder.show()
    }
    private fun startNewActivity(activityClass: Class<*>) {
        val intent = Intent(this, activityClass)
        startActivity(intent)
    }
}