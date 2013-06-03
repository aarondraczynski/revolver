/**
 * Revolver
 * (c) 2013 Aaron Draczynski
 * ================================
 * http://www.papermodelplane.com
 * http://twitter.com/developer
 * ================================
 * Revolver is freely distributed under the GNU General Public License.
 *
 */

require.config({
  shim: {
    'ember': {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember',
    },
    'data': {
      deps: ['ember'],
      exports: 'DS',
    },
    'handlebars': {
      exports: 'handlebars',
    },
    'tagahead': ['jquery'],
    'table': ['jquery'],
    'toggle': ['jquery'],
    'drop': {
      deps: ['jquery'],
      exports: 'Dropzone'
    },
    'app': ['ember', 'data', 'jquery', 'handlebars', 'tagahead', 'table', 'toggle', 'drop']
  },

  paths: {
    ember: 'lib/ember',
    data: 'lib/data',
    jquery: 'lib/jquery',
    handlebars: 'lib/handlebars',
    tagahead: 'lib/tagahead',
    table: 'lib/table',
    toggle: 'lib/toggle',
    drop: 'lib/drop'
  }
});

require([
  'ember',
  'data',
  'jquery',
  'handlebars',
  'tagahead',
  'table',
  'toggle',
  'drop',
  'app'],
  function($, Ember, DS, handlebars, Dropzone) {
    (function($){
      $('html').removeClass('no-js');
    })(jQuery);
  }
);
