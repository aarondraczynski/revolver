# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.30-1~dotdeb.0)
# Database: revolver
# Generation Time: 2013-06-04 02:22:01 +0000
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

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`migration`, `batch`)
VALUES
	('2013_02_28_014815_create_sounds_table',1),
	('2013_02_28_014815_create_gifs_table',1),
	('2013_02_28_014815_create_videos_table',1),
	('2013_02_28_014815_create_scripts_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table scripts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `scripts`;

CREATE TABLE `scripts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(10) unsigned NOT NULL,
  `protected` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `scripts` WRITE;
/*!40000 ALTER TABLE `scripts` DISABLE KEYS */;

INSERT INTO `scripts` (`id`, `active`, `protected`, `name`, `description`, `created_at`, `updated_at`)
VALUES
	(1,1,1,'Text formatting','Enables <b>, <i>, <strike>, <marquee>, <giant>, <tiny>, <red>, <green>, <blue>, <impact>, <papyrus>, and <comicsans>.','2013-06-01 12:00:00','2013-06-03 19:24:21'),
	(2,1,1,'Links','Crawls OGP data to display rich link info. To use, type /link before a URL.','2013-06-01 12:00:00','2013-06-03 19:13:52'),
	(3,1,1,'/striketroll','Strikes out the previous message.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(4,1,1,'/fliptroll','Flips the previous message backwards.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(5,1,1,'/marqueetroll','Makes the previous message scroll across the screen from right to left.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(6,0,1,'/fastmarqueetroll','20% faster than the standard marquee troll.','2013-06-01 12:00:00','2013-06-03 11:05:04'),
	(7,0,1,'/fastermarqueetroll','40% faster than the standard marquee troll.','2013-06-01 12:00:00','2013-06-03 10:58:54'),
	(8,1,1,'/flipmarqueetroll','Makes the previous message scroll across the screen from left to right.','2013-06-01 12:00:00','2013-06-03 10:58:16'),
	(9,1,1,'Fake tweet','/tweet @username [profile image URL] [text]','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(10,0,1,'Garbage collection','Typing /gc will generate a link to collapse all inline animated GIFs and marquees.','2013-06-01 12:00:00','2013-06-01 12:00:00'),
	(11,1,1,'Reaction faces','Add rage face reactions to your messages, like :pokerface:. Type /reactionfaces to see all available options.','2013-06-01 12:00:00','2013-06-01 12:00:00');

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
