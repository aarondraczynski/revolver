<?php

use Illuminate\Support\Facades\URL;

class Video extends Eloquent {

	/**
	 * Delete a video.
	 *
	 * @return bool
	 */
	public function delete() {
		return parent::delete();
	}

	/**
	 * Retrieve the duration of a video in minutes/seconds/milliseconds.
	 *
	 * @return string
	 */
	public function duration() {
		return floor($this->duration / 60000) . ':' . floor(($this->duration % 60000) / 1000) . ':' . str_pad(floor($this->duration % 1000), 3, '0', STR_PAD_LEFT);
	}

	/**
	 * Retrieve the tags associated with this video.
	 *
	 * @return User
	 */
	public function tags() {
		return $this->hasMany('VideoTag', 'sound_id');
	}

	/**
	 * Retrieve the date this video was uploaded.
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
	 * Retrieve the date this video was last modified.
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
