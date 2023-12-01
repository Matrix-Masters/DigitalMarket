package com.example.digitalmarket.Client
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.digitalmarket.R
import com.example.digitalmarket.listProduct.ListProduct
import com.google.android.material.bottomnavigation.BottomNavigationView


class DashboardClient : AppCompatActivity() {
    lateinit var go_back_img: ImageView
    lateinit var menu_img: ImageView
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard_client)
        go_back_img = findViewById(R.id.go_back_img)
        menu_img = findViewById(R.id.menu_img)
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
    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.frame_layout, fragment)
            .addToBackStack(null)
            .commit()
    }

}


