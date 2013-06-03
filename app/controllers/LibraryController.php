<?php

class LibraryController extends BaseController {

  /**
   * Show library index page.
   *
   * @return View
   */
  public function getIndex() {
    return View::make('index', array('messages' => Lang::get('messages')));
  }

  /**
   * Return all GIFs.
   *
   * @return JSON
   */
  public function getGifs() {
    $gifs = Gif::where('active', '=', 1)->orderBy('name', 'asc')->get();
    $response = array();

    // Generate JSON data for all GIFs
    foreach ($gifs as $gif) {

      // Retrieve tags for this GIF
      $matching_tags = GifTag::where('gif_id', '=', $gif->id)->get();
      $tag_list = array();
      for ($i = 0; $i < count($matching_tags); $i++) {
        $tag_list[$i]['id'] = $matching_tags[$i]->id;
        $tag_list[$i]['name'] = $matching_tags[$i]->name;
      }

      // Build GIF metadata
      $response[] = array(
        'id'               => $gif->id,
        'name'             => $gif->name,
        'remote_name'      => $gif->remote_name,
        'tags'             => $tag_list,
        'created_at'       => $gif->created_at(),
        'created_at_short' => $gif->created_at(true)
      );
    }

    return Response::json(array('data' => $response));
  }

  /**
   * Return all sounds.
   *
   * @return JSON
   */
  public function getSounds() {
    $sounds = Sound::where('active', '=', 1)->orderBy('name', 'asc')->get();
    $response = array();

    // Generate JSON data for all sounds
    foreach ($sounds as $sound) {

      // Retrieve tags for this sound
      $matching_tags = SoundTag::where('sound_id', '=', $sound->id)->get();
      $tag_list = array();
      for ($i = 0; $i < count($matching_tags); $i++) {
        $tag_list[$i]['id'] = $matching_tags[$i]->id;
        $tag_list[$i]['name'] = $matching_tags[$i]->name;
      }

      // Build sound metadata
      $response[] = array(
        'id'               => $sound->id,
        'name'             => $sound->name,
        'duration'         => ($sound->duration / 1000) . ' sec',
        'tags'             => $tag_list,
        'created_at'       => $sound->created_at(),
        'created_at_short' => $sound->created_at(true)
      );
    }

    return Response::json(array('data' => $response));
  }

  /**
   * Return all videos.
   *
   * @return JSON
   */
  public function getVideos() {
    $videos = Video::where('active', '=', 1)->orderBy('name', 'asc')->get();
    $response = array();

    // Generate JSON data for all sounds
    foreach ($videos as $video) {

      // Retrieve tags for this video
      $matching_tags = VideoTag::where('video_id', '=', $video->id)->get();
      $tag_list = array();
      for ($i = 0; $i < count($matching_tags); $i++) {
        $tag_list[$i]['id'] = $matching_tags[$i]->id;
        $tag_list[$i]['name'] = $matching_tags[$i]->name;
      }

      // Build video metadata
      $response[] = array(
        'id'               => $video->id,
        'name'             => $video->name,
        'extension'        => $video->extension,
        'duration'         => ($video->duration / 1000) . ' sec',
        'tags'             => $tag_list,
        'created_at'       => $video->created_at(),
        'created_at_short' => $video->created_at(true)
      );
    }

    return Response::json(array('data' => $response));
  }

  /**
   * Return all tags used for GIFs.
   *
   * @return JSON
   */
  public function getGifTags() {
    return Response::json(DB::table('gif_tags')->select('name')->distinct()->orderBy('name', 'asc')->get());
  }

  /**
   * Return all tags used for sounds.
   *
   * @return JSON
   */
  public function getSoundTags() {
    return Response::json(DB::table('sound_tags')->select('name')->distinct()->orderBy('name', 'asc')->get());
  }

  /**
   * Return all tags used for videos.
   *
   * @return JSON
   */
  public function getVideoTags() {
    return Response::json(DB::table('video_tags')->select('name')->distinct()->orderBy('name', 'asc')->get());
  }

