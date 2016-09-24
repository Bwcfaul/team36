package oasys.za.ac.uj.team36.tests;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.TypedArray;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;


import oasys.za.ac.uj.team36.Model.UserLocalDatabase;

public class TradeWorker extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private FragmentManager fm ;
    private Notification.Builder notification;
    private static final int uniqueID = 45788 ; // Id for each notification
    private UserLocalDatabase DB ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_trade_worker);
        notification = new Notification.Builder(this);
        notification.setAutoCancel(true); // maiking notification disappear once this screen has loaded
        DB = new UserLocalDatabase(this);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);



        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Notification bar", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            clearSharedPref();
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.trade_worker, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        if (id == R.id.action_logoutTW) {
            this.finish();
            removelogIn();
            DB.clearLocalDBdata();
            clearSharedPref();
            startActivity(new Intent(this,Main.class));
        }
        if (id == R.id.action_notification) {
            setNotification();
        }


        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();
        fm = getSupportFragmentManager();
        if (id == R.id.nav_jobRequests) {
            Intent i = new Intent(TradeWorker.this, TradeworkerJobRequests.class);
            startActivity(i);
        } else if (id == R.id.nav_InitiatedJobsTW) {
            Intent i = new Intent(TradeWorker.this, TradeworkerInitiatedJobs.class);
           //this.finish();  //Kill the activity from which you will go to next activity
            startActivity(i);
        } else if (id == R.id.nav_OngoingJobsTW) {
            Intent i = new Intent(TradeWorker.this, TradeworkerOngoingJobs.class);
            //this.finish();  //Kill the activity from which you will go to next activity
            startActivity(i);
        } else if (id == R.id.nav_FinishedJobsTW) {
            Intent i = new Intent(TradeWorker.this, TradeworkerFinishedJobs.class);
            //this.finish();  //Kill the activity from which you will go to next activity
            startActivity(i);
        } else if (id == R.id.nav_editDetailsTW) {
            // TODO Handle the camera action
        } else if (id == R.id.nav_editLocationsTW) {
            // TODO Handle the camera action
        }else if (id == R.id.nav_editSkillsTW) {
            // TODO Handle the camera action
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void setNotification(){

        notification.setSmallIcon(R.drawable.favicon);
        notification.setTicker("Sebenza SA notification") ;
        notification.setWhen(System.currentTimeMillis());
        notification.setContentTitle("Notification recieved");
        notification.setContentText("You have been sent a in app notification");
        //handle click of notification on screen
        Intent intent = new Intent(this, HomeUser.class);
        PendingIntent pend = PendingIntent.getActivity(this,0,intent, PendingIntent.FLAG_UPDATE_CURRENT);
        notification.setContentIntent(pend) ;
        // Building the actual notification on home screen scroll down
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        nm.notify(uniqueID, notification.build());

    }

    private void removelogIn(){
        DB.setUserLoggedIn(false);
    }

    public void clearSharedPref(){
       DB.clearLocalDBdata();
    }

}
