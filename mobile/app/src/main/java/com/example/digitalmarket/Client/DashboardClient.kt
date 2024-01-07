package com.example.digitalmarket.Client
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.drawerlayout.widget.DrawerLayout
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
    lateinit var text:TextView
    lateinit var menu_img:ImageView
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard_client)
        text=findViewById(R.id.textDigital);
        menu_img=findViewById(R.id.menu_img);
        sharedPreference=SharedUser(this);
        text.text ="Welcome "+sharedPreference.getUser("user")?.user?.firstName;

        menu_img.setOnClickListener {
            sharedPreference.clearSharedPreference()
            val intent=Intent(this,HomeActivity::class.java);
            startActivity(intent);
        }

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
        val nameClientItem = menu?.findItem(R.id.NameClient)
        nameClientItem?.title=sharedPreference.getUser("user")?.user?.firstName;
        return true;
    }
    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.frame_layout, fragment)
            .addToBackStack(null)
            .commit()
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.NameClient -> {
                Toast.makeText(applicationContext, "Menu search sélectionné ", Toast.LENGTH_SHORT).show()
                true
            }
            R.id. menu_exit -> {
                Toast.makeText(applicationContext, "Menu Exit sélectionné ", Toast.LENGTH_SHORT).show()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

}


