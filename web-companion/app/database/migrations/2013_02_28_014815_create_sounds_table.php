<?php

use Illuminate\Database\Migrations\Migration;

class CreateSoundsTable extends Migration {

	/**
	 * Run migrations to support sound data storage.
	 *
	 * @return void
	 */
	public function up() {
		// Create sounds table
		Schema::create('sounds', function($table) {
			$table->increments('id')->unsigned();
			$table->integer('active')->unsigned();
			$table->string('name');
			$table->integer('duration')->unsigned();
			$table->integer('plays')->unsigned();
			$table->timestamps();
		});

    // Create sound tags table
		Schema::create('sound_tags', function($table) {
			$table->increments('id')->unsigned();
			$table->integer('sound_id')->unsigned();
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
		// Delete sounds and sound tags tables
		Schema::drop('sounds');
		Schema::drop('sound_tags');
	}

}
