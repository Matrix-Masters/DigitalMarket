package com.example.digitalmarket

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.navigation.NavigationView

class FournisseurDashboard : AppCompatActivity() {

    private lateinit var topAppBar: MaterialToolbar
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView

    lateinit var recycle: RecyclerView
    lateinit var adapter: product_adapter
    var products = arrayOf(
        product_data("prod1", R.drawable.watch),
        product_data("prod2", R.drawable.watch),
                product_data("prod1", R.drawable.watch),
    product_data("prod2", R.drawable.watch)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.list_product_fournisseur)

        recycle = findViewById(R.id.recyclerView)
        recycle.layoutManager = LinearLayoutManager(this)
        adapter = product_adapter(products)

        recycle.adapter = adapter

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
