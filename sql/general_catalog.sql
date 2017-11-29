/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : team_building

 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 11/29/2017 18:38:42 PM
*/

SET NAMES utf8;

-- ----------------------------
--  Table structure for `general_catalog`
-- ----------------------------
DROP TABLE IF EXISTS `general_catalog`;
CREATE TABLE `general_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sequence` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `general_catalog`
-- ----------------------------