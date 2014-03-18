<?php

return array(
  'revolver_brand' => 'Revolver',
  'revolver_version_number' => '2.0',
  'revolver_version_name' => 'Pender',
  'revolver_meta_description' => 'Revolver is a media player and scripting platform for Slack and Campfire chat services.',
  'revolver_meta_keywords' => 'revolver, slack, campfire, propane, scripting, bot, chat, papermodelplane',
  'revolver_meta_author' => 'Aaron Draczynski',

  'section_library' => 'Library',
  'section_platform' => 'Platform',
  'section_statistics' => 'Statistics',

  'media_gif' => 'GIF',
  'media_sound' => 'sound',
  'media_video' => 'video',

  'media_gif_plural' => 'GIFs',
  'media_sound_plural' => 'sounds',
  'media_video_plural' => 'videos',

  'media_gif_cap' => 'GIF',
  'media_sound_cap' => 'Sound',
  'media_video_cap' => 'Video',

  'media_gif_plural_cap' => 'GIFs',
  'media_sound_plural_cap' => 'Sounds',
  'media_video_plural_cap' => 'Videos',

  'search_placeholder_gif' => 'Search for a GIF',
  'search_placeholder_sound' => 'Search for a sound',
  'search_placeholder_video' => 'Search for a video',

  'browse_tag_gif' => 'Browse GIFs by tag',
  'browse_tag_sound' => 'Browse sounds by tag',
  'browse_tag_video' => 'Browse videos by tag',
  'no_tags' => 'No one has added any tags yet.',

  'add_new_tag' => 'Add another tag',
  'enter_new_tag' => 'Enter a new tag',

  'media_no_results_heading' => 'Aww, shoot. No results found!',
  'media_no_results_description' => 'Try making your search query less specific.',
  'media_gifs_empty_heading' => 'No one has added any GIFs yet.',
  'media_sounds_empty_heading' => 'No one has added any sounds yet.',
  'media_videos_empty_heading' => 'No one has added any videos yet.',
  'media_empty_description' => 'You should probably get on that. Just drag a file into that box on the lower left.',

  'sort_media_by' => 'Sort by',
  'sort_name_asc' => 'Name, A-Z',
  'sort_name_desc' => 'Name, Z-A',
  'sort_duration_asc' => 'Duration, short to long',
  'sort_duration_desc' => 'Duration, long to short',
  'sort_created_at_asc' => 'Uploaded on, oldest first',
  'sort_created_at_desc' => 'Uploaded on, newest first',

  'created_on' => 'created on',

  'add_to_library' => 'Add to library',
  'upload_drop_instructions' => 'Drag and drop a GIF, sound, or video',
  'upload_save_instructions' => 'Enter a name for your uploaded media. This name is what users will type into Campfire to trigger playback (such as &ldquo;/sound name&rdquo;). Add some tags to your media to make it easier to find in the Revolver library.',

  'confirm_delete_heading' => 'Whoa, do you really want to delete that <span class="replace-media"></span>?',

  'confirm_media_delete_description' => 'The "<span class="replace-name"></span>" <span class="replace-media"></span> will be removed from the library<br /> for all Revolver users in your organization.',
  'confirm_media_delete_yes' => 'Yup, delete forever',
  'confirm_media_delete_no' => 'Only joking trololo',

  'confirm_tag_delete_description' => 'The "<span class="replace-tag"></span>" tag will be removed from any applicable <span class="replace-media-plural"></span><br /> for all Revolver users in your organization.',
  'confirm_tag_delete_yes' => 'Yup, delete this tag',
  'confirm_tag_delete_no' => 'lol just kidding',

  'upload_metadata_name' => 'Name',
  'upload_metadata_name_rules' => 'No spaces or symbols, max 20 chars',
  'upload_metadata_tags' => 'Tags',
  'upload_metadata_tags_rules' => 'No symbols, max 20 chars',
  'upload_metadata_pending' => 'Please wait',
  'upload_metadata_save' => 'Save and upload',
  'upload_metadata_close' => 'Cancel and exit',

  'scripts_empty_heading' => 'No one has added any scripts yet.',
  'scripts_empty_description' => 'You should be the first. Click the button below to get started.',

  'create_new_script' => 'Create new script',
  'import_new_script' => 'Import script',
  'delete_script' => 'Delete this script',

  'script_builder_heading' => 'Script builder',
  'script_builder_notice' => 'This script building tool was rushed for release and will become significantly more robust in the next version.',

  'script_builder_new_message' => 'A new message is posted to',
  'script_builder_new_message_any_room' => 'any Campfire room in your organization',
  'script_builder_new_message_specific_room' => 'a specific Campfire room:',
  'script_builder_campfire_room_id' => 'Campfire room ID #',
  'script_builder_if_message' => 'If the message',
  'script_builder_message_scope_start' => 'starts with',
  'script_builder_message_scope_contains' => 'contains',
  'script_builder_message_scope_exactly' => 'is exactly',
  'script_builder_message_scope_written_by' => 'written by',
  'script_builder_response_type_insert' => 'Insert a new message with this HTML:',
  'script_builder_response_type_insert_note' => 'The original message text is accessible in your HTML as [[message]].',
  'script_builder_replace' => 'Replace',
  'script_builder_response_scope_this' => 'this message',
  'script_builder_response_scope_previous' => 'preceding message',
  'script_builder_replace_with' => 'with this HTML:',
  'script_builder_replace_note' => 'The message text you\'re replacing is accessible in your HTML as [[message]].',
  'script_builder_response_type_post' => 'Post this message to a URL:',
  'script_builder_response_external_callback' => 'And when the server sends a response, replace this message with this HTML:',
  'script_builder_response_type_post_note' => 'The server\'s JSON response is accessible in your HTML via the [[response]] object, i.e. [[response.thing1]] or [[response.thing2]].',
  'script_builder_save' => 'Save script',

  'script_name' => 'Script name',
  'script_description' => 'Script description',

  'system_notice' => 'System notice',
  'helpful_advice' => 'Helpful advice',
  'did_you_know' => 'Did you know?'
);
