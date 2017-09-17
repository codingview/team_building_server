/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : team_building

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2017-09-17 12:55:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `production_catalog`
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of production_catalog
-- ----------------------------
INSERT INTO `production_catalog` VALUES ('1', '团建拓展', '1', '0', '0', '', '2017-09-17 12:10:44', '2017-09-17 12:10:54');
INSERT INTO `production_catalog` VALUES ('2', '常规拓展', '2', '0', '1', '', '2017-09-17 12:10:55', '2017-09-17 12:10:59');
INSERT INTO `production_catalog` VALUES ('3', '野外拓展', '2', '1', '1', '', '2017-09-17 12:11:17', '2017-09-17 12:11:21');
INSERT INTO `production_catalog` VALUES ('4', '军事拓展', '2', '2', '1', '', '2017-09-17 12:11:23', '2017-09-17 12:11:28');
INSERT INTO `production_catalog` VALUES ('5', '红色体验', '2', '3', '1', '', '2017-09-17 12:11:30', '2017-09-17 12:11:35');
INSERT INTO `production_catalog` VALUES ('6', '青少年管理', '2', '4', '1', '', '2017-09-17 12:11:37', '2017-09-17 12:11:42');
INSERT INTO `production_catalog` VALUES ('7', '主题定制', '2', '5', '1', '', '2017-09-17 12:11:44', '2017-09-17 12:11:49');
INSERT INTO `production_catalog` VALUES ('8', '企业内训', '1', '1', '0', '', '2017-09-17 12:11:53', '2017-09-17 12:11:57');
INSERT INTO `production_catalog` VALUES ('9', '篝火晚会', '2', '6', '1', '', '2017-09-17 12:12:32', '2017-09-17 12:12:39');
INSERT INTO `production_catalog` VALUES ('10', '季节体验', '2', '7', '1', '', '2017-09-17 12:12:48', '2017-09-17 12:12:52');
INSERT INTO `production_catalog` VALUES ('11', '场地拓展', '3', '0', '2', '', '2017-09-17 12:12:58', '2017-09-17 12:13:03');
