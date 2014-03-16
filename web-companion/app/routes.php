<?php

Route::get('a/library/gifs', 'LibraryController@getGifs');
Route::get('a/library/gifs/tags', 'LibraryController@getGifTags');
Route::get('a/library/gifs/lookup/{name}', function($name) {
  $gif = Gif::where('name', '=', $name)->first();

  if (count($gif) > 0) {
    $response = Response::json(array('remote_name' => $gif->remote_name));
    $response->headers->set('Access-Control-Allow-Origin', '*');
  } else {
    $response = Response::json(array('error' => 1));
    $response->headers->set('Access-Control-Allow-Origin', '*');
  }
  return $response;
});

Route::get('a/library/sounds', 'LibraryController@getSounds');
Route::get('a/library/sounds/tags', 'LibraryController@getSoundTags');

Route::get('a/library/videos', 'LibraryController@getVideos');
Route::get('a/library/videos/tags', 'LibraryController@getVideoTags');
Route::get('a/library/videos/lookup/{name}', function($name) {
  $video = Video::where('name', '=', $name)->first();

  if (count($video) > 0) {
    $response = Response::json(array('extension' => $video->extension));
    $response->headers->set('Access-Control-Allow-Origin', '*');
  } else {
    $response = Response::json(array('error' => 1));
    $response->headers->set('Access-Control-Allow-Origin', '*');
  }
  return $response;
});

Route::post('a/library/tags/lookup', 'LibraryController@getTaggedMedia');
Route::post('a/library/tags/add', 'LibraryController@addTag');
Route::post('a/library/tags/remove', 'LibraryController@removeTag');
Route::post('a/library/tags/delete', 'LibraryController@deleteTag');

Route::post('a/library/add', 'LibraryController@add');
Route::post('a/library/update', 'LibraryController@update');
Route::post('a/library/delete', 'LibraryController@delete');

Route::get('a/platform/scripts', 'PlatformController@getScripts');
Route::get('a/platform/build', 'PlatformController@build');

Route::post('a/platform/add', 'PlatformController@add');
Route::post('a/platform/update', 'PlatformController@update');
Route::post('a/platform/delete', 'PlatformController@delete');

Route::get('/', 'LibraryController@getIndex');

Route::get('install', function(){
  return file_get_contents('../public/installer.php');
});