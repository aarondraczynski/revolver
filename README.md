Revolver
========
by Aaron Draczynski

[http://www.papermodelplane.com/](http://www.papermodelplane.com/)

[http://twitter.com/developer](http://twitter.com/developer)

---

Revolver is a media player and scripting platform for 37signals' Campfire chat service.

This codebase is for the Revolver Web Companion, which you install on a server for use within your organization.

Currently, Revolver is only compatible with the [Propane](http://propaneapp.com/) Campfire chat client for Mac, which provides limited user-scripting support that Revolver needs. While Revolver itself lives mainly on the server, a separate JavaScript file for Propane called _caveatPatchor.js_ needs to be installed on the client to handle local media playback and processing of new scripts. A browser extension is in development which will enable Revolver functionality and scripting inside of the standard Campfire web-based client.

### Revolver Web Companion
The Revolver web companion makes it easy to upload and manage media for sharing in chat.

* A GIF, sound, and video library for your team.
* Drag and drop to upload new media to the library.
* The upload area says "om nom nom" when you drop a file on it (killer feature).
* Add tags to GIFs, videos, and sounds.
* Instantly search through media in library -- results appear as you type, no waiting.
* Browse media by tags.
* Sort media by name, duration, uploader, or upload date.
* Preview media from within the library interface.
* Import command makes it easy to jumpstart your library with an existing collection of .mp3 sound bites (GIF and video importers coming soon).

### Revolver Platform
The Revolver platform makes it simple to extend Campfire.

* No command line, code commits, or deploys -- Revolver lets you build a script and launch it with one click.
* Create simple modifiers that re-format or re-style a message when users type a certain phrase or command.
* Create more robust scripts that are activated when users type a certain phrase or command.
* Pass data to a third-party server for processing and response for more dynamic applications.

---

Revolver was built using the following technologies:

### Application-level
* **Laravel 4** - PHP API backend
* **Composer** - dependency management
* **Node.js** - backend services
* **Ember** - frontend MVC
* **Handlebars** - frontend templating
* **Require.js** - JS modularization
* **jQuery** - JS plugin requirement

### Server-level
* **Rackspace Cloud**
  * Apache, PHP, MySQL, ffmpeg
* **CloudFlare**
