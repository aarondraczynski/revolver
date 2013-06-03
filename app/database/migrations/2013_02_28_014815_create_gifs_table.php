<?php

use Illuminate\Database\Migrations\Migration;

class CreateGifsTable extends Migration {

  /**
   * Run migrations to support GIF data storage.
   *
   * @return void
   */
  public function up() {
    // Create GIFs table
    Schema::create('gifs', function($table) {
      $table->increments('id')->unsigned();
      $table->integer('active')->unsigned();
      $table->string('name');
      $table->string('remote_name');
      $table->integer('plays')->unsigned();
      $table->timestamps();
    });

    // Create GIF tags table
    Schema::create('gif_tags', function($table) {
      $table->increments('id')->unsigned();
      $table->integer('gif_id')->unsigned();
      $table->string('name');
      $table->timestamps();
    });
  }

  /**
   * Reverse the sound data storage migrations.
   *
   * @return void
   */
  public function down() {
    // Delete GIFs and GIF tags tables
    Schema::drop('gifs');
    Schema::drop('gif_tags');
  }

}
