<?php

$twitterapi_url = 'https://api.twitter.com/1/statuses/oembed.json?url=';

$twitterapi_url = $twitterapi_url . $_GET['url'];

$curl = curl_init($twitterapi_url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($curl);
curl_close($curl);

$json_content = json_decode($response, true);
$html = $json_content['html'];
$html = str_replace('<a', '<a target="_blank"', $html);

echo $html;