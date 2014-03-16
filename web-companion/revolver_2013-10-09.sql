# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.30-1~dotdeb.0)
# Database: revolver
# Generation Time: 2013-10-10 01:22:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table gif_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `gif_tags`;

CREATE TABLE `gif_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gif_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table gifs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `gifs`;

CREATE TABLE `gifs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `remote_name` varchar(255) NOT NULL DEFAULT '',
  `plays` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table scripts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `scripts`;

CREATE TABLE `scripts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(10) unsigned NOT NULL,
  `delayed` int(10) unsigned NOT NULL,
  `protected` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `scripts` WRITE;
/*!40000 ALTER TABLE `scripts` DISABLE KEYS */;

INSERT INTO `scripts` (`id`, `active`, `delayed`, `protected`, `name`, `description`, `created_at`, `updated_at`)
VALUES
	(1,1,0,1,'Text formatting','Enables <b>, <i>, <strike>, <marquee>, <giant>, <tiny>, <red>, <green>, <blue>, <impact>, <papyrus>, and <comicsans> tags.','2013-06-01 12:00:00','2013-06-03 19:24:21'),
	(2,1,0,1,'Link helper','Crawls OGP data to display a title and description for links posted in chat. To use, type /link before a URL.','2013-06-01 12:00:00','2013-06-03 19:13:52'),
	(3,1,1,1,'Rich tweet embeds','Displays an official embedded tweet with inline media like photos, videos, or article summaries. To use, paste a tweet URL in chat.','2013-06-01 12:00:00','2013-10-01 18:53:34'),
	(4,1,0,1,'Spotify URI helper','Converts spotify:track:<id> into a link that will open the song in Spotify.','2013-10-01 18:17:29','2013-10-01 19:03:23'),
	(5,1,1,1,'YouTube video helper','Displays additional information about a YouTube video link.','2013-10-04 21:21:04','2013-10-04 21:21:04'),
	(6,1,0,1,'Reaction faces','Add rage faces to your messages, like :pokerface: or :happy: or :fffuuu:. Type /reactionfaces to see all available rage face macros.','2013-06-01 12:00:00','2013-10-01 18:42:06'),
	(7,1,0,1,'/striketroll','Strikes out the previous message.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(8,1,0,1,'/fliptroll','Flips the previous message backwards.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(9,1,0,1,'/marqueetroll','Makes the previous message scroll from right to left.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(10,1,0,1,'/flipmarqueetroll','Makes the previous message scroll from left to right.','2013-06-01 12:00:00','2013-06-03 10:58:16'),
	(11,0,0,1,'/fastmarqueetroll','20% faster than the standard marquee troll.','2013-06-01 12:00:00','2013-08-16 04:47:02'),
	(12,0,0,1,'/fastermarqueetroll','40% faster than the standard marquee troll.','2013-06-01 12:00:00','2013-06-03 10:58:54'),
	(13,1,0,1,'Garbage collection','Typing /gc will generate a link to remove all inline animated GIFs and marquees.','2013-06-01 12:00:00','2013-10-01 18:52:08');

/*!40000 ALTER TABLE `scripts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sound_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sound_tags`;

CREATE TABLE `sound_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sound_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sounds
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sounds`;

CREATE TABLE `sounds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int(10) unsigned NOT NULL,
  `plays` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table video_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_tags`;

CREATE TABLE `video_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `extension` varchar(5) NOT NULL,
  `duration` int(10) unsigned NOT NULL,
  `plays` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
