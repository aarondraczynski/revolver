<?php

class PlatformController extends BaseController {

  /**
   * Return all scripts.
   *
   * @return JSON
   */
  public function getScripts() {
    $scripts = Script::orderBy('id', 'asc')->get();
    $response = array();

    // Generate JSON data for all scripts
    foreach ($scripts as $script) {

      // Build script metadata
      $response[] = array(
        'id'               => 'script-' . $script->id,
        'active'           => $script->active,
        'protected'        => $script->protected,
        'name'             => $script->name,
        'description'      => $script->description,
        'created_at'       => $script->created_at(),
        'created_at_short' => $script->created_at(true)
      );
    }

    return Response::json($response);
  }

  /**
   * Create a new script.
   *
   * @return JSON
   */
  public function add() {
    $rules = array(
      'message_scope'         => 'required',
      'message_match'         => 'required|min:3',
      // 'room_scope_number'     => 'numeric',
      // 'response_type'         => 'required',
      // 'response_external_url' => 'url',
      'script_name'           => 'required|min:5|max:30',
      'script_description'    => 'required|min:5|max:255'
    );

    // Validate script input data
    $input = Input::all();
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Create new script record
      $script = new Script;
      $script->active = 1;
      $script->protected = 0;
      $script->name = Input::get('script_name');
      $script->description = Input::get('script_description');
      $script->save();

      $id = $script->id;
      $name = $script->name;

      // Escape slashes in supplied match string
      $match = Input::get('message_match');
      $match = addslashes($match);
      $match = preg_replace('/\//', '\/', $match);

      switch (Input::get('message_scope')) {
        case 'message-scope-start':
          $output = "if (msgs[i].innerHTML.match(/^" . $match . "/)) {";
          break;
        case 'message-scope-contains':
          $output = "if (msgs[i].innerHTML.match(/" . $match . "/)) {";
          break;
        case 'message-scope-exactly':
          $output = "if (msgs[i].innerHTML.match(/^" . $match . "$/)) {";
          break;
      }

      // switch (Input::get('response_type')) {
      //   case 'response-type-insert':
      //     break;
      //   case 'response-type-replace':
          if (Input::get('response_scope') == 'response-scope-previous') {
            $markup = str_replace("'", "\'", Input::get('response_replace_html'));
            $markup = preg_replace('/\[\[message\]\]/', '\' + msgs[i - 1].innerHTML + \'', $markup);
            $output .= "msgs[i - 1].innerHTML = '" . $markup . "';";
          } else {
            $markup = str_replace("'", "\'", Input::get('response_replace_html'));
            $markup = preg_replace('/\[\[message\]\]/', '\' + msgs[i].innerHTML + \'', $markup);
            $output .= "msgs[i].innerHTML = '" . $markup . "';";
          }
      //     break;
      //   case 'response-type-post':
      //     break;
      // }

      $output .= '}';

      // Write script file
      $file = fopen('libraries/user/scripts/' . $script->id . '.js', 'w');
      fwrite($file, $output);
      fclose($file);

      // Script was successfully created, return success message
      return Response::json(array(
        'success' => $id,
        'name'    => $name
      ));
    }

