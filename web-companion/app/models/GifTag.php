<?php

use Illuminate\Support\Facades\URL;

class GifTag extends Eloquent {

	/**
	 * Delete a tag.
	 *
	 * @return bool
	 */
	public function delete() {
		return parent::delete();
	}

	/**
	 * Retrieve parent data for the attached GIF.
	 *
	 * @return Sound
	 */
	public function sounds() {
		return $this->hasMany('Gif', 'id');
	}

	/**
	 * Retrieve the date this tag was created.
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
	 * Retrieve the date this tag was last modified.
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
