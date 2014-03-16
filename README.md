Revolver
========
by Aaron Draczynski

[http://www.papermodelplane.com/](http://www.papermodelplane.com/)

[http://twitter.com/developer](http://twitter.com/developer)

---

Revolver is a suite of enhancements for [Slack](http://slack.com) and [Campfire](http://campfirenow.com) team chat services.

* Upload and organize a library of animated GIFs, sounds, and video clips for playback within your chat room.
* Play your uploaded media in chat by typing commands like "/sound laughtrack" or "/clip rickroll".
* Write custom scripts and applications that are triggered by certain commands or keywords in messages.

This repository contains code for both the Revolver web companion software (set it up on a server somewhere for your team) and the required client script (which each user will need to install).

### Revolver web companion
The Revolver web companion makes it easy for your entire team to upload and manage media for use in chat.

* A centralized GIF, sound, and video library for your team.
* Drag and drop to upload new media files to the library.
* The upload area says "om nom nom" when you drop a file on it (killer feature).
* Add tags to your GIFs, sounds, and videos.
* Instantly search through media in the library -- results appear as you type, no waiting.
* Browse media by tags.
* Sort media by name, duration, or upload date.
* Preview media from within the library interface.
* Seeder script makes it easy to jumpstart your library with an existing collection of .mp3 sound bites.

Inside of the web companion, you'll find the Platform management screen which makes it simple to extend your chat room with custom scripts and applications.

* No command line, code commits, or deploys -- Revolver lets you build a script and launch it with one click.
* Create simple modifiers that re-format or re-style a message when users type a certain phrase or command.
* Create more robust scripts that are activated when users type a certain phrase or command.
* Pass data to a third-party server for processing and response for more dynamic applications.

### Revolver client script

**Slack**
Slack users who want to experience Revolver-powered functionality in chat (like media playback) will need to install the client script, included in this repository. For anyone using the browser-based Slack web client, it can easily be installed as a userscript in your browser. If you prefer to use a standalone desktop app, you can generate a site-specific app for Slack using [Fluid for Mac](http://fluidapp.com/) and install the Revolver client script as a userscript there. For more details, see "Installing the client script" below.

**Campfire**
For Campfire users, Revolver is only compatible when used with the [Propane](http://propaneapp.com/) Campfire chat client for Mac. Propane provides limited userscripting support that Revolver needs. The Revolver client script for Propane, called **caveatPatchor.js** (included in this repository), needs to be installed by the user to handle Revolver-powered functionality like media playback and processing of your team's custom scripts. For more instructions, see "Installing the client script" below.

---

Revolver is powered by the following technologies:

* **Laravel 4** - PHP API backend
* **Composer** - dependency management
* **Node.js** - backend services
* **Ember** - frontend MVC
* **Handlebars** - frontend templating
* **Require.js** - JS modularization
* **jQuery** - for plugins

---

### Installing the Revolver web companion
Before you setup the Revolver web companion, ensure that your server environment is compatible with the technologies listed above.

#### Create database
MySQL database credentials should be supplied in _app/config/database.php_. A SQL database dump is included for schema generation. Importantly, this database dump includes records for Revolver's built-in scripts in the **scripts** table.

A seeder script (_app/database/seeds/SoundsSeeder.php_) is provided for taking an existing set of .mp3 files on the server and processing them into the Revolver database.

#### Install dependencies
In the Revolver directory on your server, invoke Composer by running _php composer.phar install_ on the command line to download the Laravel framework and necessary dependencies.

#### Set Apache DocumentRoot
You'll need to change your web server's document root path to the _public_ folder, as per the [expected behavior of the Laravel framework](http://laravel.com/docs/installation#configuration). In your Apache virtual host config, make sure DocumentRoot is set to the "public" directory path (i.e. /var/www/public). If you do not wish to do this, consult the Laravel forums for [some workarounds](http://forums.laravel.io/viewtopic.php?pid=48975).

#### Set permissions
Ensure the following files/paths are writable on the server:

* public/libraries/payload.js
* public/libraries/user/scripts/
* public/libraries/user/sounds/
* public/libraries/user/videos/

#### Installing the client script
As mentioned above in the "Revolver client script" section, all chat participants will need to install a copy of the client script. This file is what enables Campfire or Slack to play media and process commands from your Revolver system.

Regardless of which chat service your team uses, line 16 of the Revolver client script **must be edited** to reflect the URL where you installed the web companion for your organization. 

**Slack**
After editing the base URL on line 16, Slack users who are running the Slack web client in their browser can install **revolver-client.js** as a userscript with the help of an extension like [Scriptish for Firefox](https://addons.mozilla.org/en-US/firefox/addon/scriptish/) or [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). The official Slack desktop app for Mac can't be configured to use Revolver; but if you prefer to use a standalone desktop app, you can generate your own site-specific app for Slack using [Fluid for Mac](http://fluidapp.com/) and install the Revolver client script as a userscript there.

**Campfire**
After editing the base URL on line 16, Campfire users will need to place **caveatPatchor.js** into Propane's _~/Library/Application Support/Propane/unsupported/_ folder.

---

### Frequently asked questions

* **Why Revolver for chat room scripting and not a bot?**

  Bots are great, and there are lots of use cases where bots can do a better job than a client-side script processor. The goal of Revolver is to make it easy for anyone to build custom commands and functionality in their chat room, and to launch it with one click without having to commit code or manage a bot. Revolver's script-building interface will become significantly more robust over time, unlocking new features for rich client experiences through its visual interface such as room targeting, user targeting, integration of custom apps within the chat room UI, crawling data from external websites, and more.

* **How do I export / import scripts for the Revolver platform?**

  This functionality is planned for a future release.

* **How does Revolver handle my organization's private chat data?**

  The Revolver codebase lives on your server and is open to your scrutiny (same goes for the client-side JS portion). Revolver does not phone home, nor does it save any chat messages, logs, or user data to disk. Any custom scripts that members of your organization build on top of the Revolver platform could send message data to remote servers if they're specifically designed/coded to do that. That's up to you to handle.
