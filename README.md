Revolver
========
by Aaron Draczynski

[http://www.papermodelplane.com/](http://www.papermodelplane.com/)

[http://twitter.com/developer](http://twitter.com/developer)

---

Revolver is a media player and scripting platform for 37signals' Campfire chat service.

* Create an organized library of animated GIFs, sounds, and video clips for playback within your chat room.
* Write custom scripts and applications that are triggered by certain commands or keywords in messages.

This codebase is for the Revolver Web Companion, which you can install on a server for shared use within your organization.

### Revolver Web Companion
The Revolver Web Companion makes it easy to upload and manage media for sharing in chat.

* A centralized GIF, sound, and video library for your team.
* Drag and drop to upload new media files to the library.
* The upload area says "om nom nom" when you drop a file on it (killer feature).
* Add tags to your GIFs, sounds, and videos.
* Instantly search through media in the library -- results appear as you type, no waiting.
* Browse media by tags.
* Sort media by name, duration, or upload date.
* Preview media from within the library interface.
* Seeder script makes it easy to jumpstart your library with an existing collection of .mp3 sound bites (GIF and video importers coming soon).

### Revolver Platform
Inside of the Web Companion you'll find the Platform management screen, which makes it simple to extend Campfire with your own custom scripts and applications.

* No command line, code commits, or deploys -- Revolver lets you build a script and launch it with one click.
* Create simple modifiers that re-format or re-style a message when users type a certain phrase or command.
* Create more robust scripts that are activated when users type a certain phrase or command.
* Pass data to a third-party server for processing and response for more dynamic applications.

Currently, Revolver is only compatible when used with the [Propane](http://propaneapp.com/) Campfire chat client for Mac. Propane provides limited user-scripting support that Revolver needs. While Revolver itself lives mainly on the server, a separate JavaScript file for Propane called **caveatPatchor.js** (included) needs to be installed on the client to handle local media playback and processing of new scripts. A browser extension is in development which will enable Revolver functionality and scripting inside of the standard Campfire web-based client.

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

Before you setup the Revolver Web Companion, ensure that your server environment is compatible with the technologies listed above.

** Create database **
MySQL database credentials should be supplied in _app/config/database.php_. A SQL database dump is included for schema generation. Importantly, this database dump includes records for Revolver's built-in scripts in the **scripts** table.

A seeder script (_app/database/seeds/SoundsSeeder.php_) is provided for taking an existing set of .mp3 files on the server and processing them into the Revolver database.

** Install dependencies **
In the Revolver directory on your server, run _php composer.phar install_ on the command line to download the Laravel framework and necessary dependencies.

** Apache DocumentRoot **
You'll need to change your web server's document root path to the _public_ folder, as per the default behavior of the Laravel framework. In your Apache virtual host config, make sure your DocumentRoot is set to /var/www/public. If you do not wish to do this, consult the Laravel forums for [some workarounds](http://forums.laravel.io/viewtopic.php?pid=48975).

** Set permissions **
Ensure the following files/paths are writable on the server:

* public/libraries/payload.js
* public/libraries/user/scripts/
* public/libraries/user/sounds/
* public/libraries/user/videos/

** Client installation **

Chat participants will each need a copy of **caveatPatchor.js** on their system (included), with line 16 edited to reflect the URL where you installed the Revolver Web Companion. The JS file should be dropped into Propane's _~/Library/Application Support/Propane/unsupported/_ folder. This file is what enables Propane to play media and process commands from your Revolver installation.

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
