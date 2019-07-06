/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 08/10/2018 12:37:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_bonus
-- ----------------------------
DROP TABLE IF EXISTS `t_bonus`;
CREATE TABLE `t_bonus` (
  `empno` int(4) NOT NULL,
  `job` varchar(20) DEFAULT NULL,
  `sal` decimal(10,2) DEFAULT NULL,
  `comm` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`empno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_dept
-- ----------------------------
DROP TABLE IF EXISTS `t_dept`;
CREATE TABLE `t_dept` (
  `deptno` int(2) NOT NULL,
  `dname` varchar(20) DEFAULT NULL,
  `loc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`deptno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_dept
-- ----------------------------
BEGIN;
INSERT INTO `t_dept` VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO `t_dept` VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO `t_dept` VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO `t_dept` VALUES (40, 'OPERATIONS', 'BOSTON');
COMMIT;

-- ----------------------------
-- Table structure for t_emp
-- ----------------------------
DROP TABLE IF EXISTS `t_emp`;
CREATE TABLE `t_emp` (
  `empno` int(4) NOT NULL,
  `ename` varchar(20) DEFAULT NULL,
  `job` varchar(20) DEFAULT NULL,
  `mgr` int(4) DEFAULT NULL,
  `hiredate` date DEFAULT NULL,
  `sal` decimal(10,2) DEFAULT NULL,
  `comm` decimal(10,2) DEFAULT NULL,
  `deptno` int(2) DEFAULT NULL,
  PRIMARY KEY (`empno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_emp
-- ----------------------------
BEGIN;
INSERT INTO `t_emp` VALUES (7369, 'SMITH', 'CLERK', 7902, '1980-12-17 00:00:00', 800.00, NULL, 20);
INSERT INTO `t_emp` VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20 00:00:00', 1600.00, 300.00, 30);
INSERT INTO `t_emp` VALUES (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22 00:00:00', 1250.00, 500.00, 30);
INSERT INTO `t_emp` VALUES (7566, 'JONES', 'MANAGER', 7839, '1981-04-02 00:00:00', 2975.00, NULL, 20);
INSERT INTO `t_emp` VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28 00:00:00', 1250.00, 1400.00, 30);
INSERT INTO `t_emp` VALUES (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01 00:00:00', 2850.00, NULL, 30);
INSERT INTO `t_emp` VALUES (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09 00:00:00', 2450.00, NULL, 10);
INSERT INTO `t_emp` VALUES (7788, 'SCOTT', 'ANALYST', 7566, '1982-12-09 00:00:00', 3000.00, NULL, 20);
INSERT INTO `t_emp` VALUES (7839, 'KING', 'PRESIDENT', NULL, '1981-11-17 00:00:00', 5000.00, NULL, 10);
INSERT INTO `t_emp` VALUES (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08 00:00:00', 1500.00, 0.00, 30);
INSERT INTO `t_emp` VALUES (7876, 'ADAMS', 'CLERK', 7788, '1983-01-12 00:00:00', 1100.00, NULL, 20);
INSERT INTO `t_emp` VALUES (7900, 'JAMES', 'CLERK', 7698, '1981-12-03 00:00:00', 950.00, NULL, 30);
INSERT INTO `t_emp` VALUES (7902, 'FORD', 'ANALYST', 7566, '1981-12-03 00:00:00', 3000.00, NULL, 20);
INSERT INTO `t_emp` VALUES (7934, 'MILLER', 'CLERK', 7782, '1982-01-23 00:00:00', 1300.00, NULL, 10);
COMMIT;

-- ----------------------------
-- Table structure for t_salgrade
-- ----------------------------
DROP TABLE IF EXISTS `t_salgrade`;
CREATE TABLE `t_salgrade` (
  `grade` int(11) NOT NULL,
  `losal` decimal(10,2) DEFAULT NULL,
  `hisal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_salgrade
-- ----------------------------
BEGIN;
INSERT INTO `t_salgrade` VALUES (1, 700.00, 1200.00);
INSERT INTO `t_salgrade` VALUES (2, 1201.00, 1400.00);
INSERT INTO `t_salgrade` VALUES (3, 1401.00, 2000.00);
INSERT INTO `t_salgrade` VALUES (4, 2001.00, 3000.00);
INSERT INTO `t_salgrade` VALUES (5, 3001.00, 9999.00);
COMMIT;

-- ----------------------------
-- Table structure for t_emp_ip
-- ----------------------------
DROP TABLE IF EXISTS `t_emp_ip`;
CREATE TABLE `t_emp_ip`  (
  `id` int(11) NOT NULL,
  `empno` int(11) NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `empno`(`empno`) USING BTREE,
  UNIQUE INDEX `ip`(`ip`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;