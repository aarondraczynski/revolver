<?php

use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration {

	/**
	 * Run migrations to support video data storage.
	 *
	 * @return void
	 */
	public function up() {
		// Create videos table
		Schema::create('videos', function($table) {
			$table->increments('id')->unsigned();
			$table->integer('active')->unsigned();
			$table->string('name');
			$table->string('extension');
			$table->integer('duration')->unsigned();
			$table->integer('plays')->unsigned();
			$table->timestamps();
		});

    // Create video tags table
		Schema::create('video_tags', function($table) {
			$table->increments('id')->unsigned();
			$table->integer('video_id')->unsigned();
			$table->string('name');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the video data storage migrations.
	 *
	 * @return void
	 */
	public function down() {
		// Delete videos and video tags tables
		Schema::drop('videos');
		Schema::drop('video_tags');
	}

}
