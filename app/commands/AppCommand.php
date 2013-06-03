<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class AppCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var	string
	 */
	protected $name = 'app:install';

	/**
	 * The console command description.
	 *
	 * @var	string
	 */
	protected $description = 'Populate the Revolver database with sounds.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
	public function fire()
	{
		// Run the Migrations
		$this->call('migrate');

		// Seed the tables with dummy data
		$this->call('db:seed');
	}

}
