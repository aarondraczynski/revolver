/**
 * Revolver
 * (c) 2014 Aaron Draczynski
 * ================================
 * http://www.papermodelplane.com
 * http://twitter.com/developer
 * ================================
 * Revolver is freely distributed under the GNU General Public License.
 *
 */

NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

// Make it easier to remove an element from an array
Array.prototype.remove = function(elem) {
  var match = -1;

  while ((match = this.indexOf(elem)) > -1) {
    this.splice(match, 1);
  }
};

(function($, Ember){

  /**
   * ================================
   * Application
   * ================================
   */

  window.Revolver = Ember.Application.create({
    version: '1.0',
    customEvents: {
      'scroll': 'scroll'
    }
  });

  Revolver.Store = DS.Store.extend({
    revision: 12
  });


  Revolver.Loader = Ember.Mixin.create({
    layout: Ember.Handlebars.compile('<div class="loading">Loading</div>'),

    classNameBindings: ['isLoaded'],

    isLoaded: function() {
      return this.get('isInserted') && this.get('controller.isLoaded');
    }.property('isInserted', 'controller.isLoaded'),

    didInsertElement: function() {
      this.set('inserted', true);
      this._super();
    }
  });

  /**
   * ================================
   * Router
   * ================================
   */

  Revolver.Router.map(function() {
    this.route('library');
    this.route('libraryGifs', {path: '/library/gifs'});
    this.route('librarySounds', {path: '/library/sounds'});
    this.route('libraryVideos', {path: '/library/videos'});
    this.route('platform', {path: '/platform'});
    this.route('platformBuild', {path: '/platform/build'});
    this.route('platformImport', {path: '/platform/import'});
  });

  Revolver.IndexRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.transitionTo('library');
    }
  });

  Revolver.LibraryRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.transitionTo('librarySounds');
    }
  });

  Revolver.LibraryGifsRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('library', {outlet: 'main'});
      this.render('libraryGifs', {into: 'library', outlet: 'media'});
      this.render('libraryGifTags', {into: 'library', outlet: 'tags', controller: 'libraryGifTags'});
    }
  });

  Revolver.LibraryGifTagsRoute = Ember.Route.extend({
    model: function() {
      return Revolver.LibraryGifTag.find();
    }
  });

  Revolver.LibrarySoundsRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('library', {outlet: 'main'});
      this.render('librarySounds', {into: 'library', outlet: 'media'});
      this.render('librarySoundTags', {into: 'library', outlet: 'tags', controller: 'librarySoundTags'});
    }
  });

  Revolver.LibrarySoundTagsRoute = Ember.Route.extend({
    model: function() {
      return Revolver.LibrarySoundTag.find();
    }
  });

  Revolver.LibraryVideosRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('library', {outlet: 'main'});
      this.render('libraryVideos', {into: 'library', outlet: 'media'});
      this.render('libraryVideoTags', {into: 'library', outlet: 'tags', controller: 'libraryVideoTags'});
    }
  });

  Revolver.LibraryVideoTagsRoute = Ember.Route.extend({
    model: function() {
      return Revolver.LibraryVideoTag.find();
    }
  });

  Revolver.PlatformRoute = Ember.Route.extend({
    model: function() {
      return Revolver.PlatformScript.find();
    },
    renderTemplate: function() {
      this.render('platform', {outlet: 'main'});
    }
  });

  /**
   * ================================
   * Models
   * ================================
   */

  var gifTagCache = [],
      soundTagCache = [],
      videoTagCache = [],
      parallelUploadCount = 0;

  Revolver.LibraryGif = Ember.Object.extend();

  Revolver.LibrarySound = Ember.Object.extend();

  Revolver.LibraryVideo = Ember.Object.extend();

  Revolver.LibraryGifTag = Ember.Object.extend();

  Revolver.LibraryGifTag.reopenClass({
    tags: [],
    find: function() {
      $.ajax({
        url: '/a/library/gifs/tags',
        dataType: 'json',
        context: this,
        success: function(response) {
          document.getElementsByClassName('library-tags-no-content')[0].removeAttribute('style');
          response.forEach(function(tag) {
            this.tags.pushObject(Revolver.LibraryGifTag.create(tag));
            gifTagCache.push(tag.name);
          }, this);
        }
      });

      return this.tags;
    }
  });

  Revolver.LibrarySoundTag = Ember.Object.extend();

  Revolver.LibrarySoundTag.reopenClass({
    tags: [],
    find: function() {
      $.ajax({
        url: '/a/library/sounds/tags',
        dataType: 'json',
        context: this,
        success: function(response) {
          document.getElementsByClassName('library-tags-no-content')[0].removeAttribute('style');
          response.forEach(function(tag) {
            this.tags.pushObject(Revolver.LibrarySoundTag.create(tag));
            soundTagCache.push(tag.name);
          }, this);
        }
      });

      return this.tags;
    }
  });

  Revolver.LibraryVideoTag = Ember.Object.extend();

  Revolver.LibraryVideoTag.reopenClass({
    tags: [],
    find: function() {
      $.ajax({
        url: '/a/library/videos/tags',
        dataType: 'json',
        context: this,
        success: function(response) {
          document.getElementsByClassName('library-tags-no-content')[0].removeAttribute('style');
          response.forEach(function(tag) {
            this.tags.pushObject(Revolver.LibraryVideoTag.create(tag));
            videoTagCache.push(tag.name);
          }, this);
        }
      });

      return this.tags;
    }
  });

  Revolver.PlatformScript = Ember.Object.extend();

  Revolver.PlatformScript.reopenClass({
    find: function() {
      var scripts = [];
      $.ajax({
        url: '/a/platform/scripts',
        dataType: 'json',
        context: scripts,
        success: function(response) {
          response.forEach(function(script) {
            this.pushObject(Revolver.PlatformScript.create(script));
          }, this);
        }
      });

      return scripts;
    }
  });

  /**
   * ================================
   * Views
   * ================================
   */

  var soundsTable,
      gifsTable,
      videosTable;

  // Revolver.ApplicationView = Ember.View.extend(Revolver.Loader, {
  //   templateName: 'application'
  // });

  Revolver.LibraryView = Ember.View.extend({
    didInsertElement: function() {
      // Initialize drag-and-drop upload manager
      createUploader();
    }
  });

  Revolver.LibrarySearchInputView = Ember.TextField.extend({
    attributeBindings: ['data-text-gif', 'data-text-sound', 'data-text-video'],

    focusIn: function(e) {
      // Turn magnifying glass icon blue when library search box is focused
      var search = e.target,
          searchIcon = search.previousElementSibling,
          clearIcon = search.nextElementSibling.firstChild;

      clearTimeout(Revolver.LibrarySearchInputView.blurTimeout);
      search.parentNode.className = 'focus';
      searchIcon.style.color = '#53bee3';
      clearIcon.style.opacity = 1;
    },

    focusOut: function(e) {
      // Turn magnifying glass icon grey when library search box loses focus
      var search = e.target,
          searchIcon = search.previousElementSibling,
          clearIcon = search.nextElementSibling.firstChild;

      search.style.borderColor = '#53bee3';

      // Delay onblur visual effects to prevent flicker when user clicks clear search button
      Revolver.LibrarySearchInputView.blurTimeout = setTimeout(function() {
        search.removeAttribute('style');
        search.parentNode.className = '';
        searchIcon.style.color = '#ccc';

        if (search.value.length === 0) {
          clearIcon.style.opacity = 0;
        }
      }, 100);
    },

    keyUp: function(e) {
      // Get out of here if library media table is not yet initialized
      var loaded = document.getElementsByClassName('col-right')[0].getElementsByClassName('loading')[0].style.display;
      if (loaded === 'block' || loaded === '' || !loaded) {
        // Handle this a little more gracefully
        // @todo
        return;
      }

      // Filter library media table on keyup event
      switch (document.getElementsByClassName('container')[0].dataset.context) {
        case 'gifs':
          gifsTable.fnFilter(e.target.value);

          break;
        case 'sounds':
          soundsTable.fnFilter(e.target.value);

          break;
        case 'videos':
          videosTable.fnFilter(e.target.value);

          break;
      }
    }
  });

  Revolver.LibrarySearchClear = Ember.View.extend({
    click: function(e) {
      var search = document.getElementById('library-search-box');
      e.preventDefault();

      // Remove filter from library media table
      switch (document.getElementsByClassName('container')[0].dataset.context) {
        case 'gifs':
          gifsTable.fnFilter('');

          break;
        case 'sounds':
          soundsTable.fnFilter('');

          break;
        case 'videos':
          videosTable.fnFilter('');

          break;
      }

      // Clear search box value
      search.value = '';
      search.focus();
    }
  });

  Revolver.LibraryGifsView = Ember.View.extend({
    didInsertElement: function() {
      document.getElementById('nav-library').className = 'ember-view active';
      document.getElementById('nav-platform').className = 'ember-view';
      document.getElementById('library-search-box').placeholder = document.getElementById('library-search-box').dataset.textGif;
      document.getElementById('library-sort-videos').className = document.getElementById('library-sort-videos').className.replace(/(?:^|\s)hidden(?!\S)/g , '') + ' hidden';
      document.getElementById('library-sort-gifs').className = document.getElementById('library-sort-gifs').className.replace(/(?:^|\s)hidden(?!\S)/g , '');
      setTimeout(function() {
        gifsTable = $('#library-gifs').dataTable({
          'bAutoWidth': false,
          'bLengthChange': false,
          'bDestroy': true,

          'fnInitComplete': function(oSettings) {
            if (oSettings.aiDisplay.length !== 0) {
              // GIFs exist in library, display the table
              document.getElementById('library-gifs').style.display = 'table';
              document.getElementById('library-media-pagination').style.display = 'block';
              document.getElementById('library-gifs-page').getElementsByClassName('loading')[0].style.display = 'none';
            } else {
              // No GIFs exist in library, show an empty library message
              document.getElementById('library-media-empty').style.display = 'block';
              document.getElementById('library-media-no-results').style.display = 'none';
              document.getElementById('library-gifs-page').getElementsByClassName('loading')[0].style.display = 'none';
            }
          },

          'fnInfoCallback': function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
            return 'Showing ' + iStart + ' to ' + iEnd + ' of ' + iTotal + ' GIFs';
          },

          'fnCreatedRow': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // Translate column data into an <article> element that will span table width
            var newBlock = document.createElement('article'),
                newStage = document.createElement('div'),
                newName = document.createElement('div'),
                newCreatedAt = document.createElement('div'),
                newTags = document.createElement('div'),
                colName = nRow.getElementsByClassName('td-name')[0],
                colRemoteName = nRow.getElementsByClassName('td-remote-name')[0],
                colCreatedAt = nRow.getElementsByClassName('td-created-at')[0],
                colCreatedAtShort = nRow.getElementsByClassName('td-created-at-short')[0],
                name = colName.innerHTML;

            newBlock.id = 'gif-' + nRow.getElementsByClassName('td-id')[0].innerHTML;
            newBlock.className = 'library-gif';

            // Build preview area
            newStage.style.backgroundImage = 'url(http://i.imgur.com/' + (colRemoteName.textContent || colRemoteName.innerText) + 'b.jpg)'; // .gif
            newStage.className = 'stage';

            // Build play button
            var playLink = document.createElement('a');
            playLink.href = '#';
            playLink.className = 'play can-play';
            playLink.addEventListener('click', function(e) {
              // Add event listener to play button
              e.preventDefault();
              var button = e.target,
                  gif = nRow.getElementsByClassName('stage')[0],
                  remoteName = colRemoteName.textContent || colRemoteName.innerText;

              if (button.className === 'play playing') {
                // Replace animation on stage with static thumbnail of GIF
                gif.style.backgroundImage = 'url(http://i.imgur.com/' + remoteName + 'b.jpg)';
                button.className = 'play can-play';
              } else if (button.className === 'play can-play') {
                // Create image element
                var image = document.createElement('img');
                image.src = 'http://i.imgur.com/' + remoteName + '.gif';

                button.className = 'play';
                $(button.parentNode).append('<div class="library-media-loading"><div id="blockG_1" class="loading-block"></div><div id="blockG_2" class="loading-block"></div><div id="blockG_3" class="loading-block"></div></div>');

                // Listen for image loaded event and start playing animation on stage
                image.addEventListener('load', function(e) {
                  gif.style.backgroundImage = 'url(http://i.imgur.com/' + remoteName + '.gif)';
                  button.parentNode.removeChild(button.parentNode.querySelector('.library-media-loading'));
                  button.className = 'play playing';
                });
              }
            });
            newStage.appendChild(playLink);
            newBlock.appendChild(newStage);

            // Build name item
            newName.innerHTML = name;
            newName.className = 'name';
            newBlock.appendChild(newName);

            // Build delete link
            var deleteLink = document.createElement('a');
            deleteLink.href = '#';
            deleteLink.className = 'library-media-confirm-delete icon-cancel';
            deleteLink.title = 'Delete this GIF';
            newBlock.appendChild(deleteLink);

            // Build upload date item
            newCreatedAt.innerHTML = 'uploaded on ' + colCreatedAtShort.innerHTML;
            newCreatedAt.className = 'created-at';
            newBlock.appendChild(newCreatedAt);

            // Insert new element
            colName.innerHTML = '';
            colName.appendChild(newBlock);
            colName.colSpan = 3;

            // Hide old table columns
            colCreatedAt.className += ' hidden';
          },

          'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var newTags = document.createElement('div');

            // Build tag atoms
            newTags.className = 'tags';
            if (aData.tags.length) {
              for (var i = 0; i < aData.tags.length; i++) {
                var tag = document.createElement('a');
                tag.href = '#';
                tag.className = 'library-atom-tag';
                tag.dataset.name = aData.tags[i].name;
                tag.innerHTML = aData.tags[i].name + '<span class="library-atom-tag-remove icon-cancel"></span></a>';

                newTags.appendChild(tag);
              }
            }

            // Build add tag atom link
            var addTagLink = document.createElement('a');
            addTagLink.href = '#';
            addTagLink.className = 'library-atom-tag-add';
            addTagLink.title = 'Add a new tag';
            addTagLink.innerHTML = '<span class="icon-plus"></span> Tag';

            // Build add tag input box
            var addTagInput = document.createElement('input');
            addTagInput.type = 'text';
            addTagInput.className = 'library-atom-tag-input';
            addTagInput.placeholder = 'Add a new tag';
            addTagInput.maxLength = 20;

            newTags.appendChild(addTagLink);
            newTags.appendChild(addTagInput);

            var mediaElem = nRow.getElementsByTagName('article')[0],
                existingTags = mediaElem.getElementsByClassName('tags');

            // Remove existing tag atoms
            if (existingTags.length) {
              mediaElem.removeChild(existingTags[0]);
            }

            // Append new tag atoms set
            mediaElem.appendChild(newTags);
          },

          'iDisplayLength': 20,
          'sAjaxSource': '/a/library/gifs',
          'sAjaxDataProp': 'data',
          'sDom': 't<"#library-media-pagination"pi>',
          'aaSorting': [[1, 'asc']],
          'aoColumns': [
            {'mData': 'id', 'sClass': 'td-id hidden', 'bSearchable': false, 'bSortable': false},
            {'mData': 'name', 'sClass': 'td-name'},
            {'mData': 'remote_name', 'sClass': 'td-remote-name hidden', 'bSortable': false},
            {'mData': 'tags', 'sClass': 'td-tags hidden', 'bSortable': false, 'mRender': function(data, type, full) {
              // Create searchable string of tags
              var tags = '';
              if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                  tags += data[i].name
                  if (i !== data.length - 1) {
                    tags += ', ';
                  }
                }
              }

              return tags;
            }},
            {'mData': 'created_at', 'sClass': 'td-created-at', 'sType': 'date', 'bSearchable': false},
            {'mData': 'created_at_short', 'sClass': 'td-created-at-short hidden', 'bSearchable': false, 'bSortable': false}
          ]
        });
      }, 500);
    }
  });

  Revolver.LibrarySoundsView = Ember.View.extend({
    didInsertElement: function() {
      document.getElementById('nav-library').className = 'ember-view active';
      document.getElementById('nav-platform').className = 'ember-view';
      document.getElementById('library-search-box').placeholder = document.getElementById('library-search-box').dataset.textSound;
      setTimeout(function() {
        soundsTable = $('#library-sounds').dataTable({
          'bAutoWidth': false,
          'bLengthChange': false,
          'bDestroy': true,

          'fnInitComplete': function(oSettings) {
            if (oSettings.aiDisplay.length !== 0) {
              // Sounds exist in library, display the table
              document.getElementById('library-sounds').style.display = 'table';
              document.getElementById('library-media-pagination').style.display = 'block';
              document.getElementById('library-sounds-page').getElementsByClassName('loading')[0].style.display = 'none';
            } else {
              // No sounds exist in library, show an empty library message
              document.getElementById('library-media-empty').style.display = 'block';
              document.getElementById('library-media-no-results').style.display = 'none';
              document.getElementById('library-sounds-page').getElementsByClassName('loading')[0].style.display = 'none';
            }
          },

          'fnInfoCallback': function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
            return 'Showing ' + iStart + ' to ' + iEnd + ' of ' + iTotal + ' sounds';
          },

          'fnCreatedRow': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // Translate column data into an <article> element that will span table width
            var newBlock = document.createElement('article'),
                newName = document.createElement('div'),
                newAudio = document.createElement('audio'),
                newDuration = document.createElement('div'),
                newCreatedAt = document.createElement('div'),
                colName = nRow.getElementsByClassName('td-name')[0],
                colDuration = nRow.getElementsByClassName('td-duration')[0],
                colCreatedAt = nRow.getElementsByClassName('td-created-at')[0],
                colCreatedAtShort = nRow.getElementsByClassName('td-created-at-short')[0],
                name = colName.innerHTML;

            newBlock.id = 'sound-' + nRow.getElementsByClassName('td-id')[0].innerHTML;
            newBlock.className = 'library-sound';

            // Build name faux-column
            newName.innerHTML = name;
            newName.className = 'name';

            // Build play button
            var playLink = document.createElement('a');
            playLink.href = '#';
            playLink.className = 'play';
            playLink.title = 'Play ' + name;
            playLink.addEventListener('click', function(e) {
              // Add event listener to play button
              e.preventDefault();
              var button = e.target,
                  player = nRow.getElementsByTagName('audio'),
                  oldTitle;

              if (button.className === 'play playing') {
                player[0].pause();
              } else if (button.className === 'play') {
                // If audio element does not exist
                if (player.length === 0) {

                  // Create audio element
                  newAudio.src = '/libraries/user/sounds/' + name + '.mp3';
                  newAudio.autoplay = false;
                  newAudio.controls = false;

                  // Listen for audio events and update button state
                  newAudio.addEventListener('canplaythrough', function(e) {
                    // Pause any sounds that are currently playing
                    player.forEach(function(elem) {
                      elem.pause();
                    });

                    // Auto-play buffered sound
                    e.target.play();
                  });

                  // Set button class and page title when sound starts playing
                  newAudio.addEventListener('play', function(e) {
                    button.className = 'play playing';
                    button.style.opacity = 1;
                  });

                  // Revert button class and page title when sound stops playing
                  newAudio.addEventListener('pause', function(e) {
                    button.className = 'play';
                    button.removeAttribute('style');
                  });

                  nRow.getElementsByTagName('article')[0].appendChild(newAudio);
                } else {
                  // Pause any sounds that are currently playing
                  player.forEach(function(elem) {
                    elem.pause();
                  });

                  player[0].play();
                }
              }
            });
            newName.appendChild(playLink);
            newBlock.appendChild(newName);

            // Build duration faux-column
            newDuration.innerHTML = colDuration.innerHTML;
            newDuration.className = 'duration';
            newBlock.appendChild(newDuration);

            // Build delete link
            var deleteLink = document.createElement('a');
            deleteLink.href = '#';
            deleteLink.className = 'library-media-confirm-delete icon-cancel';
            deleteLink.title = 'Delete this sound';

            // Build upload date faux-column
            newCreatedAt.innerHTML = colCreatedAtShort.innerHTML;
            newCreatedAt.className = 'created-at';
            newCreatedAt.appendChild(deleteLink);
            newBlock.appendChild(newCreatedAt);

            // Insert new element
            colName.innerHTML = '';
            colName.appendChild(newBlock);
            colName.colSpan = 3;

            // Hide old table columns
            colDuration.className += ' hidden';
            colCreatedAt.className += ' hidden';
          },

          'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var newTags = document.createElement('div');

            // Build tag atoms
            newTags.className = 'tags';
            if (aData.tags.length) {
              for (var i = 0; i < aData.tags.length; i++) {
                var tag = document.createElement('a');
                tag.href = '#';
                tag.className = 'library-atom-tag';
                tag.dataset.name = aData.tags[i].name;
                tag.innerHTML = aData.tags[i].name + '<span class="library-atom-tag-remove icon-cancel"></span></a>';

                newTags.appendChild(tag);
              }
            }

            // Build add tag atom link
            var addTagLink = document.createElement('a');
            addTagLink.href = '#';
            addTagLink.className = 'library-atom-tag-add';
            addTagLink.title = 'Add a new tag';
            addTagLink.innerHTML = '<span class="icon-plus"></span> Tag';

            // Build add tag input box
            var addTagInput = document.createElement('input');
            addTagInput.type = 'text';
            addTagInput.className = 'library-atom-tag-input';
            addTagInput.placeholder = 'Add a new tag';
            addTagInput.maxLength = 20;

            newTags.appendChild(addTagLink);
            newTags.appendChild(addTagInput);

            var mediaElem = nRow.getElementsByTagName('article')[0],
                existingTags = mediaElem.getElementsByClassName('tags');

            if (existingTags.length) {
              // Slightly delay tag re-rendering to allow for tag removal animation-in-progress to finish
              setTimeout(function() {
                // Remove existing tag atoms
                mediaElem.removeChild(existingTags[0]);

                // Append newly created tag atoms set
                mediaElem.appendChild(newTags);
              }, 1300); 
            } else {
              // This is the first library media table render, so immediately append tag atoms set
              mediaElem.appendChild(newTags);
            }
          },

          'iDisplayLength': 10,
          'sAjaxSource': '/a/library/sounds',
          'sAjaxDataProp': 'data',
          'sDom': 't<"#library-media-pagination"pi>',
          'aaSorting': [[1, 'asc']],
          'aoColumns': [
            {'mData': 'id', 'sClass': 'td-id hidden', 'bSearchable': false, 'bSortable': false},
            {'mData': 'name', 'sClass': 'td-name'},
            {'mData': 'duration', 'sClass': 'td-duration', 'sType': 'formatted-num', 'bSearchable': false},
            {'mData': 'tags', 'sClass': 'td-tags hidden', 'bSortable': false, 'mRender': function(data, type, full) {
              // Create searchable string of tags
              var tags = '';
              if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                  tags += data[i].name
                  if (i !== data.length - 1) {
                    tags += ', ';
                  }
                }
              }

              return tags;
            }},
            {'mData': 'created_at', 'sClass': 'td-created-at', 'sType': 'date', 'bSearchable': false},
            {'mData': 'created_at_short', 'sClass': 'td-created-at-short hidden', 'bSearchable': false, 'bSortable': false}
          ]
        });
      }, 500);
    }
  });

  Revolver.LibraryVideosView = Ember.View.extend({
    didInsertElement: function() {
      document.getElementById('nav-library').className = 'ember-view active';
      document.getElementById('nav-platform').className = 'ember-view';
      document.getElementById('library-search-box').placeholder = document.getElementById('library-search-box').dataset.textVideo;
      document.getElementById('library-sort-gifs').className = document.getElementById('library-sort-gifs').className.replace(/(?:^|\s)hidden(?!\S)/g , '') + ' hidden';
      document.getElementById('library-sort-videos').className = document.getElementById('library-sort-videos').className.replace(/(?:^|\s)hidden(?!\S)/g , '');
      setTimeout(function() {
        videosTable = $('#library-videos').dataTable({
          'bAutoWidth': false,
          'bLengthChange': false,
          'bDestroy': true,

          'fnInitComplete': function(oSettings) {
            if (oSettings.aiDisplay.length !== 0) {
              // Videos exist in library, display the table
              document.getElementById('library-videos').style.display = 'table';
              document.getElementById('library-media-pagination').style.display = 'block';
              document.getElementById('library-videos-page').getElementsByClassName('loading')[0].style.display = 'none';
            } else {
              // No videos exist in library, show an empty library message
              document.getElementById('library-media-empty').style.display = 'block';
              document.getElementById('library-media-no-results').style.display = 'none';
              document.getElementById('library-videos-page').getElementsByClassName('loading')[0].style.display = 'none';
            }
          },

          'fnInfoCallback': function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
            return 'Showing ' + iStart + ' to ' + iEnd + ' of ' + iTotal + ' videos';
          },

          'fnCreatedRow': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // Translate column data into an <article> element that will span table width
            var newBlock = document.createElement('article'),
                newStage = document.createElement('div'),
                newVideo = document.createElement('video'),
                newDuration = document.createElement('span'),
                newName = document.createElement('div'),
                newCreatedAt = document.createElement('div'),
                newTags = document.createElement('div'),
                colName = nRow.getElementsByClassName('td-name')[0],
                colExtension = nRow.getElementsByClassName('td-extension')[0],
                colDuration = nRow.getElementsByClassName('td-duration')[0],
                colCreatedAt = nRow.getElementsByClassName('td-created-at')[0],
                colCreatedAtShort = nRow.getElementsByClassName('td-created-at-short')[0],
                name = colName.innerHTML,
                extension = colExtension.innerHTML;

            newBlock.id = 'video-' + nRow.getElementsByClassName('td-id')[0].innerHTML;
            newBlock.className = 'library-video';

            // Create video element
            newStage.className = 'stage';
            newVideo.src = '/libraries/user/videos/' + name + '.' + extension;
            newStage.appendChild(newVideo);

            // Build video controls
            var playLink = document.createElement('a'),
                oldTitle;
            playLink.href = '#';
            playLink.className = 'play can-play';
            playLink.addEventListener('click', function(e) {
              // Add event listener to play button
              e.preventDefault();

              if (newVideo.paused) {
                // Play video and hide controls
                newVideo.play();
                e.target.className = 'play playing';
                e.target.nextElementSibling.className = 'duration playing';
              } else {
                // Pause video and show controls
                newVideo.pause();
                e.target.className = 'play can-play';
                e.target.nextElementSibling.className = 'duration';
              }
            });

            // Show controls again once video has finished playing
            newVideo.addEventListener('ended', function(e) {
              e.target.nextElementSibling.className = 'play can-play';
              e.target.nextElementSibling.nextElementSibling.className = 'duration';
            });

            // Build duration span
            newDuration.className = 'duration';
            newDuration.innerHTML = colDuration.innerHTML;

            newStage.appendChild(playLink);
            newStage.appendChild(newDuration);
            newBlock.appendChild(newStage);

            // Build name item
            newName.innerHTML = name;
            newName.className = 'name';
            newBlock.appendChild(newName);

            // Build delete link
            var deleteLink = document.createElement('a');
            deleteLink.href = '#';
            deleteLink.className = 'library-media-confirm-delete icon-cancel';
            deleteLink.title = 'Delete this video';
            newBlock.appendChild(deleteLink);

            // Build upload date item
            newCreatedAt.innerHTML = 'uploaded on ' + colCreatedAtShort.innerHTML;
            newCreatedAt.className = 'created-at';
            newBlock.appendChild(newCreatedAt);

            // Set video extension type
            newBlock.dataset.extension = colExtension.textContent || colExtension.innerText;

            // Insert new element
            colName.innerHTML = '';
            colName.appendChild(newBlock);
            colName.colSpan = 3;

            // Hide old table columns
            colCreatedAt.className += ' hidden';
          },

          'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var newTags = document.createElement('div');

            // Build tag atoms
            newTags.className = 'tags';
            if (aData.tags.length) {
              for (var i = 0; i < aData.tags.length; i++) {
                var tag = document.createElement('a');
                tag.href = '#';
                tag.className = 'library-atom-tag';
                tag.dataset.name = aData.tags[i].name;
                tag.innerHTML = aData.tags[i].name + '<span class="library-atom-tag-remove icon-cancel"></span></a>';

                newTags.appendChild(tag);
              }
            }

            // Build add tag atom link
            var addTagLink = document.createElement('a');
            addTagLink.href = '#';
            addTagLink.className = 'library-atom-tag-add';
            addTagLink.title = 'Add a new tag';
            addTagLink.innerHTML = '<span class="icon-plus"></span> Tag';

            // Build add tag input box
            var addTagInput = document.createElement('input');
            addTagInput.type = 'text';
            addTagInput.className = 'library-atom-tag-input';
            addTagInput.placeholder = 'Add a new tag';
            addTagInput.maxLength = 20;

            newTags.appendChild(addTagLink);
            newTags.appendChild(addTagInput);

            var mediaElem = nRow.getElementsByTagName('article')[0],
                existingTags = mediaElem.getElementsByClassName('tags');

            // Remove existing tag atoms
            if (existingTags.length) {
              mediaElem.removeChild(existingTags[0]);
            }

            // Append new tag atoms set
            mediaElem.appendChild(newTags);
          },

          'iDisplayLength': 20,
          'sAjaxSource': '/a/library/videos',
          'sAjaxDataProp': 'data',
          'sDom': 't<"#library-media-pagination"pi>',
          'aaSorting': [[1, 'asc']],
          'aoColumns': [
            {'mData': 'id', 'sClass': 'td-id hidden', 'bSearchable': false, 'bSortable': false},
            {'mData': 'name', 'sClass': 'td-name'},
            {'mData': 'extension', 'sClass': 'td-extension hidden', 'bSearchable': false, 'bSortable': false},
            {'mData': 'duration', 'sClass': 'td-duration hidden', 'sType': 'formatted-num', 'bSearchable': false},
            {'mData': 'tags', 'sClass': 'td-tags hidden', 'bSortable': false, 'mRender': function(data, type, full) {
              // Create searchable string of tags
              var tags = '';
              if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                  tags += data[i].name
                  if (i !== data.length - 1) {
                    tags += ', ';
                  }
                }
              }

              return tags;
            }},
            {'mData': 'created_at', 'sClass': 'td-created-at', 'sType': 'date', 'bSearchable': false},
            {'mData': 'created_at_short', 'sClass': 'td-created-at-short hidden', 'bSearchable': false, 'bSortable': false}
          ]
        });
      }, 500);
    }
  });

  Revolver.LibraryTagsView = Ember.View.extend({
    didInsertElement: function() {
      var tagsElem = document.getElementById('library-tags');
      
      setTimeout(function() {
        // Show message if there are no library tags to display
        if (!tagsElem.className.match(/\brendered\b/)) {
          tagsElem.className += ' rendered';
        }

        // Detect scroll position in library tags list and display cutoff gradient accordingly
        if (tagsElem.getElementsByTagName('ul').length > 0) {
          tagsElem.getElementsByTagName('ul')[0].addEventListener('scroll', function(e) {
            var list = document.getElementById('library-tags'),
                distance = e.target.scrollTop;

            // Show or hide top gradient
            if (distance > 0) {
              list.className = list.className.replace(/(?:^|\s)no-top(?!\S)/g , '');
            } else {
              list.className += (list.className ? ' ' : '') + 'no-top';
            }

            // Show or hide bottom gradient
            if (this.scrollHeight - distance < this.clientHeight + 1) {
              list.className += (list.className ? ' ' : '') + 'no-bottom';
            } else {
              list.className = list.className.replace(/(?:^|\s)no-bottom(?!\S)/g , '');
            }
          });
        }
      }, 250);
    }
  });

  Revolver.LibraryTagView = Ember.View.extend({
    highlightNewRow: function() {
      // Highlight new row in library tags list
      var newRow = this.get('element');
      newRow.style.backgroundColor = '#fcf8ed';
      setTimeout(function() {
        newRow.removeAttribute('style');
      }, 3000);

    }.observes('controller.content.tags')
  });

  var scriptsFetched = false;

  Revolver.PlatformView = Ember.View.extend({
    didInsertElement: function() {
      document.getElementById('nav-library').className = document.getElementById('nav-library').className.replace(/(?:^|\s)active(?!\S)/g , '');
      scriptsFetched = false;
    }
  });

  Revolver.PlatformScriptView = Ember.View.extend({
    didInsertElement: function() {
      // Instantiate script on/off toggles
      $('.script-toggle').toggles({
        width: 70,
        height: 24
      });

      // Set toggles to proper position based on each script's active status
      $('.script').each(function() {
        if ($(this).find('.script-active').val() == 1) {
          $(this).find('.toggle-off').click();
        }
      });

      // Toggle has no effect on text formatting (hardcoded on by default), so disable its toggle
      $('#script-1').find('.script-toggle').css('opacity', 0.25).off('click').find('.toggle-blob').off('mousedown');

      setTimeout(function() {
        scriptsFetched = true;
      }, 500);
    },

    highlightNewRow: function() {
      // Highlight new row in scripts list
      var newRow = this.get('element');
      newRow.style.backgroundColor = '#fcf8ed';
      setTimeout(function() {
        newRow.removeAttribute('style');
      }, 3000);
    }.observes('controller.content.scripts')
  });

  Revolver.PlatformBuildView = Ember.View.extend({
    didInsertElement: function() {
      document.getElementById('nav-platform').className = 'ember-view active';
      document.getElementById('nav-library').className = document.getElementById('nav-library').className.replace(/(?:^|\s)active(?!\S)/g , '');
    }
  });

  /**
   * ================================
   * Controllers
   * ================================
   */

  Revolver.LibraryGifTagsController = Ember.ArrayController.extend({
    content: function() {
      return Revolver.LibraryGifTag.find();
    }.property()
  });

  Revolver.LibrarySoundTagsController = Ember.ArrayController.extend({
    content: function() {
      return Revolver.LibrarySoundTag.find();
    }.property()
  });

  Revolver.LibraryVideoTagsController = Ember.ArrayController.extend({
    content: function() {
      return Revolver.LibraryVideoTag.find();
    }.property()
  });

  /**
   * ================================
   * Functions
   * ================================
   */

  // Sort sound duration column by number, not by string
  $.extend($.fn.dataTableExt.oSort, {
    'formatted-num-pre': function(a) {
      a = (a === '-') ? 0 : a.replace(/[^0-9.]+/g, '');
      return parseFloat(a);
    },
 
    'formatted-num-asc': function (a, b) {
      return a - b;
    },
 
    'formatted-num-desc': function (a, b) {
      return b - a;
    }
  });

  // Retrieve row indexes from library media table based on matching tag names
  $.fn.dataTableExt.oApi.fnGetTagIndexes = function(oSettings, sSearch, iColumn) {
    var i, iLen, j, jLen, aOut = [], aData;
 
    for (i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
      aData = oSettings.aoData[i]._aData;

      if (aData.tags.length) {
        for (var j = 0; j < aData.tags.length; j++) {
          if (aData.tags[j].name === sSearch) {
            aOut.push(i);
          }
        }
      }
    }

    return aOut;
  };

  // Re-draw library media table while retaining current pagination state
  $.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
    if (oSettings.oFeatures.bServerSide === false) {
      var before = oSettings._iDisplayStart;

      oSettings.oApi._fnReDraw(oSettings);

      oSettings._iDisplayStart = before;
      oSettings.oApi._fnCalculateEnd(oSettings);
    }

    oSettings.oApi._fnDraw(oSettings);
  };

  // Reusable search filter call
  function filter(query) {
    document.getElementById('library-search-box').value = query;
    document.getElementById('library-search-box').focus();
    $('.icon-search').trigger('filter');
  }

  function listContains(a, b) {
    for (var i = 0, length = a.length; i < length; i++) {
      if (a[i] == b) {
        return true;
      } 
    }

    return false;
  }

  function getParent(elem, selector) {
    var all = document.querySelectorAll(selector),
        current = elem.parentNode;
    while (current && !listContains(all, current)) {
      current = current.parentNode;
    }

    return current;
  }

  // Add tag to media object
  function addTag(elem) {
    if (elem.id.match(/\bupload\b/)) {
      // Request came from library upload manager
      var value = elem.value.toLowerCase();

      $.post('/a/library/tags/add', {
        id: elem.id.substr(21),
        name: value,
        type: getParent(elem, '.file-preview').dataset.type,
        csrf_token: document.getElementById('csrf_token').value
      }, function(response) {
        if (response.success) {

          // Display new tag
          var tag = document.createElement('a'),
              tagRemoveLink = document.createElement('span'),
              tags = getParent(elem, '.metadata').nextElementSibling;

          tag.href = '#';
          tag.className = 'library-atom-tag';
          tag.dataset.name = value;
          tag.innerHTML = value;
          tagRemoveLink.className = 'library-atom-tag-remove icon-cancel';
          tag.appendChild(tagRemoveLink);
          tags.appendChild(tag);

          // Clear out add tag input box and re-focus
          elem.value = '';
          $(elem).typeahead('destroy');

          switch (getParent(elem, '.file-preview').dataset.type) {
            case 'gifs':
              // If tag does not already exist in GIF tag cache, add it
              if (gifTagCache.indexOf(value) < 0) {
                gifTagCache.push(value);
              }

              // Re-instantiate GIF tagahead
              $(elem).typeahead({
                name: 'gif-tags-' + Math.floor((Math.random() * 99999)),
                local: gifTagCache
              });

              break;
            case 'sounds':
              // If tag does not already exist in sound tag cache, add it
              if (soundTagCache.indexOf(value) < 0) {
                soundTagCache.push(value);
              }

              // Re-instantiate sound tagahead
              $(elem).typeahead({
                name: 'sound-tags-' + Math.floor((Math.random() * 99999)),
                local: soundTagCache
              });

              break;
            case 'videos':
              // If tag does not already exist in video tag cache, add it
              if (videoTagCache.indexOf(value) < 0) {
                videoTagCache.push(value);
              }

              // Re-instantiate video tagahead
              $(elem).typeahead({
                name: 'video-tags-' + Math.floor((Math.random() * 99999)),
                local: videoTagCache
              });

              break;
          }

          elem.focus();
        } else {
          // Display validation errors
          for (var key in response) {
            notify(0, response[key]);
          }
        }
      }, 'json');
    } else {
      // Request came from library view
      var mediaElem = getParent(elem, 'article'),
          id = mediaElem.id.substring(mediaElem.id.indexOf('-') + 1, mediaElem.id.length),
          value = elem.value.toLowerCase(),
          type = document.getElementsByClassName('container')[0].dataset.context;

      $.post('/a/library/tags/add', {
        id: id,
        name: value,
        type: type,
        csrf_token: document.getElementById('csrf_token').value
      }, function(response) {
        if (response.success) {

          // Display new tag
          var tag = document.createElement('a'),
              tagRemoveLink = document.createElement('span'),
              tags = elem.parentNode.parentNode,
              tagArray;

          tag.href = '#';
          tag.className = 'library-atom-tag';
          tag.dataset.name = value;
          tag.innerHTML = value;
          tagRemoveLink.className = 'library-atom-tag-remove icon-cancel';
          tag.appendChild(tagRemoveLink);
          tags.insertBefore(tag, elem.parentNode.previousElementSibling);

          elem.value = '';
          elem.previousElementSibling.value = '';

          switch (type) {
            case 'gifs':
              // If tag does not already exist in interface
              if (gifTagCache.indexOf(value) < 0) {
                // Add tag to library tags list
                Revolver.LibraryGifTag.tags.pushObject(Revolver.LibraryGifTag.create({id: response.success, name: value}));

                // Sort library tags list
                sortLibraryTags();

                // Add tag to GIF tag cache
                gifTagCache.push(value);
              }

              // Add tag to library GIFs table data
              var rowPosition = gifsTable.fnGetPosition(mediaElem.parentNode.parentNode);
              tagArray = gifsTable.fnGetData(rowPosition, 3);
              tagArray.push({'id': response.success, 'name': value});

              // Re-render tags list data for this row
              gifsTable.fnUpdate(tagArray, rowPosition, 3, false);
              if (document.activeElement.className !== 'library-atom-tag-input tt-query') {
                // Do not re-draw if user is focused in tag input box, otherwise it will unfocus the element and cause flickering
                gifsTable.fnStandingRedraw();
              }

              break;
            case 'sounds':
              // If tag does not already exist in interface
              if (soundTagCache.indexOf(value) < 0) {
                // Add tag to library tags list
                Revolver.LibrarySoundTag.tags.pushObject(Revolver.LibrarySoundTag.create({id: response.success, name: value}));

                // Sort library tags list
                sortLibraryTags();

                // Add tag to sound tag cache
                soundTagCache.push(value);
              }

              // Add tag to library sounds table data
              var rowPosition = soundsTable.fnGetPosition(mediaElem.parentNode.parentNode);
              tagArray = soundsTable.fnGetData(rowPosition, 3);
              tagArray.push({'id': response.success, 'name': value});

              // Re-render tags list data for this row
              soundsTable.fnUpdate(tagArray, rowPosition, 3, false);
              if (document.activeElement.className !== 'library-atom-tag-input tt-query') {
                // Do not re-draw if user is focused in tag input box, otherwise it will unfocus the element
                soundsTable.fnStandingRedraw();
              }

              break;
            case 'videos':
              // If tag does not already exist in interface
              if (videoTagCache.indexOf(value) < 0) {
                // Add tag to library tags list
                Revolver.LibraryVideoTag.tags.pushObject(Revolver.LibraryVideoTag.create({id: response.success, name: value}));

                // Sort library tags list
                sortLibraryTags();

                // Add tag to video tag cache
                videoTagCache.push(value);
              }

              // Add tag to library sounds table data
              var rowPosition = videosTable.fnGetPosition(mediaElem.parentNode.parentNode);
              tagArray = videosTable.fnGetData(rowPosition, 4);
              tagArray.push({'id': response.success, 'name': value});

              // Re-render tags list data for this row
              videosTable.fnUpdate(tagArray, rowPosition, 4, false);
              if (document.activeElement.className !== 'library-atom-tag-input tt-query') {
                // Do not re-draw if user is focused in tag input box, otherwise it will unfocus the element
                videosTable.fnStandingRedraw();
              }

              break;
          }

          // Clear out add tag input box
          elem.value = '';
          elem.previousElementSibling.value = '';
        } else {
          // Display validation errors
          for (var key in response) {
            notify(0, response[key]);
          }
        }
      }, 'json');
    }
  }

  // Re-sort library tags list
  function sortLibraryTags() {
    if (document.getElementById('library-tags').getElementsByTagName('ul').length === 0) {
      return;
    }

    setTimeout(function() {
      var list = document.getElementById('library-tags').getElementsByTagName('ul')[0],
          items = list.getElementsByTagName('li');

      // Convert NodeList to array so we can sort it
      var tagArray = [];
      for (var i = items.length; i--; tagArray.unshift(items[i]));

      // Sort array of tags
      tagArray.sort(function(a, b) {
        return (a.getElementsByTagName('a')[0].textContent || a.getElementsByTagName('a')[0].innerText).localeCompare((b.getElementsByTagName('a')[0].textContent || b.getElementsByTagName('a')[0].innerText));
      });

      // Rebuild library tags list
      $.each(tagArray, function(idx, item) {
        var itemParent = item.parentNode,
            itemPrev = itemParent.previousElementSibling,
            itemNext = itemParent.nextElementSibling;

        list.appendChild(itemPrev);
        list.appendChild(itemParent);
        list.appendChild(itemNext);
      });
    }, 250);
  }

  // Initialize media uploader
  function createUploader() {
    $('#library-upload').dropzone({
      url: '/a/library/add',
      parallelUploads: 3,
      maxFilesize: 3,
      clickable: false,
      createImageThumbnails: false,
      enqueueForUpload: true,
      previewTemplate: document.getElementById('upload-metadata-form').innerHTML.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\r\n]/g, ''),
      params: {
        csrf_token: document.getElementById('csrf_token').value
      },

      accept: function(file, done) {
        if (file.type !== 'image/gif' &&
            file.type !== 'audio/mp3' &&
            file.type !== 'audio/mpeg3' &&
            file.type !== 'video/mp4' &&
            file.type !== 'video/mpeg4' &&
            file.type !== 'video/m4v' &&
            file.type !== 'video/x-m4v' &&
            file.type !== 'video/quicktime') {
          // Is this an approved file type?
          notify(0, '"' + file.name + '" is not a valid file. Hit me with some GIFs, MP3s, and MP4s instead, okay?');
          done('Error');
        } else if (file.type === 'image/gif' && file.size > 2097152) {
          // Is this animated GIF larger than 2 MB?
          notify(0, '"' + file.name + '" is too big. Give me a GIF that\'s less than 2 MB, mmkay?');
          done('Error');
        } else if (file.size > 10485760) {
          // Is this media file larger than 10 MB?
          notify(0, '"' + file.name + '" is too big. Give me a file that\'s less than 10 MB, mmkay?');
          done('Error');
        } else {
          parallelUploadCount++;

          // Limit number of simultaneous uploads to 25
          if (parallelUploadCount > 25) {
            if (parallelUploadCount === 26) {
              notify(0, 'Slow down there! You can only upload 25 files at a time.');
            }
            done('Error');
          }

          if (!document.getElementById('library-upload').className.match(/\bloled\b/)) {
            document.getElementById('library-upload').className += ' loled';
            setTimeout(function() {
              document.getElementById('library-upload').className += ' wiggle';
            }, 300);
            setTimeout(function() {
              document.getElementById('library-upload-nom').style.display = 'block';

              $('#library-upload-nom span:eq(0)').css({'top': '-' + (Math.floor(Math.random() * (160 - 30 + 1)) + 30) + 'px', 'left': (Math.floor(Math.random() * (40 + 1))) + 'px'}).fadeIn(100);
              $('#library-upload-nom span:eq(1)').css({'top': '-' + (Math.floor(Math.random() * (160 - 30 + 1)) + 30) + 'px', 'left': (Math.floor(Math.random() * (110 - 70 + 1)) + 70) + 'px'}).delay(200).fadeIn(100);
              $('#library-upload-nom span:eq(2)').css({'top': '-' + (Math.floor(Math.random() * (160 - 30 + 1)) + 30) + 'px', 'left': (Math.floor(Math.random() * (190 - 140 + 1)) + 140) + 'px'}).delay(300).fadeIn(100);

              $('#library-upload-nom span:eq(0)').delay(400).fadeOut(100);
              $('#library-upload-nom span:eq(1)').delay(500).fadeOut(100);
              $('#library-upload-nom span:eq(2)').delay(600).fadeOut(100);
            }, 600);
            setTimeout(function() {
              done();
              enterUploadMode();
            }, 1800); 
          } else {
            done();
          }
        }
      },

      init: function() {
        this.on('dragstart', function(e) {

        }).on('dragend', function(e) {

        }).on('addedfile', function(file) {
          file.previewTemplate.className += ' processing';
          setTimeout(function() {
            if (file.previewTemplate.className.match(/\berror\b/)) {
              file.previewTemplate.parentNode.removeChild(file.previewTemplate);
            }
          }, 50);
        }).on('success', function(file, response) {
          if (response.success) {
            // Remove processing flag from DOM
            file.previewTemplate.className = file.previewTemplate.className.replace(/(?:^|\s)processing(?!\S)/g , '');

            setTimeout(function() {
              // If no more files are processing, activate save button in upload manager
              if (file.previewTemplate.parentNode.querySelectorAll('.file-preview.processing').length === 0) {
                var save = document.getElementById('library-upload-save');
                save.className = save.className.replace(/(?:^|\s)processing(?!\S)/g , '');
                save.innerHTML = '<span>' + document.getElementById('library-upload').dataset.saveText + '</span>';
              }
            }, 1000);

            // Re-enable tag input field now that we know what type of media this is
            file.previewTemplate.querySelector('#upload-metadata-tags-').disabled = false;

            // Add media object ID to DOM
            file.previewTemplate.getElementsByTagName('label').forEach(function(elem) {
              elem.setAttribute('for', elem.getAttribute('for') + response.success);
            });

            file.previewTemplate.getElementsByTagName('input').forEach(function(elem) {
              elem.id = elem.id + response.success;
            });

            // Add temporary metadata to DOM
            file.previewTemplate.dataset.id = response.success;
            file.previewTemplate.dataset.path = response.path;
            file.previewTemplate.dataset.name = response.name;
            file.previewTemplate.dataset.extension = response.extension;
            file.previewTemplate.dataset.type = response.type;

            function createGifTagahead() {
              $(file.previewTemplate).find('.library-atom-tag-input').not('.tt-query').typeahead({
                name: 'gif-upload-tags-' + Math.floor((Math.random() * 99999)),
                local: gifTagCache
              });
            }

            function createSoundTagahead() {
              $(file.previewTemplate).find('.library-atom-tag-input').not('.tt-query').typeahead({
                name: 'sound-upload-tags-' + Math.floor((Math.random() * 99999)),
                local: soundTagCache
              });
            }

            function createVideoTagahead() {
              $(file.previewTemplate).find('.library-atom-tag-input').not('.tt-query').typeahead({
                name: 'video-upload-tags-' + Math.floor((Math.random() * 99999)),
                local: videoTagCache
              });
            }

            if (response.type === 'gifs' && gifTagCache.length === 0) {
              // If library GIF tags have not yet been loaded into memory, fetch them and instantiate GIF typeahead
              $.ajax({
                url: '/a/library/gifs/tags',
                dataType: 'json',
                context: this,
                success: function(response) {
                  response.forEach(function(tag) {
                    gifTagCache.push(tag.name);
                  }, this);

                  createGifTagahead();
                }
              });
            } else if (response.type === 'gifs') {
              // Instantiate GIF tagahead
              createGifTagahead();
            }

            if (response.type === 'sounds' && soundTagCache.length === 0) {
              // If library sound tags have not yet been loaded into memory, fetch them and instantiate sound typeahead
              $.ajax({
                url: '/a/library/sounds/tags',
                dataType: 'json',
                context: this,
                success: function(response) {
                  response.forEach(function(tag) {
                    soundTagCache.push(tag.name);
                  }, this);

                  createSoundTagahead();
                }
              });
            } else if (response.type === 'sounds') {
              // Instantiate sound tagahead
              createSoundTagahead();
            }

            if (response.type === 'videos' && videoTagCache.length === 0) {
              // If library sound tags have not yet been loaded into memory, fetch them and instantiate sound typeahead
              $.ajax({
                url: '/a/library/videos/tags',
                dataType: 'json',
                context: this,
                success: function(response) {
                  response.forEach(function(tag) {
                    videoTagCache.push(tag.name);
                  }, this);

                  createVideoTagahead();
                }
              });
            } else if (response.type === 'videos') {
              // Instantiate sound tagahead
              createVideoTagahead();
            }

            // Add color scheme identifier for this media type
            file.previewTemplate.className = file.previewTemplate.className + ' ' + response.type;
            switch (response.type) {
              case 'gifs':
                file.previewTemplate.getElementsByClassName('replace-icon')[0].className = 'icon-picture';

                break;
              case 'sounds':
                file.previewTemplate.getElementsByClassName('replace-icon')[0].className = 'icon-volume-up';

                break;
              case 'videos':
                file.previewTemplate.getElementsByClassName('replace-icon')[0].className = 'icon-video';

                break;
              default:
                notify(0, 'An invalid media type was supplied.');
            }
          } else {
            // Remove processing flag from DOM
            file.previewTemplate.className = file.previewTemplate.className.replace(/(?:^|\s)processing(?!\S)/g , '');

            // If no more files are processing, activate save button in upload manager
            if (file.previewTemplate.parentNode.querySelectorAll('.file-preview.processing').length === 0) {
              var save = document.getElementById('library-upload-save');
              save.className = save.className.replace(/(?:^|\s)processing(?!\S)/g , '');
              save.innerHTML = '<span>' + document.getElementById('library-upload').dataset.saveText + '</span>';
            }

            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        });
      }
    });
  }

  /**
   * ================================
   * Streaming
   * ================================
   */

  // Route and dispatch notifications
  function notify(type, data) {
    switch (type) {
      case 0:
        // Generic error message
        renderNotification('Whoops!', data, 'attention');

        break;
      case 1:
        // Generic success message
        renderNotification('Success!', data, 'ok');

        break;
      case 2:
        // Media successfully uploaded and added to library
        var text = '';
        for (var i = 0; i < data.length; i++) {
          text += '"' + data[i] + '"';
          if (i != data.length -1 && data.length > 2) {
            text += ', ';
          }
          if (i + 1 === data.length - 1) {
            text += ' and ';
          }
        }

        // I can haz proper English?
        if (data.length > 1) {
          text += ' are';
        } else {
          text += ' is';
        }
        text += ' now available in the library.';

        renderNotification('Hooray!', text, 'ok');

        break;
      default:
        renderNotification('Revolver', '&copy; Aaron Draczynski', 'ok');
    }
  }

  // Display a new notification
  function renderNotification(title, text, icon) {
    var template = document.getElementById('notification-clone').innerHTML,
        notifications = document.getElementById('revolver').getElementsByClassName('notification'),
        count = notifications.length,
        ids = [],
        id = 'notification-' + (count + 1);

    for (var i = 0; i < count; i++) {
      ids.push(parseInt(notifications[i].id.replace('notification-', '')));
    }
    ids.sort(function(a, b) {
      return a - b
    });

    // Determine how far down this notification needs to be positioned
    var height = 20;
    for (var i = 0; i < ids.length; i++) {
      if (!document.getElementById('notification-' + ids[i]).className.match(/\bn-active\b/)) {
        height = parseInt(document.getElementById('notification-' + ids[i]).style.top);
        break;
      } else if (document.getElementById('notification-' + ids[i]).className.match(/\bn-active\b/)) {
        height = parseInt(document.getElementById('notification-' + ids[i]).style.top) + parseInt(document.getElementById('notification-' + ids[i]).clientHeight) + 10;
      }
      if (i > 0 && ids[i] - ids[i - 1] !== 1) {
        height = parseInt(document.getElementById('notification-' + ids[i - 1]).style.top) + parseInt(document.getElementById('notification-' + ids[i - 1]).clientHeight) + 10;
      }
    }    

    // Append new notification element to page
    $('#revolver').append(template);

    var newElem = document.getElementById('revolver').getElementsByClassName('notification')[count];

    // Set vertical offset
    newElem.className += ' n-active';
    newElem.style.top = height + 'px';

    // Add unique ID
    newElem.id = id;

    // Fill in notification message data
    newElem.getElementsByClassName('notification-title')[0].innerHTML = title;
    newElem.getElementsByClassName('notification-text')[0].innerHTML = text;
    newElem.getElementsByTagName('span')[0].className += icon;

    // Hide notification after 6 seconds
    var expire;
    function clearNotification(time) {
      time = typeof time !== 'undefined' ? time : 6000;

      expireClass = setTimeout(function() {
        newElem.className = 'notification';
      }, time);

      expireElem = setTimeout(function() {
        newElem.style.opacity = 0;
        setTimeout(function() {
          newElem.parentNode.removeChild(newElem);
        }, 600);
      }, time);
    }
    clearNotification();

    // Don't hide notification if user hovers over
    newElem.addEventListener('mouseover', function(e) {
      clearTimeout(expireClass);
      clearTimeout(expireElem);
    });

    // Hide notification after 1 second once user mouses away
    newElem.addEventListener('mouseout', function(e) {
      clearNotification(1000);
    });
  }

  /**
   * ================================
   * Modals
   * ================================
   */

  $.extend($.fn, {
    center: function() {
      this.style.position = 'absolute';
      this.style.top = Math.max(0, ((window.outerHeight - $(this).outerHeight()) / 2) + $(window).scrollTop()) + 'px';
      this.style.left = Math.max(0, ((window.outerWidth - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + 'px';
      return this;
    },

    modal: function(options) {
      var defaults = {
        width: 300, // max = 640
        height: 100, // max = 320
        openOnEvent: true,
        setEvent: 'click',
        onLoad: function() {},
        onUnload: function() {},
        content: 'Revolver'
      };
      var options = $.extend(defaults, options);

      return this.each(function() {
        var self = $(this),
            html = $('html'),
            body = $('body'),
            maxWidth = options.width > 640 ? 640 : options.width,
            maxHeight = options.height > 320 ? 320 : options.height,
            content = typeof options.content === 'function' ? options.content(self) : options.content;

        document.getElementsByTagName('html')[0].className += ' modal-ready';

        // Close modal when Esc key is pressed
        function modalCloseKeyup(e) {
          if (e.keyCode === 27) {
            deactivate();
          }
        }

        // Close modal when user clicks on shaded overlay
        function modalCloseClick(e) {
          if ($(e.target).is('.modal-overlay, .modal-close, .modal-close span')) {
            e.preventDefault();
            deactivate();
          }
        }

        // Show modal
        function activate() {
          var overlay = document.createElement('div'),
              popup = document.createElement('div'),
              closeLink = document.createElement('a');

          // Build modal structure
          overlay.id = 'modal-overlay';
          popup.className = 'modal-popup';
          popup.innerHTML = content;
          closeLink.href = '#';
          closeLink.className = 'modal-close-button modal-close';
          closeLink.innerHTML = '[ X ]';
          popup.appendChild(closeLink);

          document.body.style.backgroundColor = '#333';
          document.body.appendChild(overlay);
          document.body.appendChild(popup);

          // Execute onload callback
          if (typeof options.onLoad === 'function') {
            options.onLoad.call(self);
          }

          // Apply modal positioning
          popup.className += ' no-transition';
          popup.style.width = maxWidth + 'px';
          popup.style.height = maxHeight + 'px';
          popup.style.top = window.innerHeight / 2 + $(window).scrollTop();
          popup.style.left = window.innerWidth / 2;
          popup.style.marginLeft = '-' + (maxWidth / 2 + 10) + 'px';
          popup.style.marginTop = '-' + (maxHeight / 2 + 30) + 'px';

          body.on('keyup', modalCloseKeyup);
          body.on('click', modalCloseClick);

          // Animate modal into view
          popup.className = 'modal-popup modal-popup-animate';
          setTimeout(function() {
            document.getElementsByTagName('html')[0].className += ' modal-active';
          },  200);
        }

        // Hide modal
        function deactivate() {
          document.body.style.backgroundColor = '#e5e8e9';
          body.off('keyup', modalCloseKeyup).off('click', modalCloseClick);

          // Animate modal out of view
          html.removeClass('modal-active');

          // Delete modal
          document.body.removeChild(document.getElementById('modal-overlay'));
          setTimeout(function() {
            document.body.removeChild(document.getElementsByClassName('modal-popup')[0]);
          },  200);

          // Execute onunload callback
          if (typeof options.onUnload === 'function') {
            options.onUnload.call(self);
          }
        }

        // Initialize on click or different event
        if (options.openOnEvent) {
          self.on(options.setEvent, function(e) {
            e.stopPropagation();

            // Prevent modal trigger link from sending users away
            if ($(e.target).is('a')) {
              e.preventDefault();
            }
            activate();
          });
        } else {
          activate();
        }
      });
    }
  });

  /**
   * ================================
   * Events
   * ================================
   */

  document.addEventListener('click', function(e) {
    try {
      // Show confirmation modal before deleting tag from library
      if (e.target.className === 'library-tag-confirm-delete icon-cancel') {
        e.preventDefault();
        var name = (e.target.parentNode.textContent || e.target.parentNode.innerText).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
 
        document.getElementById('library-tag-delete').dataset.name = name;
        document.querySelector('#library-tags a[data-name="' + e.target.parentNode.dataset.name + '"]').parentNode.className += ' deleting';

        // Populate dialogue fields
        var media = $.trim((document.querySelector('#library-nav .active').textContent || document.querySelector('#library-nav .active').innerText).toLowerCase());
        if (media === 'gifs') {
          media = 'GIFs';
        }
        document.getElementsByClassName('replace-media').forEach(function(replaceElem) {
          replaceElem.innerHTML = 'tag';
        });
        document.getElementsByClassName('replace-media-plural').forEach(function(replaceElem) {
          replaceElem.innerHTML = media;
        });
        document.getElementsByClassName('replace-tag').forEach(function(replaceElem) {;
          replaceElem.innerHTML = name;
        });

        // Build confirmation modal
        $(e.target).modal({
          width: 520,
          height: 120,
          openOnEvent: false,
          onUnload: function() {
            document.getElementById('library-tag-delete').dataset.name = null;
          },
          content: document.getElementById('modal-confirm-tag-delete').innerHTML
        });
      }

      // Delete tag from library
      if (e.target.id === 'library-tag-delete' || e.target.parentNode.id === 'library-tag-delete') {
        e.preventDefault();
        var button = document.getElementById('library-tag-delete'),
            name = button.dataset.name,
            type = document.getElementsByClassName('container')[0].dataset.context;

        $.post('/a/library/tags/delete', {
          name: name,
          type: type,
          csrf_token: document.getElementById('csrf_token').value
        }, function(response) {
          if (response.success) {

            // Remove tag from library tags list
            $('#library-tags .deleting').css('background', '#fbeced').delay(1000).slideUp(400, function() {
              $(this).remove();
            });

            // Remove tag from immediate media object tag view
            $('.library-atom-tag[data-name="' + name + '"]').addClass('no-transition').delay(1000).animate({
              width: 'hide',
              paddingLeft: 'hide',
              paddingRight: 'hide',
              marginLeft: 'hide',
              marginRight: 'hide',
              opacity: 0
            }, 300, function() {
              $(this).remove();
            });

            var matches,
                tags,
                tagArray = [],
                tagPos;

            switch (type) {
              case 'gifs':
                // Update local data for this GIF
                var matches = gifsTable.fnGetTagIndexes(name, 3);

                for (var i = 0; i < matches.length; i++) {
                  // Remove tag from library GIFs table data
                  tags = gifsTable.fnGetData(matches[i], 3);
                  for (var j = 0; j < tags.length; j++) {
                    if (tags[j].name !== name) {
                      tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                    }
                  }

                  // Re-render tags list data for this row
                  gifsTable.fnUpdate(tagArray, matches[i], 3, false);
                  setTimeout(function() {
                    gifsTable.fnStandingRedraw();
                  }, 1300);

                  tagArray = [];
                }

                // Remove tag from GIF tag cache
                tagPos = gifTagCache.indexOf(name);
                gifTagCache.splice(tagPos, 1);

                break;
              case 'sounds':
                // Update local data for this sound
                matches = soundsTable.fnGetTagIndexes(name, 3);

                for (var i = 0; i < matches.length; i++) {
                  // Remove tag from library sounds table data
                  tags = soundsTable.fnGetData(matches[i], 3);

                  for (var j = 0; j < tags.length; j++) {
                    if (tags[j].name !== name) {
                      tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                    }
                  }

                  // Re-render tags list data for this row
                  soundsTable.fnUpdate(tagArray, matches[i], 3, false);
                  setTimeout(function() {
                    soundsTable.fnStandingRedraw();
                  }, 1300);

                  tagArray = [];
                }

                // Remove tag from sound tag cache
                tagPos = soundTagCache.indexOf(name);
                soundTagCache.splice(tagPos, 1);

                break;
              case 'videos':
                // Update local data for this sound
                matches = videosTable.fnGetTagIndexes(name, 4);

                for (var i = 0; i < matches.length; i++) {
                  // Remove tag from library videos table data
                  tags = videosTable.fnGetData(matches[i], 4);
                  for (var j = 0; j < tags.length; j++) {
                    if (tags[j].name !== name) {
                      tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                    }
                  }

                  // Re-render tags list data for this row
                  videosTable.fnUpdate(tagArray, matches[i], 4, false);
                  setTimeout(function() {
                    videosTable.fnStandingRedraw();
                  }, 1300);

                  tagArray = [];
                }

                // Remove tag from video tag cache
                tagPos = videoTagCache.indexOf(name);
                videoTagCache.splice(tagPos, 1);

                break;
            }

            $('.modal-popup .modal-close').click();
            notify(1, 'The "' + name + '" tag has been deleted.');
          } else {
            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        }, 'json');
      }

      // Remove tag from media object
      if (e.target.className === 'library-atom-tag-remove icon-cancel') {
        e.preventDefault();

        if (document.getElementById('library-upload').className.match(/\bactive\b/)) {
          // Request came from library upload manager
          var id = getParent(e.target, '.file-preview').dataset.id,
              name = e.target.parentNode.textContent || e.target.parentNode.innerText,
              type = getParent(e.target, '.file-preview').dataset.type;

          $.post('/a/library/tags/remove', {
            id: id,
            name: name,
            type: type,
            csrf_token: document.getElementById('csrf_token').value
          }, function(response) {
            if (response.success) {

              // Remove tag from upload manager view
              e.target.style.display = 'none';
              $(e.target).parent().addClass('no-transition').animate({
                width: 'hide',
                paddingLeft: 'hide',
                paddingRight: 'hide',
                marginLeft: 'hide',
                marginRight: 'hide',
                opacity: 0
              }, 300, function() {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);

                // Lookup any other media objects that are associated with this tag
                $.post('/a/library/tags/lookup', {
                  name: name,
                  type: type,
                  csrf_token: document.getElementById('csrf_token').value
                }, function(response) {
                  if (response.success === 1) {

                    // This was the last instance of this tag being used for any media object of its type
                    switch (type) {
                      case 'gifs':
                        // Remove tag from GIF tag cache
                        tagPos = gifTagCache.indexOf(name);
                        gifTagCache.splice(tagPos, 1);
                        break;
                      case 'sounds':
                        // Remove tag from sound tag cache
                        tagPos = soundTagCache.indexOf(name);
                        soundTagCache.splice(tagPos, 1);
                        break;
                      case 'videos':
                        // Remove tag from video tag cache
                        tagPos = videoTagCache.indexOf(name);
                        videoTagCache.splice(tagPos, 1);
                        break;
                    }
                  }
                });
              });
            } else {
              // Display validation errors
              for (var key in response) {
                notify(0, response[key]);
              }
            }
          }, 'json');
        } else {
          // Request came from library view
          var mediaElem = getParent(e.target, 'article'),
              id = mediaElem.id.substring(mediaElem.id.indexOf('-') + 1, mediaElem.id.length),
              name = e.target.parentNode.textContent || e.target.parentNode.innerText,
              type = document.getElementsByClassName('container')[0].dataset.context;

          $.post('/a/library/tags/remove', {
            id: id,
            name: name,
            type: type,
            csrf_token: document.getElementById('csrf_token').value
          }, function(response) {
            if (response.success) {

              // Remove tag from media object tag view
              e.target.style.display = 'none';
              $(e.target).parent().addClass('no-transition').animate({
                width: 'hide',
                paddingLeft: 'hide',
                paddingRight: 'hide',
                marginLeft: 'hide',
                marginRight: 'hide',
                opacity: 0
              }, 300, function() {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);

                var matches,
                    tags,
                    tagArray = [],
                    tagPos,
                    deletedTagId = response.success;

                switch (type) {
                  case 'gifs':
                    // Update local data for this media object
                    matches = gifsTable.fnGetTagIndexes(name, 3);

                    for (var i = 0; i < matches.length; i++) {
                      // Remove tag from library GIFs table data
                      tags = gifsTable.fnGetData(matches[i], 3);

                      for (var j = 0; j < tags.length; j++) {
                        if (tags[j].name !== name) {
                          tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                        }
                      }

                      // Re-render tags list data for this row
                      gifsTable.fnUpdate(tagArray, matches[i], 3, false);
                      // setTimeout(function() {
                      //   var x = event.clientX,
                      //       y = event.clientY,
                      //       elemHovered = document.elementFromPoint(x, y);

                      //   if (getParent(elemHovered, '#' + mediaElem.id).length <= 0) {
                      //     // Do not re-draw if user is moused over this table row, otherwise it will cause flickering
                      //     gifsTable.fnStandingRedraw();
                      //   }
                      // }, 1300);
                    }

                    break;
                  case 'sounds':
                    // Update local data for this media object
                    matches = soundsTable.fnGetTagIndexes(name, 3);

                    for (var i = 0; i < matches.length; i++) {
                      // Remove tag from library sounds table data
                      tags = soundsTable.fnGetData(matches[i], 3);

                      for (var j = 0; j < tags.length; j++) {
                        if (tags[j].name !== name) {
                          tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                        }
                      }

                      // Re-render tags list data for this row
                      soundsTable.fnUpdate(tagArray, matches[i], 3, false);
                      // setTimeout(function() {
                      //   var x = e.clientX,
                      //       y = e.clientY,
                      //       elemHovered = document.elementFromPoint(x, y);

                      //   if (getParent(elemHovered, '#' + mediaElem.id).length <= 0) {
                      //     // Do not re-draw if user is moused over this table row, otherwise it will cause flickering
                      //     soundsTable.fnStandingRedraw();
                      //   }
                      // }, 1300);
                    }

                    break;
                  case 'videos':
                    // Update local data for this media object
                    matches = videosTable.fnGetTagIndexes(name, 4);

                    for (var i = 0; i < matches.length; i++) {
                      // Remove tag from library sounds table data
                      tags = videosTable.fnGetData(matches[i], 4);

                      for (var j = 0; j < tags.length; j++) {
                        if (tags[j].name !== name) {
                          tagArray.push({'id': tags[j].id, 'name': tags[j].name});
                        }
                      }

                      // Re-render tags list data for this row
                      videosTable.fnUpdate(tagArray, matches[i], 4, false);
                      // setTimeout(function() {
                      //   var x = e.clientX,
                      //       y = e.clientY,
                      //       elemHovered = document.elementFromPoint(x, y);

                      //   if (getParent(elemHovered, '#' + mediaElem.id).length <= 0) {
                      //     // Do not re-draw if user is moused over this table row, otherwise it will cause flickering
                      //     videosTable.fnStandingRedraw();
                      //   }
                      // }, 1300);
                    }

                    break;
                }

                // Lookup any other media objects that are associated with this tag
                $.post('/a/library/tags/lookup', {
                  name: name,
                  type: type,
                  csrf_token: document.getElementById('csrf_token').value
                }, function(response) {
                  if (response.success === 1) {

                    // This was the last instance of this tag being used for any media object of its type
                    switch (type) {
                      case 'gifs':
                        // Remove tag from library tags list
                        // @todo

                        // Remove tag from GIF tag cache
                        tagPos = gifTagCache.indexOf(name);
                        gifTagCache.splice(tagPos, 1);
                        break;
                      case 'sounds':
                        // Remove tag from library tags list
                        // @todo

                        // Remove tag from sound tag cache
                        tagPos = soundTagCache.indexOf(name);
                        soundTagCache.splice(tagPos, 1);
                        break;
                      case 'videos':
                        // Remove tag from library tags list
                        // @todo

                        // Remove tag from video tag cache
                        tagPos = videoTagCache.indexOf(name);
                        videoTagCache.splice(tagPos, 1);
                        break;
                    }
                  }
                });
              });
            } else {
              // Display validation errors
              for (var key in response) {
                notify(0, response[key]);
              }
            }
          }, 'json');
        }
      }

      // Filter on tag click
      if (e.target.className === 'library-atom-tag' || e.target.parentNode.className === 'library-tag') {
        e.preventDefault();

        // Get out of here if library media table is not yet initialized
        var loaded = document.getElementsByClassName('col-right')[0].getElementsByClassName('loading')[0].style.display;
        if (loaded === 'block' || loaded === '' || !loaded) {
          // Handle this a little more gracefully
          // @todo
          return;
        }

        var search = document.getElementById('library-search-box'),
            clearIcon = search.nextElementSibling.firstChild,
            tag = e.target.textContent || e.target.innerText;

        switch (document.getElementsByClassName('container')[0].dataset.context) {
          case 'gifs':
            // Filter GIFs table
            gifsTable.fnFilter(tag);

            break;
          case 'sounds':
            // Filter sounds table
            soundsTable.fnFilter(tag);

            break;
          case 'videos':
            // Filter videos table
            videosTable.fnFilter(tag);

            break;
        }

        search.value = tag;
        clearIcon.style.opacity = 1;
      }

      // Show input box for tag addition
      if (e.target.className === 'library-atom-tag-add' || e.target.parentNode.className === 'library-atom-tag-add') {
        e.preventDefault();
        var input = getParent(e.target, '.tags').getElementsByClassName('library-atom-tag-input')[0],
            elem = getParent(e.target, '.tags').getElementsByClassName('library-atom-tag-add')[0];

        switch (document.getElementsByClassName('container')[0].dataset.context) {
          case 'gifs':
            // Instantiate GIF tagahead
            $(input).typeahead({
              name: 'gif-tags-' + Math.floor((Math.random() * 99999)),
              local: gifTagCache
            });

            break;
          case 'sounds':
            // Instantiate sound tagahead
            $(input).typeahead({
              name: 'sound-tags-' + Math.floor((Math.random() * 99999)),
              local: soundTagCache
            });

            break;
          case 'videos':
            // Instantiate video tagahead
            $(input).typeahead({
              name: 'video-tags-' + Math.floor((Math.random() * 99999)),
              local: videoTagCache
            });

            break;
        }

        // Reveal input box
        input.style.display = 'inline-block';
        input.focus();
        elem.style.display = 'none';

        // Bind custom event trigger for adding tags in media object tagahead
        $(input).focus().on('add.any', function(e) {
          addTag(this);
        });

        // Add active class to parent media table row when input box is focused
        input.addEventListener('focus', function(e) {
          var row = getParent(input, 'tr');
          row.className = row.className + ' active';
        });

        // Hide input box on blur if empty and show tag add atom again
        input.addEventListener('blur', function(e) {
          if (input.value.length === 0) {
            input.style.display = 'none';
            elem.style.display = 'inline-block';
            $(input).off('add.any').typeahead('destroy');
          }

          // Remove active class from parent media table row
          var row = getParent(input, 'tr');
          row.className = row.className.replace(/(?:^|\s)active(?!\S)/g , '');
        });
      }

      // Show confirmation modal before deleting media object from library
      if (e.target.className === 'library-media-confirm-delete icon-cancel') {
        e.preventDefault();
        var button = document.getElementById('library-media-delete'),
            elem = getParent(e.target, 'article'),
            id = elem.id.substring(elem.id.indexOf('-') + 1, elem.id.length),
            name = elem.getElementsByClassName('name')[0].textContent || elem.getElementsByClassName('name')[0].innerText;

        button.dataset.id = id;
        button.dataset.name = name;

        // Populate dialogue fields
        var str = $.trim((document.querySelector('#library-nav .active').textContent || document.querySelector('#library-nav .active').innerText).toLowerCase()),
            media = str.substr(0, str.length - 1);
        if (media === 'gif') {
          media = 'GIF';
        }

        document.getElementsByClassName('replace-media').forEach(function(replaceElem) {
          replaceElem.innerHTML = media;
        });

        document.getElementsByClassName('replace-name').forEach(function(replaceElem) {;
          replaceElem.innerHTML = name;
        });

        // Build confirmation modal
        $(e.target).modal({
          width: 520,
          height: 120,
          openOnEvent: false,
          onUnload: function() {
            button.dataset.id = null;
            button.dataset.name = null;
          },
          content: document.getElementById('modal-confirm-media-delete').innerHTML
        });
      }

      // Delete media object from library
      if (e.target.id === 'library-media-delete' || e.target.parentNode.id === 'library-media-delete') {
        e.preventDefault();
        var button = document.getElementById('library-media-delete'),
            name = button.dataset.name,
            type = document.getElementsByClassName('container')[0].dataset.context;

        $.post('/a/library/delete', {
          id: button.dataset.id,
          type: type,
          csrf_token: document.getElementById('csrf_token').value
        }, function(response) {
          if (response.success) {

            switch (type) {
              case 'gifs':
                // Remove GIF from library view
                var row = document.getElementById('gif-' + button.dataset.id).parentNode.parentNode;
                $('#gif-' + button.dataset.id).addClass('no-transition').delay(1000).slideUp(400);
                $('#gif-' + button.dataset.id).parent().css('background', '#fbeced').addClass('no-transition').delay(1000).slideUp(400, function() {
                  var index = gifsTable.fnGetPosition(row);

                  // Delete row data from library GIFs table
                  gifsTable.fnDeleteRow(index);
                });

                break;
              case 'sounds':
                // Remove sound from library view
                var row = document.getElementById('sound-' + button.dataset.id).parentNode.parentNode;
                $('#sound-' + button.dataset.id).addClass('no-transition').delay(1000).slideUp(400);
                $('#sound-' + button.dataset.id).parent().css('background', '#fbeced').addClass('no-transition').delay(1000).slideUp(400, function() {
                  var index = soundsTable.fnGetPosition(row);

                  // Delete row data from library sounds table
                  soundsTable.fnDeleteRow(index);
                });

                break;
              case 'videos':
                // Remove video from library view
                var row = document.getElementById('video-' + button.dataset.id).parentNode.parentNode;
                $('#video-' + button.dataset.id).addClass('no-transition').delay(1000).slideUp(400);
                $('#video-' + button.dataset.id).parent().css('background', '#fbeced').addClass('no-transition').delay(1000).slideUp(400, function() {
                  var index = videosTable.fnGetPosition(row);

                  // Delete row data from library videos table
                  videosTable.fnDeleteRow(index);
                });

                break;
            }

            $('.modal-popup .modal-close').click();

            // Display success notification
            setTimeout(function() {
              notify(1, '"' + name + '" has been deleted. <span class="nowrap">Oh well.</span> It was fun while it lasted.');
            }, 1000);
          } else {
            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        }, 'json');
      }

      // Save upload metadata, exit upload manager, and bring library back into view
      if (e.target.id === 'library-upload-save' || e.target.parentNode.id === 'library-upload-save') {
        e.preventDefault();

        // Get out of here if uploads are still processing
        if (document.getElementById('library-upload-save').className === 'button green processing') {
          return false;
        }

        var queued = document.getElementById('library-upload').getElementsByClassName('file-preview').length,
            processedGifs = 0,
            processedSounds = 0,
            processedVideos = 0,
            i = 0,
            successful = 0,
            names = [];

        // Reset simultaneous upload counter
        parallelUploadCount = 0;

        // Loop through queued uploads
        document.getElementById('library-upload').getElementsByClassName('file-preview').forEach(function(elem) {

          // Update this media object's metadata
          $.post('/a/library/update', {
            id: elem.dataset.id,
            path: elem.dataset.path,
            name: elem.dataset.name,
            extension: elem.dataset.extension,
            type: elem.dataset.type,
            new_name: elem.getElementsByClassName('upload-metadata-name')[0].value,
            csrf_token: document.getElementById('csrf_token').value
          }, function(response) {
            if (response.id) {

              switch (elem.dataset.type) {
                case 'gifs':
                  var data = {
                    id: response.id,
                    name: response.name,
                    remote_name: response.remote_name,
                    tags: response.tags,
                    created_at: response.created_at,
                    created_at_short: response.created_at_short
                  }

                  // Pass GIF name for display in notification
                  names.push(response.name);

                  // Add new GIF to library GIFs table
                  gifsTable.fnAddData(data);

                  // Sort library GIFs table by date added
                  gifsTable.fnSort([[5, 'desc']]);
                  document.getElementById('sort-media-by').querySelector('option[value="created-at-desc"]').selected = true;

                  // Ensure library GIFs table is visible
                  document.getElementById('library-media-wrapper').style.display = 'block';
                  document.getElementById('library-media-pagination').style.display = 'block';
                  if (document.getElementById('library-gifs') !== null) {
                    document.getElementById('library-gifs').style.display = 'table';
                  }
                  document.getElementsByClassName('library-media-no-content').forEach(function(elem) {
                    elem.style.display = 'none';
                  });

                  // Highlight new row in library GIFs table
                  var newRow = document.getElementById('gif-' + response.id).parentNode;
                  newRow.style.backgroundColor = '#fcf8ed';
                  setTimeout(function() {
                    newRow.removeAttribute('style');
                  }, 3000);

                  // Update library tags list
                  response.tags.forEach(function(tag) {

                    // If tag does not already exist in interface
                    if (gifTagCache.indexOf(tag.name) < 0) {
                      Revolver.LibraryGifTag.tags.pushObject(Revolver.LibraryGifTag.create(tag));

                      // Sort library tags list
                      sortLibraryTags();

                      // Add tag to GIF tag cache
                      gifTagCache.push(tag.name);
                    }
                  }, this);

                  processedGifs++;

                  break;
                case 'sounds':
                  var data = {
                    id: response.id,
                    name: response.name,
                    duration: response.duration,
                    tags: response.tags,
                    created_at: response.created_at,
                    created_at_short: response.created_at_short
                  }

                  // Pass sound name for display in notification
                  names.push(response.name);

                  // Add new sound to library sounds table
                  soundsTable.fnAddData(data);

                  // Sort library sounds table by date added
                  soundsTable.fnSort([[5, 'desc']]);

                  // Ensure library sounds table is visible
                  document.getElementById('library-media-wrapper').style.display = 'block';
                  document.getElementById('library-media-pagination').style.display = 'block';
                  if (document.getElementById('library-sounds') !== null) {
                    document.getElementById('library-sounds').style.display = 'table'; 
                  }
                  document.getElementsByClassName('library-media-no-content').forEach(function(elem) {
                    elem.style.display = 'none';
                  });

                  // Highlight new row in library sounds table
                  var newRow = document.getElementById('sound-' + response.id).parentNode;
                  newRow.style.backgroundColor = '#fcf8ed';
                  setTimeout(function() {
                    newRow.removeAttribute('style');
                  }, 3000);

                  // Update library tags list
                  response.tags.forEach(function(tag) {

                    // If tag does not already exist in interface
                    if (soundTagCache.indexOf(tag.name) < 0) {
                      Revolver.LibrarySoundTag.tags.pushObject(Revolver.LibrarySoundTag.create(tag));

                      // Sort library tags list
                      sortLibraryTags();

                      // Add tag to sound tag cache
                      soundTagCache.push(tag.name);
                    }
                  }, this);

                  processedSounds++;

                  break;
                case 'videos':
                  var data = {
                    id: response.id,
                    name: response.name,
                    extension: response.extension,
                    duration: response.duration,
                    tags: response.tags,
                    created_at: response.created_at,
                    created_at_short: response.created_at_short
                  }

                  // Pass sound name for display in notification
                  names.push(response.name);

                  // Add new sound to library videos table
                  videosTable.fnAddData(data);

                  // Sort library videos table by date added
                  videosTable.fnSort([[5, 'desc']]);
                  document.getElementById('sort-media-by').querySelector('option[value="created-at-desc"]').selected = true;

                  // Ensure library videos table is visible
                  document.getElementById('library-media-wrapper').style.display = 'block';
                  document.getElementById('library-media-pagination').style.display = 'block';
                  if (document.getElementById('library-videos') !== null) {
                    document.getElementById('library-videos').style.display = 'table'; 
                  }
                  document.getElementsByClassName('library-media-no-content').forEach(function(elem) {
                    elem.style.display = 'none';
                  });

                  // Highlight new row in library videos table
                  var newRow = document.getElementById('video-' + response.id).parentNode;
                  newRow.style.backgroundColor = '#fcf8ed';
                  setTimeout(function() {
                    newRow.removeAttribute('style');
                  }, 3000);

                  // Update library tags list
                  response.tags.forEach(function(tag) {

                    // If tag does not already exist in interface
                    if (videoTagCache.indexOf(tag.name) < 0) {
                      Revolver.LibraryVideoTag.tags.pushObject(Revolver.LibraryVideoTag.create(tag));

                      // Sort library tags list
                      sortLibraryTags();

                      // Add tag to video tag cache
                      videoTagCache.push(tag.name);
                    }
                  }, this);

                  processedVideos++;

                  break;
                default:
                  notify(0, 'An invalid media type was supplied.');
              }

              // Fade away this successful upload
              $(elem).slideUp(500, function(elem) {
                $(elem).remove();
              });

              successful++;
            } else {
              // Display validation errors
              for (var key in response) {
                notify(0, response[key]);
              }
            }
            i++;

            // If this is the last pending item in the upload queue
            if (i === queued) {

              // Exit upload manager as long as we're all good here 
              if (successful === queued) {
                exitUploadMode();

                // @todo
                // Which library media type should we take the user to? Whichever type they just uploaded the most of
                var most = Math.max(processedGifs, processedSounds, processedVideos);
                switch (most) {
                  case processedGifs:
                    // 
                    break;
                  case processedSounds:
                    // 
                    break;
                  case processedVideos:
                    // 
                    break;
                }

                // Display success notification
                setTimeout(function() {
                  notify(2, names);
                }, 1000);
              } else {
                // Debug notification
                notify(0, 'Something went wrong. Successful: ' + successful + ' , queued: ' + queued);
              }
            }
          }, 'json');
        });
      }

      // Exit upload manager without saving and bring library back into view
      if (e.target.id === 'library-upload-close' || e.target.parentNode.id === 'library-upload-close') {
        e.preventDefault();

        // Reset simultaneous upload counter
        parallelUploadCount = 0;

        // Delete temporary files
        document.getElementById('library-upload').getElementsByClassName('file-preview').forEach(function(elem) {
          $.post('/a/library/delete', {
            id: elem.dataset.id,
            type: elem.dataset.type,
            csrf_token: document.getElementById('csrf_token').value
          }, function(response) {
            if (response.success) {
              // Do we need to do anything here?
            } else {
              // Display validation errors
              for (var key in response) {
                notify(0, response[key]);
              }
            }
          }, 'json');
        });

        exitUploadMode();
      }

      // Delete script from platform
      if (e.target.className === 'script-confirm-delete icon-cancel') {
        e.preventDefault();
        var id = getParent(e.target, '.script').id.substr(7);

        $.post('/a/platform/delete', {
          id: id,
          csrf_token: document.getElementById('csrf_token').value
        }, function(response) {
          if (response.success) {

            // Remove script from platform view
            $('#script-' + id).css('background', '#fbeced').addClass('no-transition').delay(1000).slideUp(400);

            // Display success notification
            setTimeout(function() {
              notify(1, '"' + response.name + '" has been deleted. <span class="nowrap">Oh well.</span> It was fun while it lasted.');
            }, 1000);
          } else {
            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        }, 'json');
      }

      // Save form in script builder
      if (e.target.id === 'script-save') {
        e.preventDefault();

        // var responseTypes = document.getElementsByName('response-type'),
        //     responseType;
        // for (var i = 0; i < responseTypes.length; i++) {
        //   if (responseTypes[i].checked) {
        //     responseType = responseTypes[i].value;
        //     break;
        //   }
        // }

        $.post('/a/platform/add', {
          message_scope: document.getElementById('message-scope').value,
          message_match: document.getElementById('message-match').value,
          // response_type: responseType,
          response_scope: document.getElementById('response-scope').value,
          response_replace_html: document.getElementById('response-replace-html').value,
          script_name: document.getElementById('script-name').value,
          script_description: document.getElementById('script-description').value,
          csrf_token: document.getElementById('csrf_token').value
        }, function(response) {
          if (response.success) {
            // Build new payload
            $.get('/a/platform/build');

            document.getElementById('nav-platform').click();

            // Display success notification
            setTimeout(function() {
              notify(1, '"' + response.name + '" has been created.');
            }, 1000);
          } else {
            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        });
      }
    } catch (e) {
      return;
    }
  });

  // Add tag to media object when user hits Return in tagahead input
  document.addEventListener('keydown', function(e) {
    if (e.target.className === 'library-atom-tag-input' && e.which === 13) {
      addTag(this);
    }
  });

  // Dropdown sorting for library GIFs table and library videos table
  document.addEventListener('change', function(e) {
    if (e.target.id === 'sort-media-by') {
      switch (document.getElementsByClassName('container')[0].dataset.context) {
        case 'gifs':
          switch (e.target.value) {
            case 'name-asc':
              gifsTable.fnSort([[1, 'asc']]);

              break;
            case 'name-desc':
              gifsTable.fnSort([[1, 'desc']]);

              break;
            case 'created-at-asc':
              gifsTable.fnSort([[4, 'asc']]);

              break;
            case 'created-at-desc':
              gifsTable.fnSort([[4, 'desc']]);

              break;
          }

          break;
        case 'videos':
          switch (e.target.value) {
            case 'name-asc':
              videosTable.fnSort([[1, 'asc']]);

              break;
            case 'name-desc':
              videosTable.fnSort([[1, 'desc']]);

              break;
            case 'duration-asc':
              videosTable.fnSort([[3, 'asc']]);

              break;
            case 'duration-desc':
              videosTable.fnSort([[3, 'desc']]);

              break;
            case 'created-at-asc':
              videosTable.fnSort([[5, 'asc']]);

              break;
            case 'created-at-desc':
              videosTable.fnSort([[5, 'desc']]);

              break;
          }

          break;
      }
    }

    if (e.target.id === 'room-scope') {
      if (e.target.value === 'room-scope-specific') {
        document.getElementById('room-scope-number').className = '';
        document.getElementById('room-scope-number').focus();
      } else {
        document.getElementById('room-scope-number').className = 'hidden';
      }
    }

    if (e.target.id === 'message-scope' || e.target.id === 'response-scope') {
      e.target.nextElementSibling.focus();
    }
  });

  // Limit character entry for certain input fields
  document.addEventListener('keyup', function(e) {
    var tagValid = new RegExp(/[^a-z\d\s]/gi),
        nameValid = new RegExp(/[^a-z\d]/gi);

    // Only allow alphanumeric and spaces in tag input box
    if (e.target.className === 'library-atom-tag-input tt-query' && e.target.value.match(tagValid)) {
      e.target.value = e.target.value.replace(tagValid, '');
    }

    // Only allow alphanumeric in media name input box
    if (e.target.className === 'upload-metadata-name' && e.target.value.match(nameValid)) {
      e.target.value = e.target.value.replace(nameValid, '');
    }
  });

  // Change active status of a script when its on/off toggle is flipped
  $(document).on('toggle', '.script-toggle', function(e, active) {
    if (scriptsFetched) {
      var elem = $(this),
          scriptActive = 0;

      if (active) {
        scriptActive = 1;
      }

      // Update script record in database
      $.post('/a/platform/update', {
          id: elem.parents('.script').attr('id').substr(7),
          active: scriptActive,
          csrf_token: document.getElementById('csrf_token').value
        }, function(response) {
          if (response.success) {
            // Build new payload
            $.get('/a/platform/build');
          } else {
            // Display validation errors
            for (var key in response) {
              notify(0, response[key]);
            }
          }
        }
      );
    }
  });

  // Transition library view to upload manager
  function enterUploadMode() {
    var box = document.getElementById('library-upload'),
        cloud = document.getElementsByClassName('icon-upload-cloud')[0],
        heading = document.getElementById('drop-heading');

    if (box.className.match(/\bactive\b/)) {
      return;
    }
    box.className += ' active';

    box.style.height = 'auto';
    box.style.margin = 0;
    box.style.textAlign = 'left';

    cloud.style.display = 'inline-block';
    cloud.style.margin = '0 0 0 -6px';
    cloud.style.verticalAlign = 'middle';

    heading.style.display = 'inline-block';
    heading.style.margin = '-1px 0 0 2px';
    heading.style.verticalAlign = 'middle';
    heading.style.fontWeight = '200';

    $('#library-upload').removeClass('drop drag-hover').addClass('light');
    document.getElementById('drop-instructions').style.display = 'none';

    $('#library-bar, #library-tags, #main .col-right section.light').animate({
      height: 'hide',
      paddingTop: 'hide',
      paddingBottom: 'hide',
      marginTop: 'hide',
      marginBottom: 'hide',
      opacity: 0
    }, 450);

    $('#main .col-right').delay(550).animate({'width': 0}, 400);
    document.getElementById('main').getElementsByClassName('col-left')[0].style.width = 'auto';

    $('#library-upload').css('width', '198px').delay(550).animate({'width': '980px', 'margin-top': 0, 'min-height': '235px'}, 350, function() {
      $(this).addClass('droplist');
      var uploadElem = document.getElementById('library-upload'),
          uploadDetails = document.createElement('div'),
          close = document.createElement('a'),
          save = document.createElement('a');

      close.href = '#';
      close.id = 'library-upload-close';
      close.className = 'button red';
      close.innerHTML = '<span>' + uploadElem.dataset.closeText + '</span>';
      document.getElementById('library-upload').insertBefore(close, document.getElementById('drop-instructions'));

      save.href = '#';
      save.id = 'library-upload-save';
      save.className = 'button green processing';
      save.innerHTML = '<span>' + uploadElem.dataset.pendingText + '</span>';
      document.getElementById('library-upload').insertBefore(save, document.getElementById('drop-instructions'));

      document.getElementById('drop-instructions').style.display = 'block';
      document.getElementById('drop-instructions').innerHTML = document.getElementById('drop-instructions').dataset.textB;

      // Insert upload details box
      uploadDetails.id = 'upload-details';
      uploadDetails.innerHTML = document.getElementById('upload-details-clone').innerHTML;
      uploadElem.parentNode.appendChild(uploadDetails);
      $('#upload-details').delay(1000).fadeIn(600);
    });

    $('#drop-heading').delay(550).animate({'font-size': '30px'}, 350);

    document.getElementsByTagName('footer')[0].style.opacity = 0;

    // Only allow lowercase letters in tag input box
    document.getElementsByClassName('library-atom-tag-input').forEach(function(elem){
      elem.addEventListener('blur', function(e) {
        e.target.value = e.target.value.toLowerCase();
      });
    });

    // Only allow lowercase letters in media name input box
    document.getElementsByClassName('upload-metadata-name').forEach(function(elem){
      elem.addEventListener('blur', function(e) {
        e.target.value = e.target.value.toLowerCase();
      });
    });

    // Bind custom event trigger for adding tags in tagahead
    $('#library-upload .library-atom-tag-input').focus().on('add.any', function(e) {
      addTag(this);
    });
  }

  // Transition upload manager to library view
  function exitUploadMode() {
    $('.file-preview').remove();
    $('#upload-details').remove();

    document.getElementsByClassName('icon-upload-cloud')[0].removeAttribute('style');
    document.getElementById('drop-heading').removeAttribute('style');
    document.getElementById('drop-instructions').innerHTML = document.getElementById('drop-instructions').dataset.textA;

    $('#library-upload').removeClass('active').css('text-align', 'center').animate({'width': '198px', 'min-height': 0}, 300, function() {
      $(this).addClass('drop').removeClass('light droplist started wiggle loled');
      document.getElementById('library-upload').removeAttribute('style');
    });

    $('#library-bar, #library-tags, #main .col-right section.light').delay(400).animate({
      height: 'show',
      paddingTop: 'show',
      paddingBottom: 'show',
      marginTop: 'show',
      marginBottom: 'show',
      opacity: 1
    }, 500, function() {
      document.getElementById('library-bar').setAttribute('style', '');
      document.getElementById('library-tags').setAttribute('style', '');
      document.getElementById('main').getElementsByClassName('col-right')[0].getElementsByClassName('light')[0].setAttribute('style', '');
      document.getElementsByTagName('footer')[0].style.opacity = 1;
    });

    setTimeout(function() {
      document.getElementById('main').getElementsByClassName('col-left')[0].setAttribute('style', '');
      document.getElementById('main').getElementsByClassName('col-right')[0].setAttribute('style', '');
    }, 400);

    document.getElementById('library-upload-save').parentNode.removeChild(document.getElementById('library-upload-save'));
    document.getElementById('library-upload-close').parentNode.removeChild(document.getElementById('library-upload-close'));
  }

  /**
   * ================================
   * Debug
   * ================================
   */

  document.getElementById('enter-uploader').addEventListener('click', function(e) {
    e.preventDefault();
    enterUploadMode();
  });

  document.getElementById('exit-uploader').addEventListener('click', function(e) {
    e.preventDefault();
    exitUploadMode();
  });

  document.getElementById('sort-library-tags').addEventListener('click', function(e) {
    e.preventDefault();
    sortLibraryTags();
  });

  document.getElementById('make-notification').addEventListener('click', function(e) {
    e.preventDefault();
    renderNotification('Testing!', 'This is a test notification.', 'ok');
  });

  document.getElementById('audio-mpeg-gen').addEventListener('click', function(e) {
    e.preventDefault();
    var audio = document.createElement('audio');
    audio.className = 'hidden';
    audio.src = '/libraries/revolver/sounds/waterfront.mp3';
    audio.autoplay = false;
    audio.controls = false;
    audio.addEventListener('canplaythrough', function(e) {
      e.target.play();
    });
    document.getElementById('debug').appendChild(audio);
  });

  document.getElementById('audio-destroy').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementsByTagName('audio').forEach(function(audio) {
      audio.parentNode.removeChild(audio);
    });
  });

  document.getElementById('log-lgtc').addEventListener('click', function(e) {
    e.preventDefault();
    console.log(gifTagCache);
  });

  document.getElementById('log-lstc').addEventListener('click', function(e) {
    e.preventDefault();
    console.log(soundTagCache);
  });

})(jQuery, Ember);

/*
CSS Browser Selector 0.6.1
Originally written by Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/

Co-maintained by:
https://github.com/verbatim/css_browser_selector

*/

showLog = true;
function log(m) {
  if (window.console && showLog) {
    console.log(m);
  }
}

function css_browser_selector(u) {
  var uaInfo = {},
      screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560],
      allScreens = screens.length,
      ua = u.toLowerCase(),
      is = function(t) {
        return RegExp(t, 'i').test(ua);
      },
      version = function(p, n) { 
        n = n.replace('.', '_');
        var i = n.indexOf('_'),
            ver = '';
        while (i > 0) {
          ver += ' '+ p + n.substring(0, i);
          i = n.indexOf('_', i+1);
        } 
        ver += ' ' + p + n;
        return ver; 
      },
      g = 'gecko',
      w = 'webkit',
      c = 'chrome',
      f = 'firefox',
      s = 'safari',
      o = 'opera',
      m = 'mobile',
      a = 'android',
      bb = 'blackberry',
      lang = 'lang_',
      dv = 'device_',
      html = document.documentElement,
      b = [
    
      // browser
      (!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
      :is('firefox/')?g+ " " + f+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+f+RegExp.$2 + ' '+f+RegExp.$2+'_'+RegExp.$4:'')  
      :is('gecko/')?g
      :is('opera')?o+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+o+RegExp.$2 + ' '+o+RegExp.$2+'_'+RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua)?' '+o+RegExp.$2+' '+o+RegExp.$2+'_'+RegExp.$3:''))
      :is('konqueror')?'konqueror'
  
      :is('blackberry') ? 
        ( bb + 
          ( /Version\/(\d+)(\.(\d+)+)/i.test(ua)
            ? ' ' + bb+ RegExp.$1 + ' '+bb+ RegExp.$1+RegExp.$2.replace('.','_')
            : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) 
              ? ' ' +bb+RegExp.$2 + (RegExp.$3?' ' +bb+RegExp.$2+RegExp.$3:'')
              : '')
          )
        ) // blackberry
  
      :is('android') ? 
        (  a +
          ( /Version\/(\d+)(\.(\d+))+/i.test(ua)
            ? ' ' + a+ RegExp.$1 + ' '+a+ RegExp.$1+RegExp.$2.replace('.','_')
            : '')
          + (/Android (.+); (.+) Build/i.test(ua)
            ? ' '+dv+( (RegExp.$2).replace(/ /g,'_') ).replace(/-/g,'_')
            :'' )
        ) //android
  
      :is('chrome')?w+' '+c+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+c+RegExp.$2 +((RegExp.$4>0) ? ' '+c+RegExp.$2+'_'+RegExp.$4:''):'') 
      
      :is('iron')?w+' iron'
      
      :is('applewebkit/') ? 
        ( w+ ' '+ s + 
          ( /version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ?  ' '+ s +RegExp.$2 + " "+s+ RegExp.$2+RegExp.$3.replace('.','_')
            :  ( / Safari\/(\d+)/i.test(ua) 
              ? 
              ( (RegExp.$1=='419' || RegExp.$1=='417' || RegExp.$1=='416' || RegExp.$1=='412' ) ? ' '+ s + '2_0' 
                : RegExp.$1=='312' ? ' '+ s + '1_3'
                : RegExp.$1=='125' ? ' '+ s + '1_2'
                : RegExp.$1=='85' ? ' '+ s + '1_0'
                : '' )
              :'')
            )
        ) //applewebkit 
    
      :is('mozilla/')?g
      :''
      
      // mobile
      ,is('android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk')?m:''
      
      // os/platform
      ,is('j2me')?'j2me'
      :is('ipad|ipod|iphone')?  
        ( 
          (
            /CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua)  ?
            'ios' + version('ios',RegExp.$2) : ''
          ) + ' ' + ( /(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : '' )
        ) //'iphone'
      //:is('ipod')?'ipod'
      //:is('ipad')?'ipad'
      :is('playbook')?'playbook'
      :is('kindle|silk')?'kindle'
      :is('playbook')?'playbook'
      :is('mac')?'mac'+ (/mac os x ((\d+)[.|_](\d+))/.test(ua) ?    ( ' mac' + (RegExp.$2)  +  ' mac' + (RegExp.$1).replace('.','_')  )     : '' )
      :is('win')?'win'+
          (is('windows nt 6.2')?' win8'
          :is('windows nt 6.1')?' win7'
          :is('windows nt 6.0')?' vista'
          :is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp' 
          :is('windows nt 5.0')?' win_2k'
          :is('windows nt 4.0') || is('WinNT4.0') ?' win_nt'
          : ''
          ) 
      :is('freebsd')?'freebsd'
      :(is('x11|linux'))?'linux'
      :''
      
      // user agent language
      ,(/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua))?(lang+RegExp.$2).replace("-","_")+(RegExp.$3!=''?(' '+lang+RegExp.$1).replace('-','_'):''):''
    
      // beta: test if running iPad app
      ,( is('ipad|iphone|ipod') && !is('safari') ) ? 'ipad_app' : ''
    
    ]; // b

    function screenSize() {
      var w = window.outerWidth || html.clientWidth;
      var h = window.outerHeight || html.clientHeight;
      uaInfo.orientation = ((w < h) ? 'portrait' : 'landscape');

      // remove previous min-width, max-width, client-width, client-height, and orientation
      html.className = html.className.replace(/ ?orientation_\w+/g, '').replace(/ [min|max|cl]+[w|h]_\d+/g, '')
      for (var i = (allScreens - 1); i >= 0; i--) {
        if (w >= screens[i]) {
          uaInfo.maxw = screens[i];
          break;
        }
      }
      widthClasses = '';
      for (var info in uaInfo) {
        widthClasses += ' ' + info + '_' + uaInfo[info]
      }
      html.className = (html.className + widthClasses);
      return widthClasses;
    }
  
    window.onresize = screenSize;
  screenSize(); 

  var cssbs = (b.join(' ')) + ' js ';
  html.className = (cssbs + html.className.replace(/\b(no[-|_]?)?js\b/g, '')).replace(/^ /, '').replace(/ +/g, ' ');
 
  return cssbs;
}

css_browser_selector(navigator.userAgent);