  /**
   * Get media objects that are associated with a specific tag.
   *
   * @return JSON
   */
  public function getTaggedMedia() {
    // Allow alphanumeric and spaces
    Validator::extend('alpha_num_spaces', function($attribute, $value, $parameters) {
      return preg_match('/^([a-zA-Z0-9\s])+$/i', $value);
    });

    $input = Input::all();
    $rules = array(
      'name' => 'required|alpha_num_spaces|max:20',
      'type' => 'required'
    );

    // Validate tag input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      $media_list = array();
      switch (Input::get('type')) {
        case 'gifs':
          // Get IDs for GIFs associated with this tag
          $media_ids = DB::table('gif_tags')->select('gif_id')->where('name', Input::get('name'))->get(); // GifTag::where('name', '=', Input::get('name'))->get();
          break;
        case 'sounds':
          // Get IDs for sounds associated with this tag
          $media_ids = DB::table('sound_tags')->select('sound_id')->where('name', Input::get('name'))->get(); // SoundTag::where('name', '=', Input::get('name'))->get();
          break;
        case 'videos':
          // Get IDs for videos associated with this tag
          $media_ids = DB::table('video_tags')->select('video_id')->where('name', Input::get('name'))->get(); // VideoTag::where('name', '=', Input::get('name'))->get();
          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      if (count($media_ids) === 0) {
        // Return zero result
        return Response::json(array('success' => 1));
      }

      // Return matching media objects
      return Response::json(array('success' => $media_ids));
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Add a tag to a media object.
   *
   * @return JSON
   */
  public function addTag() {
    // Allow alphanumeric and spaces
    Validator::extend('alpha_num_spaces', function($attribute, $value, $parameters) {
      return preg_match('/^([a-zA-Z0-9\s])+$/i', $value);
    });

    $input = Input::all();
    $rules = array(
      'id'   => 'required|numeric',
      'name' => 'required|alpha_num_spaces|max:20',
      'type' => 'required'
    );

    // Validate tag input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      switch (Input::get('type')) {
        case 'gifs':
          // Ensure that this tag doesn't already exist for this GIF
          $existing = GifTag::where('gif_id', '=', Input::get('id'))->where('name', '=', Input::get('name'))->get();

          if (count($existing) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'This tag already exists.'));
          }

          // Create new GIF tag
          $tag = new GifTag;
          $tag->gif_id = Input::get('id');
          $tag->name = strtolower(Input::get('name'));
          break;
        case 'sounds':
          // Ensure that this tag doesn't already exist for this sound
          $existing = SoundTag::where('sound_id', '=', Input::get('id'))->where('name', '=', Input::get('name'))->get();

          if (count($existing) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'This tag already exists.'));
          }

          // Create new sound tag
          $tag = new SoundTag;
          $tag->sound_id = Input::get('id');
          $tag->name = strtolower(Input::get('name'));
          break;
        case 'videos':
          // Ensure that this tag doesn't already exist for this video
          $existing = VideoTag::where('video_id', '=', Input::get('id'))->where('name', '=', Input::get('name'))->get();

          if (count($existing) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'This tag already exists.'));
          }

          // Create new sound tag
          $tag = new VideoTag;
          $tag->video_id = Input::get('id');
          $tag->name = strtolower(Input::get('name'));
          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      if ($tag->save()) {
        // Return success message
        return Response::json(array('success' => $tag->id));
      }

      // Return save error message
      return Response::json($validator->messages());
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Remove a tag from a media object.
   *
   * @return JSON
   */
  public function removeTag() {
    // Allow alphanumeric and spaces
    Validator::extend('alpha_num_spaces', function($attribute, $value, $parameters) {
      return preg_match('/^([a-zA-Z0-9\s])+$/i', $value);
    });

    $input = Input::all();
    $rules = array(
      'id'   => 'required|numeric',
      'name' => 'required|alpha_num_spaces|max:20',
      'type' => 'required'
    );

    // Validate tag input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Retrieve and remove existing tag
      switch (Input::get('type')) {
        case 'gifs':
          $tag = GifTag::where('gif_id', '=', Input::get('id'))->where('name', '=', Input::get('name'));
          break;
        case 'sounds':
          $tag = SoundTag::where('sound_id', '=', Input::get('id'))->where('name', '=', Input::get('name'));
          break;
        case 'videos':
          $tag = VideoTag::where('video_id', '=', Input::get('id'))->where('name', '=', Input::get('name'));
          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      $id = $tag->first()->id;

      if ($tag->delete()) {
        // Return success message
        return Response::json(array('success' => $id));
      }

      // Return deletion error message
      return Response::json($validator->messages());
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Delete a tag from the library.
   *
   * @return JSON
   */
  public function deleteTag() {
    // Allow alphanumeric and spaces
    Validator::extend('alpha_num_spaces', function($attribute, $value, $parameters) {
      return preg_match('/^([a-zA-Z0-9\s])+$/i', $value);
    });

    $input = Input::all();
    $rules = array(
      'name' => 'required|alpha_num_spaces|max:20',
      'type' => 'required'
    );

    // Validate tag input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Retrieve and delete matching tag
      switch (Input::get('type')) {
        case 'gifs':
          $tag = GifTag::where('name', '=', Input::get('name'));
          break;
        case 'sounds':
          $tag = SoundTag::where('name', '=', Input::get('name'));
          break;
        case 'videos':
          $tag = VideoTag::where('name', '=', Input::get('name'));
          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      if ($tag->delete()) {
        // Return success message
        return Response::json(array('success' => 1));
      }

      // Return deletion error message
      return Response::json($validator->messages());
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Upload a new media object to the library.
   *
   * @return JSON
   */
  public function add() {
    $rules = array(
      'file' => 'mimes:gif,mp3,mp4,mpg,mpeg,mpga,m4v|max:3072'
    );

    // Validate file upload data
    $input = Input::all();
    $validator = Validator::make($input, $rules);
    if (Input::hasFile('file') && $validator->passes()) {

      // Create temporary file reference
      $media = null;
      $file = Input::file('file');
      $extension = $file->guessExtension();
      $temp = sha1(rand() . time());

      switch ($extension) {
        case 'gif':
          $category = 'gifs';

          // @todo
          // If user has already uploaded more than 100 GIFs today, cut them off due to imgur API rate limiting

          // Retrieve GIF file data
          $get_file = fopen($file->getRealPath(), 'r');
          $media_data = fread($get_file, $file->getSize());

          // Build imgur upload request
          $url = 'https://api.imgur.com/3/image';
          $pvars = array('image' => base64_encode($media_data));
          $headers = array('Authorization: Client-ID b6868a97efbff74');
          $curl = curl_init();

          curl_setopt_array($curl, array(
             CURLOPT_URL => $url,
             CURLOPT_TIMEOUT => 30,
             CURLOPT_POST => 1,
             CURLOPT_RETURNTRANSFER => 1,
             CURLOPT_HTTPHEADER => $headers,
             CURLOPT_POSTFIELDS => $pvars
          ));

          // Fire API call to imgur
          $json = curl_exec($curl);
          curl_close($curl);
          $response = json_decode($json, true);

          // If imgur upload failed, return error message
          if ($response['success'] === false) {
            return Response::json(array('error' => 'Aww rats, there was an error uploading that file.'));
          }

          $filetype = 'gif';

          // Create new GIF record
          $media = new Gif;
          $media->active = 0;
          $media->name = $response['data']['id'];
          $media->remote_name = $response['data']['id'];
          $media->plays = 0;
          $media->save();

          // GIF was successfully uploaded, return success message
          return Response::json(array(
            'success'   => $media->id,
            'path'      => $response['data']['link'],
            'name'      => $response['data']['id'],
            'extension' => '.' . $filetype,
            'type'      => $category
          ));

          break;
        case 'mp3':
          $category = 'sounds';

          $filetype = 'mp3';
          $filename = $temp . '.' . $filetype;

          // Create new sound record
          $media = new Sound;
          $media->active = 0;
          $media->name = $temp;
          $media->plays = 0;

          break;
        case 'mpga':
          $category = 'sounds';

          // Create new sound record
          $media = new Sound;
          $media->active = 0;
          $media->name = $temp;
          $media->plays = 0;

          $filetype = 'mp3';
          $filename = $temp . '.' . $filetype;
          break;
        case 'mp4':
          $category = 'videos';

          $filetype = 'mp4';
          $filename = $temp . '.' . $filetype;

          // Create new video record
          $media = new Video;
          $media->active = 0;
          $media->name = $temp;
          $media->extension = $filetype;
          $media->plays = 0;

          break;
        case 'm4v':
          $category = 'videos';

          $filetype = 'm4v';
          $filename = $temp . '.' . $filetype;

          // Create new video record
          $media = new Video;
          $media->active = 0;
          $media->name = $temp;
          $media->extension = $filetype;
          $media->plays = 0;

          break;
        case 'mov':
          $category = 'videos';

          $filetype = 'mov';
          $filename = $temp . '.' . $filetype;

          // Create new video record
          $media = new Video;
          $media->active = 0;
          $media->name = $temp;
          $media->extension = $filetype;
          $media->plays = 0;

          break;
        default:
          return Response::json(array('error' => 'Oops! This file type is not allowed: ' . $extension));
      }

      // @todo
      // Set directory based on active user's organization
      $directory = 'libraries/user/' . $category;

      // Move sound or video file to permanent location
      $upload = $file->move($directory, $filename);

      if ($upload) {
        // Use ffmpeg to determine audio duration in milliseconds
        if ($category === 'sounds' || $category === 'videos') {
          $time = exec("ffmpeg -i " . escapeshellarg('/var/www/public/' . $directory . '/' . $filename) . " 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//");
          list($hr, $min, $sec) = explode(':', $time);
          $duration_in_ms = ($hr * 3600000) + ($min * 60000) + ($sec * 1000);

          $media->duration = $duration_in_ms;
          $media->save();
        }

        // Sound or video was successfully uploaded, return success message
        return Response::json(array(
          'success'   => $media->id,
          'path'      => $directory,
          'name'      => $temp,
          'extension' => $filetype,
          'type'      => $category
        ));
      } else {
        return Response::json(array('error' => 'Oh poo, the upload failed! Sorry about that. Try again?'));
      }
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Edit a media object's metadata.
   *
   * @return JSON
   */
  public function update() {
    // Allow alphanumeric and spaces
    Validator::extend('alpha_num_spaces', function($attribute, $value, $parameters) {
      return preg_match('/^([a-zA-Z0-9\s])+$/i', $value);
    });

    $input = Input::all();
    $rules = array(
      'id'       => 'required|numeric',
      'new_name' => 'required|alpha_num_spaces|max:20',
      'type'     => 'required'
    );

    // Validate tag input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      switch (Input::get('type')) {
        case 'gifs':
          // Make sure this is a valid GIF ID
          $match_id = Gif::where('id', '=', Input::get('id'))->get();
          if (count($match_id) === 0) {
            // Return not found error message
            return Response::json(array('error' => 'The supplied media does not exist.'));
          }

          // Make sure this name isn't already taken
          $match_name = Gif::where('name', '=', Input::get('new_name'))->get();
          if (count($match_name) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'That name is already in use.'));
          }

          // Retrieve media object record
          $media = Gif::find(Input::get('id'));

          // Retrieve tags for this media object
          $matching_tags = GifTag::where('gif_id', '=', $media->id)->get();
          break;
        case 'sounds':
          // Make sure this is a valid sound ID
          $match_id = Sound::where('id', '=', Input::get('id'))->get();
          if (count($match_id) === 0) {
            // Return not found error message
            return Response::json(array('error' => 'The supplied media does not exist.'));
          }

          // Make sure this name isn't already taken
          $match_name = Sound::where('name', '=', Input::get('new_name'))->get();
          if (count($match_name) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'That name is already in use.'));
          }

          // Retrieve media object record
          $media = Sound::find(Input::get('id'));

          // Retrieve tags for this media object
          $matching_tags = SoundTag::where('sound_id', '=', $media->id)->get();
          break;
        case 'videos':
          // Make sure this is a valid video ID
          $match_id = Video::where('id', '=', Input::get('id'))->get();
          if (count($match_id) === 0) {
            // Return not found error message
            return Response::json(array('error' => 'The supplied media does not exist.'));
          }

          // Make sure this name isn't already taken
          $match_name = Video::where('name', '=', Input::get('new_name'))->get();
          if (count($match_name) > 0) {
            // Return duplicate error message
            return Response::json(array('error' => 'That name is already in use.'));
          }

          // Retrieve media object record
          $media = Video::find(Input::get('id'));

          // Retrieve tags for this media object
          $matching_tags = VideoTag::where('video_id', '=', $media->id)->get();
          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      $media->name = strtolower(Input::get('new_name'));
      $media->active = 1;

      if ($media->save()) {
        if (Input::get('type') !== 'gifs') {
          // Rename sound or video file
          $rename = rename(Input::get('path') . '/' . Input::get('name') . '.' . Input::get('extension'), Input::get('path') . '/' . strtolower(Input::get('new_name')) . '.' . Input::get('extension'));
        }

        // Build tag array for this media object
        $tag_list = array();
        for ($i = 0; $i < count($matching_tags); $i++) {
          $tag_list[$i]['id'] = $matching_tags[$i]->id;
          $tag_list[$i]['name'] = $matching_tags[$i]->name;
        }

        switch (Input::get('type')) {
          case 'gifs':
            // Build GIF object data
            $result = array(
              'id'               => $media->id,
              'name'             => $media->name,
              'remote_name'      => $media->remote_name,
              'tags'             => $tag_list,
              'created_at'       => $media->created_at(),
              'created_at_short' => $media->created_at(true)
            );
            break;
          case 'sounds':
            // Build sound object data
            $result = array(
              'id'               => $media->id,
              'name'             => $media->name,
              'duration'         => ($media->duration / 1000) . ' sec',
              'tags'             => $tag_list,
              'created_at'       => $media->created_at(),
              'created_at_short' => $media->created_at(true)
            );
            break;
          case 'videos':
            // Build video object data
            $result = array(
              'id'               => $media->id,
              'name'             => $media->name,
              'extension'        => $media->extension,
              'duration'         => ($media->duration / 1000) . ' sec',
              'tags'             => $tag_list,
              'created_at'       => $media->created_at(),
              'created_at_short' => $media->created_at(true)
            );
            break;
          default:
            return Response::json(array('error' => 'An invalid media type was supplied.'));
        }

        // Return success message
        return Response::json($result);
      } else {
        // Return save error message
        return Response::json($validator->messages());
      }
    } else {
      // Return validation failure message
      return Response::json($validator->messages());
    }
  }

  /**
   * Delete a media object from the library.
   *
   * @return JSON
   */
  public function delete() {
    $input = Input::all();
    $rules = array(
      'id'   => 'required|numeric',
      'type' => 'required'
    );

    // Validate sound input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Retrieve matching media object
      switch (Input::get('type')) {
        case 'gifs':
          // Retrieve matching GIF
          $gif = Gif::find(Input::get('id'));
          $name = $gif->name;

          // Delete GIF record
          $gif->delete();

          // Delete associated tag entries for this GIF
          $tag = GifTag::where('gif_id', '=', Input::get('id'))->delete();

          // Return success message
          return Response::json(array('success' => 1));

          break;
        case 'sounds':
          // Retrieve matching sound
          $sound = Sound::find(Input::get('id'));
          $name = $sound->name;

          // Delete sound record
          $sound->delete();

          // Delete sound file
          $delete = unlink('libraries/user/sounds/' . $name . '.mp3');

          // Delete associated tag entries for this sound
          $tag = SoundTag::where('sound_id', '=', Input::get('id'))->delete();

          // Return success message
          return Response::json(array('success' => 1));

          break;
        case 'videos':
          // Retrieve matching video
          $video = Video::find(Input::get('id'));
          $name = $video->name;
          $extension = $video->extension;

          // Delete video record
          $video->delete();

          // Delete video file
          $delete = unlink('libraries/user/videos/' . $name . '.' . $extension);

          // Delete associated tag entries for this sound
          $tag = VideoTag::where('video_id', '=', Input::get('id'))->delete();

          // Return success message
          return Response::json(array('success' => 1));

          break;
        default:
          return Response::json(array('error' => 'An invalid media type was supplied.'));
      }

      return Response::json(array('error' => 'Something went wrong while deleting that object.'));
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

}
