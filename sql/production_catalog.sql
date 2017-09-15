/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : team_building

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-09-15 20:11:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for production_catalog
-- ----------------------------
DROP TABLE IF EXISTS `production_catalog`;
CREATE TABLE `production_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `grade` int(11) NOT NULL,
  `sequence` int(11) NOT NULL,
  `father_id` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `production_catalog_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of production_catalog
-- ----------------------------
INSERT INTO `production_catalog` VALUES ('1', '团建拓展', '1', '0', null, '', '2017-09-15 15:46:23', '2017-09-15 15:46:26');
INSERT INTO `production_catalog` VALUES ('2', '常规拓展', '2', '1', '1', '', '2017-09-15 15:47:02', '2017-09-15 15:47:06');
