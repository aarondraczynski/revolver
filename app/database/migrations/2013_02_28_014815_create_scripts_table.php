<?php

use Illuminate\Database\Migrations\Migration;

class CreateScriptsTable extends Migration {

	/**
	 * Run migrations to support script data storage.
	 *
	 * @return void
	 */
	public function up() {
		// Create scripts table
		Schema::create('scripts', function($table) {
			$table->increments('id')->unsigned();
			$table->integer('active')->unsigned();
			$table->integer('protected')->unsigned();
			$table->string('name');
			$table->text('description');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the script data storage migrations.
	 *
	 * @return void
	 */
	public function down() {
		// Delete scripts table
		Schema::drop('scripts');
	}

}
