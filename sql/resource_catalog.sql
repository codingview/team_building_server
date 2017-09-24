/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : team_building

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-09-24 11:49:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for resource_catalog
-- ----------------------------
DROP TABLE IF EXISTS `resource_catalog`;
CREATE TABLE `resource_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `grade` int(11) NOT NULL,
  `sequence` int(11) NOT NULL,
  `father_id` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource_catalog
-- ----------------------------
INSERT INTO `resource_catalog` VALUES ('1', '北京郊区基地', '1', '0', '0', null, '2017-09-24 11:46:58', '2017-09-24 11:47:01');
INSERT INTO `resource_catalog` VALUES ('2', '北京城区基地', '1', '1', '0', null, '2017-09-24 11:47:43', '2017-09-24 11:47:45');
INSERT INTO `resource_catalog` VALUES ('3', '海边基地', '1', '2', '0', null, '2017-09-24 11:48:02', '2017-09-24 11:48:04');
INSERT INTO `resource_catalog` VALUES ('4', '草原基地', '1', '3', '0', null, '2017-09-24 11:48:18', '2017-09-24 11:48:20');
INSERT INTO `resource_catalog` VALUES ('5', '沙漠基地', '1', '4', '0', null, '2017-09-24 11:48:32', '2017-09-24 11:48:35');
INSERT INTO `resource_catalog` VALUES ('6', '全国基地', '1', '5', '0', null, '2017-09-24 11:48:45', '2017-09-24 11:48:48');
