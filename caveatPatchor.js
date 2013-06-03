/**
 * Revolver
 * (c) 2013 Aaron Draczynski
 * ================================
 * http://www.papermodelplane.com
 * http://twitter.com/developer
 * ================================
 * Revolver is freely distributed under the GNU General Public License.
 * ================================
 * This file goes into your /Users/youraccount/Library/Application Support/Propane/unsupported/ folder.
 * Change the address on line 16 ("base") to the URL where Revolver is installed for your organization.
 * Restart Propane after installing or removing this script.
 *
 */

var base = 'http://www.papermodelplane.net/',
    volume = true;

Campfire.Revolver = Class.create({
  process: function(q) {
    if (!q.pending() && q.kind === 'text') {
      var body = q.bodyElement(),
          text = body.innerText,
          first = text.substring(0, text.indexOf(' ')),
          urlOverride = false,
          library = base + 'libraries/',
          soundPath = library + 'user/sounds/',
          videoPath = library + 'user/videos/';

      if (first === '/gif') {
        body.setAttribute('data-iftl', 'true');

        var gif = text.substring((text.indexOf(' ') + 1), text.length).replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
            imageElem = document.createElement('img'),
            msg = document.createElement('div');

        msg.style.padding = '6px 0 3px';
        imageElem.style.maxWidth = '480px';
        imageElem.style.margin = '0 0 3px';

        var request = new XMLHttpRequest,
            url = base + 'a/library/gifs/lookup/' + gif,
            remoteName;

        request.open('GET', url, false);
        request.onload = function() {
          body.innerHTML = 'onload';
          var response = JSON.parse(request.responseText);
          if (response.error) {
            body.innerHTML = '<span style="color: #d5312b"><em>"<strong>' + gif + '</strong>" isn\'t a valid GIF.</em></span>';
            return;
          }
          remoteName = response.remote_name;

          imageElem.src = 'http://i.imgur.com/' + remoteName + '.gif';
          msg.innerHTML = '<span style="color: #888"><em><a class="collapse">Collapse from view</a>.</em></span>';

          body.innerHTML = '';
          body.appendChild(imageElem);

          imageElem.addEventListener('load', function(e) {
            body.appendChild(msg);

            var collapse = body.querySelector('.collapse');
            collapse.addEventListener('click', function() {
              imageElem.parentNode.innerHTML = '<span style="color: #888"><em>GIF removed.</em></span>';
              body.removeChild(imageElem);
              msg.style.padding = '2px 0 1px';
            });
          });
        };
        request.onerror = function(e) {
          body.innerHTML = '<span style="color: #d5312b"><em>"<strong>' + gif + '</strong>" isn\'t a valid GIF.</em></span>';
        };
        request.send();
      }

      if (first === '/sound' && volume === true) {
        body.setAttribute('data-iftl', 'true');

        var sound,
            soundDisplay,
            link = body.querySelector('a');

        if (link !== null) {
          sound = '';
          soundPath = link.getAttribute('href');
          soundDisplay = 'external';
          urlOverride = true;
        } else {
          sound = text.substring(7, text.length).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          soundDisplay = '"<strong>' + sound + '</strong>"';
        }

        var audioElem = document.createElement('audio');

        audioElem.addEventListener('loadstart', function() {
          body.innerHTML = '<span style="color: #888"><em>Loading sound...</em></span>';
        }, true);

        audioElem.addEventListener('waiting', function(e) {
          body.innerHTML = '<span style="color: #888"><em>Loading sound...</em></span>';
        }, true);

        audioElem.addEventListener('canplay', function() {
          body.innerHTML = '<span style="color: #4f9707"><em>Playing ' + soundDisplay + ' sound... <a class="pause">Pause?</a></em></span>';

          var pause = body.querySelector('.pause');
          pause.addEventListener('click', function() {
            if (pause.getAttribute('data-paused') == 'true') {
              pause.innerHTML = 'Pause?';
              pause.setAttribute('data-paused', 'false');
              audioElem.play();
            } else {
              pause.innerHTML = 'Resume?';
              pause.setAttribute('data-paused', 'true');
              audioElem.pause();
            }
          }, false);
        }, true);

        audioElem.addEventListener('canplaythrough', function() {
          body.innerHTML = '<span style="color: #4f9707"><em>Playing ' + soundDisplay + ' sound... <a class="pause">Pause?</a></em></span>';

          var pause = body.querySelector('.pause');
          pause.addEventListener('click', function() {
            if (pause.getAttribute('data-paused') == 'true') {
              pause.innerHTML = 'Pause?';
              pause.setAttribute('data-paused', 'false');
              audioElem.play();
            } else {
              pause.innerHTML = 'Resume?';
              pause.setAttribute('data-paused', 'true');
              audioElem.pause();
            }
          }, false);
        }, true);

        audioElem.addEventListener('empty', function(e) {
          body.innerHTML = '<span style="color: #d5312b"><em>Why are you closed?!?</em></span>';
        }, true);

        audioElem.addEventListener('error', function(e) {
          body.innerHTML = '<span style="color: #d5312b"><em>' + soundDisplay + ' isn\'t a valid sound.</em></span>';
        }, true);

        audioElem.addEventListener('suspend', function(e) {
          body.innerHTML = '<span style="color: #d5312b"><em>Consequences will never be the same.</em></span>';
        }, true);

        audioElem.addEventListener('dataunavailable', function(e) {
          body.innerHTML = '<span style="color: #d5312b"><em>Not my chair, not my problem.</em></span>';
        }, true);

        audioElem.addEventListener('ended', function() {
          body.innerHTML = '<span style="color: #888"><em>Played ' + soundDisplay + ' sound. <a class="replay">Replay?</a></em></span>';

          var replay = body.querySelector('.replay');
          replay.addEventListener('click', function() {
            replay.innerHTML = 'Pause?';
            replay.setAttribute('class', 'pause');

            var pause = body.querySelector('.pause');
            pause.addEventListener('click', function() {
              if (pause.getAttribute('data-paused') == 'true') {
                pause.innerHTML = 'Pause?';
                pause.setAttribute('data-paused', 'false');
                audioElem.play();
              } else {
                pause.innerHTML = 'Resume?';
                pause.setAttribute('data-paused', 'true');
                audioElem.pause();
              }
            }, false);
  
            audioElem.currentTime = 0;
            audioElem.play();
          }, false);

          audioElem.pause();
          audioElem.currentTime = 0;

          var parent = audioElem.parentNode;
          parent.removeChild(audioElem);
        }, true);

        audioElem.src = soundPath + sound;

        if (urlOverride === false) {
          audioElem.src += '.mp3';
        }

        audioElem.play();
      } else if (first === '/sound' && volume === false) {
        body.innerHTML = '<span style="color: #888">Played a sound. If you turned off <strong>/mute</strong>, you would\'ve heard it.</span>';
      }

      if ((first === '/video' || first === '/clip') && volume === true) {
        body.setAttribute('data-iftl', 'true');

        var video,
            link = body.querySelector('a');

        if (link !== null) {
          video = '';
          videoPath = link.getAttribute('href');
          urlOverride = true;
        } else {
          video = text.substring((text.indexOf(' ') + 1), text.length).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }

        var videoElem = document.createElement('video'),
            msg = document.createElement('div');

        msg.style.padding = '6px 0 3px';
        videoElem.style.margin = '0 0 3px';
        videoElem.style.background = 'black';
        videoElem.setAttribute('controls', 'controls');

        videoElem.addEventListener('waiting', function(e) {
          msg.innerHTML = '<span style="color: #888"><em>Loading clip...</em></span>';
        }, true);

        videoElem.addEventListener('canplay', function() {
          videoElem.play();
          msg.innerHTML = '<span style="color: #4f9707"><em>Playing clip...</em></span>';
        }, true);

        videoElem.addEventListener('canplaythrough', function() {
          videoElem.play();
          msg.innerHTML = '<span style="color: #4f9707"><em>Playing clip...</em></span>';
        }, true);

        videoElem.addEventListener('error', function(e) {
          msg.innerHTML = '<span style="color: #d5312b"><em>You dun goofed.</em> [' + videoElem.error.code + ']</span>';
        }, true);

        videoElem.addEventListener('ended', function() {
          msg.innerHTML = '<span style="color: #888"><em><a class="collapse">Collapse from view</a>.</em></span>';

          var collapse = msg.querySelector('.collapse');
          collapse.addEventListener('click', function() {
            videoElem.parentNode.innerHTML = '<span style="color: #888"><em>Clip removed.</em></span>';
            body.removeChild(videoElem);
            msg.style.padding = '2px 0 1px';
          }, false);
        }, true);

        videoElem.setAttribute('width', 480);
        videoElem.setAttribute('height', 320);

        body.innerHTML = '';
        body.appendChild(videoElem, body.firstChild);
        body.appendChild(msg);

        videoElem.src = videoPath + video;

        if (urlOverride === false) {
          var request = new XMLHttpRequest,
              url = base + 'a/library/videos/lookup/' + video,
              videoExtension = '.mp4';

          request.open('GET', url, false);
          request.onload = function() {
            var response = JSON.parse(request.responseText);
            videoExtension = response.extension;

            videoElem.src += '.' + videoExtension;
            videoElem.setAttribute('preload', 'auto');
            videoElem.setAttribute('autoplay', true);
            videoElem.load();
            videoElem.play();
          };
          request.onerror = function() {
          };
          request.send();
        } else {
          videoElem.setAttribute('preload', 'auto');
          videoElem.setAttribute('autoplay', true);
          videoElem.load();
          videoElem.play();
        }

        window.scrollTo(0, document.body.scrollHeight);
      } else if ((first === '/video' || first === '/clip') && volume === false) {
        body.innerHTML = '<span style="color: #888"><em>Played a clip. If you turned off <strong>/mute</strong>, you would\'ve seen it.</em></span>';
      }

      if (first === '/combo' && volume === true) {
        body.setAttribute('data-iftl', 'true');

        var link = body.querySelector('a'),
            gif = link.getAttribute('href'),
            preload = document.createElement('img'),
            imageElem = document.createElement('img'),
            audioElem = document.createElement('audio'),
            msg = document.createElement('div'),
            sound = text.substr(text.lastIndexOf(' ') + 1),
            soundDelay = 500;

        if (text.indexOf('|') != -1) {
          sound = text.substring(text.lastIndexOf(' ') + 1, text.indexOf('|'));
          soundDelay = parseInt(text.substr(text.indexOf('|') + 1)) * 1000;
          if (soundDelay > 10000) {
            soundDelay = 10000;
          }
        }

        preload.style.width = 0;
        preload.style.height = 0;
        preload.style.display = 'none';
        preload.src = gif;

        imageElem.style.maxWidth = '480px';
        imageElem.style.height = '100px';
        imageElem.src = library + 'combo-preload.gif';

        body.innerHTML = '';
        body.appendChild(preload, body.firstChild);
        body.appendChild(imageElem, body.firstChild);
        body.appendChild(msg);

        audioElem.addEventListener('canplay', function() {
          audioElem.pause();
          audioElem.currentTime = 0;
        }, true);

        audioElem.addEventListener('canplaythrough', function() {
          audioElem.pause();
          audioElem.currentTime = 0;
          msg.setAttribute('data-sound-ready', 1);
          if (msg.hasAttribute('data-image-ready')) {
            msg.style.padding = '6px 0 3px';

            imageElem.style.height = 'auto';
            imageElem.style.margin = '0 0 3px';
            imageElem.src = preload.src;

            body.removeChild(preload);
            window.scrollTo(0, document.body.scrollHeight);

            setTimeout(function() {
              audioElem.play();
              window.scrollTo(0, document.body.scrollHeight);
            }, soundDelay);

            msg.innerHTML = '<span style="color: #4f9707"><em>Playing combo... <a class="pause">Pause sound?</a></em></em></span>';

            var pause = msg.querySelector('.pause');
            pause.addEventListener('click', function() {
              if (pause.getAttribute('data-paused') == 'true') {
                pause.innerHTML = 'Pause sound?';
                pause.setAttribute('data-paused', 'false');
                audioElem.play();
              } else {
                pause.innerHTML = 'Resume sound?';
                pause.setAttribute('data-paused', 'true');
                audioElem.pause();
              }
            }, false);
          }
        }, true);

        audioElem.addEventListener('empty', function(e) {
          msg.innerHTML = '<span style="color: #d5312b"><em>Why are you closed?!?</em></span>';
        }, true);

        audioElem.addEventListener('error', function(e) {
          msg.style.padding = '6px 0 3px';
          imageElem.src = library + 'combo-error.gif';
          msg.innerHTML = '<span style="color: #d5312b"><em>"<strong>' + sound + '</strong>" isn\'t a valid sound.</em></span>';
        }, true);

        audioElem.addEventListener('suspend', function(e) {
          msg.innerHTML = '<span style="color: #d5312b"><em>Consequences will never be the same.</em></span>';
        }, true);

        audioElem.addEventListener('dataunavailable', function(e) {
          msg.innerHTML = '<span style="color: #d5312b"><em>Not my chair, not my problem.</em></span>';
        }, true);

        audioElem.addEventListener('ended', function() {
          msg.innerHTML = '<span style="color: #888"><em>Played "<strong>' + sound + '</strong>" combo. <a class="replay">Replay</a> or <a class="combo_breaker">collapse from view</a>?</a></em></span>';

          var replay = body.querySelector('.replay'),
              collapse = body.querySelector('.combo_breaker');

          replay.addEventListener('click', function() {
            audioElem.currentTime = 0;
            audioElem.play();
          }, false);

          collapse.addEventListener('click', function() {
            audioElem.pause();
            audioElem.src = '';
            imageElem.parentNode.innerHTML = '<span style="color: #888"><em>Combo removed.</em></span>';
            body.removeChild(preload);
            msg.style.padding = '2px 0 1px';
          });

          audioElem.pause();
          audioElem.currentTime = 0;

          var parent = audioElem.parentNode;
          parent.removeChild(audioElem);
        }, true);

        audioElem.src = soundPath + sound + '.mp3';

        preload.addEventListener('load', function(e) {
          msg.setAttribute('data-image-ready', 1);
          if (msg.hasAttribute('data-sound-ready')) {
            msg.style.padding = '6px 0 3px';

            imageElem.style.height = 'auto';
            imageElem.style.margin = '0 0 3px';
            imageElem.src = preload.src;

            body.removeChild(preload);
            window.scrollTo(0, document.body.scrollHeight);

            setTimeout(function() {
              audioElem.play();
              window.scrollTo(0, document.body.scrollHeight);
            }, soundDelay);

            msg.innerHTML = '<span style="color: #4f9707"><em>Playing combo... <a class="pause">Pause sound?</a></em></em></span>';

            var pause = msg.querySelector('.pause');
            pause.addEventListener('click', function() {
              if (pause.getAttribute('data-paused') == 'true') {
                pause.innerHTML = 'Pause sound?';
                pause.setAttribute('data-paused', 'false');
                audioElem.play();
              } else {
                pause.innerHTML = 'Resume sound?';
                pause.setAttribute('data-paused', 'true');
                audioElem.pause();
              }
            }, false);
          }
        }, false);
        window.scrollTo(0, document.body.scrollHeight);
      } else if (first === '/combo ' && volume === false) {
        body.innerHTML = '<span style="color: #888"><em>Played a combo. If you turned off <strong>/mute</strong>, you would\'ve seen it.</em></span>';
      }

      if (first === '/mute') {
        body.setAttribute('data-iftl', 'true');
        if (Element.hasClassName(q.element, 'you')) {
          if (volume === false) {
            volume = true;
            body.innerHTML = '<span style="color: #4b49bc"><em>You just turned mute <strong>on</strong>.</em></span>';
          } else {
            volume = false;
            body.innerHTML = '<span style="color: #4b49bc"><em>You just turned mute <strong>off</strong>.</em></span>';
          }
        } else {
          body.innerHTML = '<span style="color: #4b49bc"><em>Just toggled their mute setting.</em></span>';
        }
      }
    }
  },

  onMessagesInserted: function(q) {
    for (var i = 0; i < q.length; i++) {
      this.process(q[i]);
    }

    var payload = document.querySelector('#iftl-init'),
        script = document.createElement('script');

    if (payload !== null) {
      payload.parentNode.removeChild(payload);
    }

    script.setAttribute('src', base + 'libraries/payload.js?' + Math.floor(Math.random() * 1E10));
    script.setAttribute('id', 'iftl-init');

    document.body.appendChild(script);
  },

  onMessageAccepted: function(q, r) {
    this.process(q);

    var payload = document.querySelector('#iftl-init'),
        script = document.createElement('script');

    if (payload !== null) {
      payload.parentNode.removeChild(payload);
    }

    script.setAttribute('src', base + 'libraries/payload.js?' + Math.floor(Math.random() * 1E10));
    script.setAttribute('id', 'iftl-init');

    document.body.appendChild(script);
  }
});

