package com.example.alzheimers

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton

class homepage : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_homepage)

        val game = findViewById<ImageButton>(R.id.home_memory)
        game.setOnClickListener {
            val intent = Intent(this, memorygame::class.java)
            startActivity(intent)
        }

        val recaller = findViewById<ImageButton>(R.id.home_recall)
        recaller.setOnClickListener {
            val intent = Intent(this, recall::class.java)
            startActivity(intent)
        }

        val edu = findViewById<ImageButton>(R.id.home_edu)
        edu.setOnClickListener {
            val intent = Intent(this, eduresource::class.java)
            startActivity(intent)
        }
    }




}