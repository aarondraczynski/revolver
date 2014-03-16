<?php

use Illuminate\Support\Facades\URL;

class Sound extends Eloquent {

	/**
	 * Delete a sound.
	 *
	 * @return bool
	 */
	public function delete() {
		return parent::delete();
	}

	/**
	 * Retrieve the duration of a sound in minutes/seconds/milliseconds.
	 *
	 * @return string
	 */
	public function duration() {
		return floor($this->duration / 60000) . ':' . floor(($this->duration % 60000) / 1000) . ':' . str_pad(floor($this->duration % 1000), 3, '0', STR_PAD_LEFT);
	}

	/**
	 * Retrieve the tags associated with this sound.
	 *
	 * @return User
	 */
	public function tags() {
		return $this->hasMany('SoundTag', 'sound_id');
	}

	/**
	 * Retrieve the date this sound was uploaded.
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
	 * Retrieve the date this sound was last modified.
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