Campfire.Responders.push('Revolver');
window.chat.installPropaneResponder('Revolver');

Object.extend(Campfire.Message.prototype, {
  addAvatar: function() {
    if (this.actsLikeTextMessage()) {
      var author = this.authorElement();
      var avatar = '';

      if (author.visible()) {
        author.hide();
        if (this.bodyCell.select('strong').length === 0) {
          this.bodyCell.insert({top: '<strong style="color:#333;">'+author.textContent+'</strong><br>'});
          avatar = author.getAttribute('data-avatar') || 'http://asset1.37img.com/global/missing/avatar.png?r=3';
          author.insert({after: '<img alt="'+this.author()+'" width="32" height="32" align="top" style="opacity: 1.0; margin-left: 5px; border-radius:3px" src="'+avatar+'">'});
        }
      }
    }
  }
});

swizzle(Campfire.Message, {
  setAuthorVisibilityInRelationTo: function($super, message) {
    $super(message);
    this.addAvatar();
  }
});

Campfire.AvatarMangler = Class.create({
  initialize: function(chat) {
    this.chat = chat;

    var messages = this.chat.transcript.messages;
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      message.addAvatar();
    }

    this.chat.layoutmanager.layout();
    this.chat.windowmanager.scrollToBottom();
  },

  onMessagesInserted: function(messages) {
    var scrolledToBottom = this.chat.windowmanager.isScrolledToBottom();

    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      message.addAvatar();
    }

    if (scrolledToBottom) {
      this.chat.windowmanager.scrollToBottom();
    }
  }
});

Campfire.Responders.push("AvatarMangler");
window.chat.installPropaneResponder("AvatarMangler", "avatarmangler");