    // Return validation failure message
    return Response::json($validator->messages());
  }

  /**
   * Edit a script's metadata.
   *
   * @return JSON
   */
  public function update() {
    $input = Input::all();
    $rules = array(
      'id'     => 'required|numeric',
      'active' => 'required|numeric|min:0|max:1'
    );

    // Validate input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Retrieve script record
      $script = Script::find(Input::get('id'));
      $script->active = Input::get('active');

      if ($script->save()) {
        // Return success message
        return Response::json(array('success' => 1));
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
   * Delete a script.
   *
   * @return JSON
   */
  public function delete() {
    $input = Input::all();
    $rules = array(
      'id' => 'required|numeric'
    );

    // Validate input data
    $validator = Validator::make($input, $rules);
    if ($validator->passes()) {

      // Retrieve matching script
      $id = Input::get('id');
      $script = Script::find($id);
      $name = $script->name;

      // Delete script record
      if ($script->delete()) {

        // Delete script file
        $delete = unlink('libraries/user/scripts/' . $id . '.js');

        // Return success message
        return Response::json(array(
          'success' => 1,
          'name'    => $name
        ));
      } else {
        // Return deletion error message
        return Response::json(array('error' => 'Something went wrong while deleting that script.'));
      }
    } else {
      // Return validation failure message
      return Response::json($validator->messages());
    }
  }

  /**
   * Build an updated payload.
   *
   * @return
   */
  public function build() {
    $scripts = Script::orderBy('name', 'asc')->get();
    $response = array();

    // Beginning of payload consists of class helper functions and text formatting replacement rules
    $output = "function hasClass(elem,name){return(new RegExp(\"(\\s|^)\"+name+\"(\\s|$)\")).test(elem.className)}function addClass(elem,name){if(!hasClass(elem,name))elem.className+=(elem.className?\" \":\"\")+name}function removeClass(elem,name){if(hasClass(elem,name))elem.className=elem.className.replace(new RegExp(\"(\\s|^)\"+name+\"(\\s|$)\"),\" \").replace(/^\s+|\s+$/g,\"\")}var Showdown={};
Showdown.converter=function(){this.makeHtml=function(text){text=_DoItalicsAndBold(text);return text};var _DoItalicsAndBold=function(text){text=text.replace(/&lt;brooklynkid&gt;(.*?)&lt;\/brooklynkid&gt;/,'<strong style=\"font-family: Brooklyn Kid, BrooklynKid, sans-serif; font-size: 25px; font-weight: normal; color: navy\">$1</strong>');text=text.replace(/&lt;cooper&gt;(.*?)&lt;\/cooper&gt;/,'<strong style=\"font-family: Cooper Black, sans-serif; font-size: 30px; font-weight: normal\">$1</strong>');text=
text.replace(/&lt;courier&gt;(.*?)&lt;\/courier&gt;/,'<strong style=\"font-family: Courier New, Courier, sans-serif; font-size: 18px; font-weight: normal\">$1</strong>');text=text.replace(/&lt;comicsans&gt;(.*?)&lt;\/comicsans&gt;/,'<strong style=\"font-family: Comic Sans MS, Comic Sans, sans-serif; font-size: 18px; font-weight: normal; color: purple\">$1</strong>');text=text.replace(/&lt;impact&gt;(.*?)&lt;\/impact&gt;/,'<strong style=\"font-family: Impact, sans-serif; font-size: 20px; font-weight: normal; text-transform: uppercase\">$1</strong>');
text=text.replace(/&lt;papyrus&gt;(.*?)&lt;\/papyrus&gt;/,'<strong style=\"font-family: Papyrus, sans-serif; font-size: 20px; font-weight: normal; color: #35bc4b\">$1</strong>');text=text.replace(/&lt;giantest&gt;(.*?)&lt;\/giantest&gt;/,'<strong style=\"font-size: 180px; font-weight: normal\">$1</strong>');text=text.replace(/&lt;gianter&gt;(.*?)&lt;\/gianter&gt;/,'<strong style=\"font-size: 110px; font-weight: normal\">$1</strong>');text=text.replace(/&lt;giant&gt;(.*?)&lt;\/giant&gt;/,'<strong style=\"font-size: 60px; font-weight: normal\">$1</strong>');
text=text.replace(/&lt;tiny&gt;(.*?)&lt;\/tiny&gt;/,'<strong style=\"font-size: 4px; font-weight: normal\">$1</strong>');text=text.replace(/&lt;red&gt;(.*?)&lt;\/red&gt;/,'<strong style=\"font-weight: normal; color: red\">$1</strong>');text=text.replace(/&lt;blue&gt;(.*?)&lt;\/blue&gt;/,'<strong style=\"font-weight: normal; color: blue\">$1</strong>');text=text.replace(/&lt;green&gt;(.*?)&lt;\/green&gt;/,'<strong style=\"font-weight: normal; color: green\">$1</strong>');text=text.replace(/&lt;spoilers&gt;(.*?)&lt;\/spoilers&gt;/,
'Spoiler: <strong class=\"spoiler\" style=\"padding: 4px 3px; background: #444; font-weight: normal; color: #444; user-select: none; -webkit-user-select: none\">$1</strong>');text=text.replace(/&lt;spoiler&gt;(.*?)&lt;\/spoiler&gt;/,'Spoiler: <strong class=\"spoiler\" style=\"padding: 4px 3px; background: #444; font-weight: normal; color: #444; user-select: none; -webkit-user-select: none\">$1</strong>');text=text.replace(/&lt;marquee&gt;(.*?)&lt;\/marquee&gt;/,\"<marquee>$1</marquee>\");text=text.replace(/&lt;strike&gt;(.*?)&lt;\/strike&gt;/,
\"<strike>$1</strike>\");text=text.replace(/&lt;del&gt;(.*?)&lt;\/del&gt;/,\"<strike>$1</strike>\");text=text.replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/,\"<strong>$1</strong>\");text=text.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/,\"<strong>$1</strong>\");text=text.replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/,\"<em>$1</em>\");text=text.replace(/&lt;i&gt;(.*?)&lt;\/i&gt;/,\"<em>$1</em>\");return text}};var msgs=document.querySelectorAll('.text_message div.body,.tweet_message div.body');for(var i=0;i<msgs.length;i++){if(!msgs[i].hasAttribute('data-parsed')&&!msgs[i].hasAttribute('data-iftl')){var old=msgs[i].innerHTML;";

    // Retrieve all scripts with an active status
    $scripts = Script::where('active', '=', 1)->where('name', '!=', 'Text formatting')->orderBy('id', 'asc')->get();
    $script_ids = array();

    // Build an array of all active script IDs
    foreach ($scripts as $script) {
      $script_ids[] = array(
        'id'        => $script->id,
        'protected' => $script->protected
      );
    }

    // Retrieve script contents and append to payload output
    for ($i = 0; $i < count($script_ids); $i++) {
      if ($script_ids[$i]['protected'] == 1) {
        $file = fopen('libraries/revolver/scripts/' . $script_ids[$i]['id'] . '.js', 'rb');
      } else {
        $file = fopen('libraries/user/scripts/' . $script_ids[$i]['id'] . '.js', 'rb');
      }
      $output .= stream_get_contents($file);
      fclose($file);
    }

    // End of payload applies text formatting
    $output .= "var cvt=new Showdown.converter(),out=cvt.makeHtml(msgs[i].innerHTML);msgs[i].innerHTML=out;msgs[i].innerHTML=out;msgs[i].setAttribute('data-parsed','true');}}";

    // Write payload file
    $payload = fopen('libraries/payload.js', 'w');
    fwrite($payload, $output);
    fclose($payload);
  }

}
