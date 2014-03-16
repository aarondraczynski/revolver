<?php

class SoundsSeeder extends Seeder {

  /**
   * Navigate into an existing directory on the server that contains sound files
   * and intialize them into the database.
   *
   */
  public function run() {
    // Delete all existing sounds
    // DB::table('sounds')->delete();

    $path = "/var/www/public/libraries/user/sounds/";

    // If the wildcard operator is not present, add it to the end
    $dir = (!strstr($path, "*") || $path == "./") ? $path . "*" : $path;

    $files = glob($dir);

    // Some pre-filled values for seeded data
    $default = array(
      'active'  => 1,
      'plays'   => 0
    );

    // Loop through sound files
    for($i = 0; $i < sizeof($files); $i++) {

      // Remove extension from filename
      $name = preg_replace("/\\.[^.\\s]{3,4}$/", "", basename($files[$i]));

      // Use ffmpeg to determine audio duration in milliseconds
      $time = exec("ffmpeg -i " . escapeshellarg($path . basename($files[$i])) . " 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//");
      list($hr, $min, $sec) = explode(':', $time);
      $duration_in_ms = ($hr * 3600000) + ($min * 60000) + ($sec * 1000);

      $sound = array_merge($default, array(
        'name'       => $name,
        'duration'   => $duration_in_ms,
        'created_at' => new DateTime,
        'updated_at' => new DateTime
      ));

      // Add to database
      Sound::create($sound);
    }
  }

}
