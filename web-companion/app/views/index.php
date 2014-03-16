<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js ie6"> <![endif]-->
<!--[if IE 7]>         <html class="no-js ie7"> <![endif]-->
<!--[if IE 8]>         <html class="no-js ie8"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <!--[if IE]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <![endif]-->

  <title><?= $messages['revolver_brand'] ?></title>
  <meta name="description" content="<?= $messages['revolver_meta_description'] ?>">
  <meta name="keywords" content="<?= $messages['revolver_meta_keywords']?>">
  <meta name="author" content="<?= $messages['revolver_meta_author'] ?>">
  <meta name="robots" content="noindex,nofollow">

  <!--[if lt IE 9]> 
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:400|Lato:300,400,700|Gochi+Hand">
  <script data-main="/js/modules.js" src="/js/init.js"></script>
</head>
<body>
  <script type="text/x-handlebars">
    <div id="revolver">
      <? include_once('header.html') ?>

      <div id="main" class="clearfix" role="main">
        <div class="wrapper">
          {{outlet main}}
        </div>
      </div>

      <input type="hidden" id="csrf_token" name="csrf_token" value="<?php echo csrf_token(); ?>">

      <? include_once('footer.html') ?>
    </div>

    <? include_once('notification.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library">
    <? include_once('library/nav.html') ?>

    <? include_once('library/index.html') ?>

    <? include_once('library/modal_confirm_tag_delete.html') ?>

    <? include_once('library/modal_confirm_media_delete.html') ?>

    <? include_once('library/upload_metadata_form.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_sounds">
    <? include_once('library/sounds.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_sound_tags">
    <? include_once('library/sound_tags.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_gifs">
    <? include_once('library/gifs.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_gif_tags">
    <? include_once('library/gif_tags.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_videos">
    <? include_once('library/videos.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="library_video_tags">
    <? include_once('library/video_tags.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="platform">
    <? include_once('platform/index.html') ?>
  </script>

  <script type="text/x-handlebars" data-template-name="platform_build">
    <? include_once('platform/build.html') ?>
  </script>

  <? include_once('debug.html') ?>

  <script>
    //(function(c,a){window.mixpanel=a;var b,d,h,e;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.1.min.js';d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d);a._i=[];a.init=function(b,c,f){function d(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?g=a[f]=[]:f="mixpanel";g.people=g.people||[];h="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");for(e=0;e<h.length;e++)d(g,h[e]);a._i.push([b,c,f])};a.__SV=1.1})(document,window.mixpanel||[]);mixpanel.init("0670d4b93da96ce8ec342d2c7b5d053c");
    //var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-1990761-13']);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();
  </script>
</body>
</html>