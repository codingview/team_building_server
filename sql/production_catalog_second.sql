/*
 Navicat MySQL Data Transfer

 Source Server         : dev@localhost
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : team_building

 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 12/10/2017 21:18:47 PM
*/

SET NAMES utf8;

-- ----------------------------
--  Table structure for `production_catalog_second`
-- ----------------------------
DROP TABLE IF EXISTS `production_catalog_second`;
CREATE TABLE `production_catalog_second` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `first_catalog_id` int(11) NOT NULL,
  `sequence` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `home_show` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `production_catalog_second`
-- ----------------------------
