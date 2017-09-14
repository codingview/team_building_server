/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : team_building

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-09-14 14:22:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `sequence` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('1', '/banner/1.jpeg', '55555', '/active/1', '0', '2017-09-11 17:47:04', '2017-09-11 17:47:06');
INSERT INTO `banner` VALUES ('2', '/banner/2.jpeg', '2222', '/active/2', '1', '2017-09-14 14:21:19', '2017-09-14 14:21:23');
INSERT INTO `banner` VALUES ('3', '/banner/3.jpeg', '3333', '/active/3', '2', '2017-09-14 14:21:43', '2017-09-14 14:21:49');
INSERT INTO `banner` VALUES ('4', '/banner/4.jpeg', '444', '/active/4', '3', '2017-09-14 14:22:03', '2017-09-14 14:22:06');
INSERT INTO `banner` VALUES ('5', '/banner/5.jpeg', '5555', '/active/5', '4', '2017-09-14 14:22:18', '2017-09-14 14:22:21');
