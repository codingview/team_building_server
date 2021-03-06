/*
 Navicat MySQL Data Transfer

 Source Server         : dev@localhost
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : team_building

 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 12/24/2017 14:04:55 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `catalog_id` int(11) NOT NULL,
  `md5` varchar(255) NOT NULL,
  `abstract` varchar(255) DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `rich_text` text,
  `text` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
