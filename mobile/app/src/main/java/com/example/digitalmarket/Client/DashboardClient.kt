package com.example.digitalmarket.Client

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.ContextMenu
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import com.example.digitalmarket.FournisseurAddProduct
import com.example.digitalmarket.FournisseurDashboard
import com.example.digitalmarket.HomeActivity
import com.example.digitalmarket.R
import com.example.digitalmarket.StorageUser.SharedUser
import com.example.digitalmarket.fournisseur_profile
import com.example.digitalmarket.listProduct.ListProduct
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView


class DashboardClient : AppCompatActivity() {
    lateinit var sharedPreference: SharedUser

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard_client)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        registerForContextMenu(toolbar)
        sharedPreference=SharedUser(this);

        /*menu_img.setOnClickListener {
            sharedPreference.clearSharedPreference()
            val intent=Intent(this,HomeActivity::class.java);
            startActivity(intent);
        }*/

        replaceFragment(Panier())
        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.page_1 -> {
                    replaceFragment(Panier())
                    true
                }
                R.id.page_2->{
                    replaceFragment(ListProduct())
                    true
                }
                else -> false
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        val inflater:MenuInflater=menuInflater
        inflater.inflate(R.menu.barclient, menu)
        return true;
    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.frame_layout, fragment)
            .addToBackStack(null)
            .commit()
    }


    override fun onContextItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            // Handle context menu items here
            R.id.editProfile -> {
                // Action for item 1
                return true
            }
            R.id.editEmail -> {
                // Action for item 2
                return true
            }
            R.id.logOut -> {
                // Action for item 2
                return true
            }
            else -> return super.onContextItemSelected(item)
        }
    }

    override fun onCreateContextMenu(menu: ContextMenu, v: View, menuInfo: ContextMenu.ContextMenuInfo?) {
        super.onCreateContextMenu(menu, v, menuInfo)
        menuInflater.inflate(R.menu.barclient, menu)
    }

}