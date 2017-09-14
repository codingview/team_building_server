/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : team_building

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-09-14 14:22:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for general_option
-- ----------------------------
DROP TABLE IF EXISTS `general_option`;
CREATE TABLE `general_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `param` (`param`),
  UNIQUE KEY `general_option_param_unique` (`param`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of general_option
-- ----------------------------
