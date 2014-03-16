/**
 * Revolver
 * (c) 2014 Aaron Draczynski
 * ================================
 * http://www.papermodelplane.com
 * http://twitter.com/developer
 * ================================
 * Revolver is freely distributed under the GNU General Public License.
 * ================================
 * This copy of the Revolver client script is intended for use with Slack (slack.com).
 * For a Campfire compatible version: http://github.com/aarondraczynski/revolver
 *
 */

// URL to your organization's Revolver web companion, including slash at the end
var base = 'https://www.papermodelplane.net/';

function scrollToBottom() {
  var chat = document.getElementById('msgs_scroller_div');
  chat.scrollTop = chat.scrollHeight;
}

var doPoll;
setTimeout(function() {
  var parse = function() {
    // Grab the last 3 messages from this channel
    $('#col_messages .message_content').slice(-5).each(function() {
      var message = $(this);

      // Inspect messages that haven't been parsed yet
      if (!message.hasClass('parsed-client')) {

        // Determine which media type we're creating
        var text = $.trim(message.text());
        if (text.indexOf('revolver>') == 0 && !message.parents('.modal-body').length) {
          var request = text.split('>'),
              type = request[1];

          switch (type) {
            // Sounds
            case 'sound':

              // If a sound parameter wasn't provided, let's get out of here
              if (request.length < 2) {
                return;
              }

              var urlGiven,
                  sound,
                  soundName,
                  audioElem = $('<audio />');

              if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(request[2])) {
                // User provided a sound URL instead of an existing sound name
                sound = request[2];
                soundName = 'external';
                urlGiven = true;
              } else {
                // User provided a sound name from the Revolver library
                sound = request[2].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                soundName = '"<strong>' + sound + '</strong>"';
              }

              audioElem.bind('loadstart', function() {
                message.html('<span style="color: #888"><em>Loading sound...</em></span>');
              });

              audioElem.bind('waiting', function(e) {
                message.html('<span style="color: #888"><em>Loading sound...</em></span>');
              });

              audioElem.bind('canplay', function() {
                message.html('<span style="color: #4f9707"><em>Playing ' + soundName + ' sound... <a class="pause playing">Pause?</a></em></span>');

                var pause = message.find('.pause');
                pause.click(function() {
                  if (message.find('.playing').length) {
                    pause.html('Resume?');
                    pause.removeClass('playing');
                    audioElem[0].pause();
                  } else {
                    pause.html('Pause?');
                    pause.addClass('playing');
                    audioElem[0].play();
                  }
                });
              });

              audioElem.bind('canplaythrough', function() {
                message.html('<span style="color: #4f9707"><em>Playing ' + soundName + ' sound... <a class="pause playing">Pause?</a></em></span>');

                var pause = message.find('.pause');
                pause.click(function() {
                  if (message.find('.playing').length) {
                    pause.html('Resume?');
                    pause.removeClass('playing');
                    audioElem[0].pause();
                  } else {
                    pause.html('Pause?');
                    pause.addClass('playing');
                    audioElem[0].play();
                  }
                });
              });

              audioElem.bind('error', function(e) {
                message.html('<span style="color: #d5312b"><em>' + soundName + ' isn\'t a valid sound.</em></span>');
              });

              audioElem.bind('ended', function() {
                message.html('<span style="color: #888"><em>Played ' + soundName + ' sound. <a class="replay">Replay?</a></em></span>');

                var replay = message.find('.replay');
                replay.click(function() {
                  if (message.find('.playing').length) {
                    replay.html('Resume?');
                    replay.removeClass('playing');
                    audioElem[0].pause();
                  } else {
                    replay.html('Pause?');
                    replay.addClass('playing');
                    audioElem.attr('currentTime', 0);
                    audioElem[0].play();
                  }
                });
              });

              if (urlGiven) {
                audioElem.attr('src', sound);
              } else {
                audioElem.attr('src', base + 'libraries/user/sounds/' + sound + '.mp3');
              }

              audioElem[0].play();
              break;


            // Videos
            case 'clip':

              // If a video parameter wasn't provided, let's get out of here
              if (request.length < 2) {
                return;
              }

              var urlGiven,
                  video,
                  videoElem = $('<video />'),
                  msg = $('<div />');

              if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(request[2])) {
                // User provided a video URL instead of an existing video name
                video = request[2];
                urlGiven = true;
              } else {
                // User provided a video name from the Revolver library
                video = request[2].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
              }

              videoElem.attr('controls', 'controls').css({
                'margin': '5px 0 0',
                'background': '#000'
              });
              msg.css('padding', '3px 0');

              videoElem.bind('waiting', function(e) {
                msg.html('<span style="color: #888"><em>Loading clip...</em></span>');
              });

              videoElem.bind('canplay', function() {
                videoElem[0].play();
                msg.html('<span style="color: #4f9707"><em>Playing clip...</em></span>');
              });

              videoElem.bind('canplaythrough', function() {
                videoElem[0].play();
                msg.html('<span style="color: #4f9707"><em>Playing clip...</em></span>');
              });

              videoElem.bind('error', function(e) {
                msg.html('<span style="color: #d5312b"><em>You dun goofed.</em> [' + videoElem[0].error.code + ']</span>');
              });

              videoElem.bind('ended', function() {
                msg.html('<span style="color: #888"><em><a class="collapse">Collapse from view</a>.</em></span>');

                var collapse = msg.find('.collapse');
                collapse.click(function() {
                  videoElem.parent().html('<span style="color: #888"><em>Clip removed.</em></span>');
                  videoElem.remove();
                  msg.css('padding', '2px 0 1px');
                });
              });

              message.html('');
              videoElem.attr({
                'width': 480,
                'height': 320,
                'preload': 'auto',
                'autoplay': true
              }).appendTo(message);
              msg.appendTo(message);

              if (urlGiven) {
                videoElem.attr('src', video);
                videoElem[0].load();
                videoElem[0].play();

                scrollToBottom();
              } else {
                // Retrieve the correct extension for this video from the Revolver library
                $.ajax({
                  url: base + 'a/library/videos/lookup/' + video,
                  dataType: 'json'
                }).done(function(response) {
                  videoExtension = response.extension;

                  videoElem.attr('src', base + 'libraries/user/videos/' + video + '.' + videoExtension);
                  videoElem[0].load();
                  videoElem[0].play();

                  scrollToBottom();
                }).fail(function() {
                  msg.html('<span style="color: #d5312b"><em>Couldn\'t fetch that video.</em></span>');
                });
              }
              break;


            // Combos
            case 'combo':

              // If a GIF and sound parameter weren't provided, let's get out of here
              if (request.length < 2) {
                return;
              }

              var gif = request[2].substring(0, request[2].indexOf(' ')),
                  preload = $('<img />'),
                  imageElem = $('<img />'),
                  audioElem = $('<audio />'),
                  msg = $('<div />'),
                  sound = request[2].substr(request[2].indexOf(' ') + 1),
                  soundDelay = 500;

              // Calculate sound delay, if provided
              if (sound.indexOf('|') != -1) {
                sound = sound.substring(0, sound.indexOf('|'));
                soundDelay = parseInt(sound.substr(sound.indexOf('|') + 1)) * 1000;
                // No sound delay greater than 10 seconds
                if (soundDelay > 10000) {
                  soundDelay = 10000;
                }
              }

              preload.css({
                'width': 0,
                'height': 0,
                'display': 'none'
              }).attr('src', gif);

              imageElem.css({
                'max-width': '480px',
                'height': '100px',
                'margin': '5px 0 0'
              }).attr('src', base + 'libraries/combo-preload.gif');

              message.html('');
              preload.appendTo(message);
              imageElem.appendTo(message);
              msg.appendTo(message);

              audioElem.bind('canplay', function() {
                audioElem[0].pause();
                audioElem.attr('currentTime', 0);
              });

              audioElem.bind('canplaythrough', function() {
                audioElem[0].pause();
                audioElem.attr('currentTime', 0);
                msg.addClass('sound-ready');
                if (msg.hasClass('image-ready')) {
                  msg.css('padding', '5px 0 3px');

                  imageElem.css({
                    'height': 'auto',
                    'margin': '5px 0 3px'
                  }).attr('src', preload.attr('src'));

                  preload.remove();
                  scrollToBottom();

                  setTimeout(function() {
                    audioElem[0].play();
                    scrollToBottom();
                  }, soundDelay);

                  setTimeout(function() {
                    scrollToBottom();
                  }, 750);

                  msg.html('<span style="color: #4f9707"><em>Playing combo... <a class="pause playing">Pause sound?</a></em></em></span>');

                  var pause = message.find('.pause');
                  pause.click(function() {
                    if (message.find('.playing').length) {
                      pause.html('Resume?');
                      pause.removeClass('playing');
                      audioElem[0].pause();
                    } else {
                      pause.html('Pause?');
                      pause.addClass('playing');
                      audioElem[0].play();
                    }
                  });
                }
              });

              audioElem.bind('empty', function(e) {
                msg.innerHTML = '<span style="color: #d5312b"><em>Why are you closed?!?</em></span>';
              });

              audioElem.bind('error', function(e) {
                msg.css('padding', '6px 0 3px');
                imageElem.attr('src', base + 'libraries/combo-error.gif');
                msg.html('<span style="color: #d5312b"><em>"<strong>' + sound + '</strong>" isn\'t a valid sound.</em></span>');
              });

              audioElem.bind('dataunavailable', function(e) {
                msg.html('<span style="color: #d5312b"><em>Not my chair, not my problem.</em></span>');
              });

              audioElem.bind('ended', function() {
                msg.html('<span style="color: #888"><em>Played "<strong>' + sound + '</strong>" combo. <a class="replay">Replay</a> or <a class="combo_breaker">collapse from view</a>?</a></em></span>');

                var replay = message.find('.replay'),
                    collapse = message.find('.combo_breaker');

                replay.click(function() {
                  if (message.find('.playing').length) {
                    replay.html('Resume');
                    replay.removeClass('playing');
                    audioElem[0].pause();
                  } else {
                    replay.html('Pause');
                    replay.addClass('playing');
                    audioElem.attr('currentTime', 0);
                    audioElem[0].play();
                  }
                });

                collapse.click(function() {
                  audioElem[0].pause();
                  audioElem.attr('src', '');
                  imageElem.parent().html('<span style="color: #888"><em>Combo removed.</em></span>');
                  preload.remove();
                  msg.css('padding', '2px 0 1px');
                });

                audioElem[0].pause();
                audioElem.attr('currentTime', 0);

                audioElem.remove();
              });

              audioElem.attr('src', base + 'libraries/user/sounds/' + sound + '.mp3');

              preload.bind('load', function(e) {
                msg.addClass('image-ready');
                if (msg.hasClass('sound-ready')) {
                  msg.css('padding', '5px 0 3px');

                  imageElem.css({
                    'height': 'auto',
                    'margin': '5px 0 3px'
                  }).attr('src', preload.attr('src'));

                  preload.remove();
                  scrollToBottom();

                  setTimeout(function() {
                    audioElem[0].play();
                    scrollToBottom();
                  }, soundDelay);

                  setTimeout(function() {
                    scrollToBottom();
                  }, 750);

                  msg.html('<span style="color: #4f9707"><em>Playing combo... <a class="pause playing">Pause sound?</a></em></em></span>');

                  var pause = message.find('.pause');
                  pause.click(function() {
                    if (message.find('.playing').length) {
                      pause.html('Resume?');
                      pause.removeClass('playing');
                      audioElem[0].pause();
                    } else {
                      pause.html('Pause?');
                      pause.addClass('playing');
                      audioElem[0].play();
                    }
                  });
                }
              });
              scrollToBottom();
              break;

          }
        }

        // Mark this message as parsed
        $(this).addClass('parsed-client');
      }
    });
  };

  var doParse = setInterval(parse, 1500);

  var fetch = function() {
    // Remove existing payload
    clearInterval(doPoll);
    $('#revolver-payload').remove();

    // Assemble script object
    var payloadTag = document.createElement('script');
    payloadTag.id = 'revolver-payload';
    payloadTag.type = 'text/javascript';
    payloadTag.src = base + 'libraries/payload-slack.js?' + Math.floor(Math.random() * 1E10);

    // Insert new payload
    $('body').append(payloadTag);
  };

  var doFetch = setInterval(fetch, 15000);
  fetch();
}, 3000);