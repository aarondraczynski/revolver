Revolver
========
by Aaron Draczynski

[http://www.papermodelplane.com/](http://www.papermodelplane.com/)

[http://twitter.com/developer](http://twitter.com/developer)

---

Revolver is a media player and scripting platform for 37signals' Campfire chat service.

This codebase is for the Revolver Web Companion, which you can install on a server for shared use within your organization.

Currently, Revolver is only compatible with the [Propane](http://propaneapp.com/) Campfire chat client for Mac, which provides limited user-scripting support that Revolver needs. While Revolver itself lives mainly on the server, a separate JavaScript file for Propane called **caveatPatchor.js** (included) needs to be installed on the client to handle local media playback and processing of new scripts. A browser extension is in development which will enable Revolver functionality and scripting inside of the standard Campfire web-based client.

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
* Seeder script makes it easy to jumpstart your library with an existing collection of .mp3 sound bites (GIF and video importers coming soon).

### Revolver Platform
The Revolver platform makes it simple to extend Campfire.

* No command line, code commits, or deploys -- Revolver lets you build a script and launch it with one click.
* Create simple modifiers that re-format or re-style a message when users type a certain phrase or command.
* Create more robust scripts that are activated when users type a certain phrase or command.
* Pass data to a third-party server for processing and response for more dynamic applications.

---

Revolver was built using the following technologies:

#### Application
* **Laravel 4** - PHP API backend
* **Composer** - dependency management
* **Node.js** - backend services
* **Ember** - frontend MVC
* **Handlebars** - frontend templating
* **Require.js** - JS modularization
* **jQuery** - for plugins

#### Server
* **Rackspace Cloud**
  * Apache, PHP 5.4, MySQL 5.5, ffmpeg
* **CloudFlare**
  * optional global CDN / caching

---

### Installation

MySQL database credentials should be supplied in _app/config/database.php_. A SQL database dump is included for schema generation. The database dump also includes records for Revolver's built-in scripts in the **scripts** table. If you prefer, you can use the Artisan CLI to run the included migrations instead.

A seeder script (_app/database/seeds/SoundsSeeder.php_) is also provided for taking an existing set of .mp3 files on the server and processing them through the Revolver database.

Ensure the following files/paths are writable on the server:

* public/libraries/payload.js
* public/libraries/user/scripts/
* public/libraries/user/sounds/
* public/libraries/user/videos/

Chat participants will each need a copy of **caveatPatchor.js** on their system, with line 16 edited to reflect the URL of your Revolver installation. The JS file should be dropped into Propane's _~/Library/Application Support/Propane/unsupported/_ folder. This file is what enables Propane to play media and process commands from your Revolver installation.

---

### Frequently asked questions

* **Why Revolver for chat room scripting and not a bot?**

  Bots are great, and there are lots of use cases where bots can do a better job than a client-side script processor. The goal of Revolver is to make it easy for anyone to build custom commands and functionality in their chat room, and to launch it with one click without having to commit code or manage a bot. Revolver's script-building interface will become significantly more robust over time, unlocking new features for rich client experiences through its visual interface such as room targeting, user targeting, integration of custom apps within the chat room UI, crawling data from external websites, and more.

* **How do I export / import scripts for the Revolver platform?**

  This functionality is planned for the next release.

* **How does Revolver handle my organization's private chat data?**

  The Revolver codebase lives on your server and is open to your scrutiny (same goes for the client-side JS portion). Revolver does not phone home, nor does it save any chat messages, logs, or user data to disk. Any custom scripts that members of your organization build on top of the Revolver platform could send message data to remote servers if they're specifically designed/coded to do that. That's up to you to handle.

* **Why are there no user accounts for the Revolver Web Companion?**

  The Web Companion was initially designed to link with a person's Campfire client via a two-way sync system, but this was pushed from the 1.0 release. Linking users of the Web Companion with their Campfire identity is still under evaluation.

* **Why do I need Propane to use Revolver?**

  Revolver was initially developed as a userscript for Propane, and even though it has evolved significantly, it still relies on Propane's scripting layer to insert itself into the chat room to play media and run commands. A browser extension that enables Revolver in the standard Campfire web client is in development.
