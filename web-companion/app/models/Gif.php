<?php

use Illuminate\Support\Facades\URL;

class Gif extends Eloquent {

	/**
	 * Delete a GIF.
	 *
	 * @return bool
	 */
	public function delete() {
		return parent::delete();
	}

	/**
	 * Retrieve the tags associated with this GIF.
	 *
	 * @return User
	 */
	public function tags() {
		return $this->hasMany('GifTag', 'gif_id');
	}

	/**
	 * Retrieve the date this GIF was uploaded.
	 *
	 * @return string
	 */
	public function created_at($short = false) {
		if ($short) {
		  return ExpressiveDate::make($this->created_at)->getShortDate();
		} else {
		  return ExpressiveDate::make($this->created_at)->getDateTime();
	  }
	}

	/**
	 * Retrieve the date this GIF was last modified.
	 *
	 * @return string
	 */
	public function updated_at($short = false) {
		if ($short) {
		  return ExpressiveDate::make($this->updated_at)->getShortDate();
		} else {
		  return ExpressiveDate::make($this->updated_at)->getDateTime();
	  }
	}

}
