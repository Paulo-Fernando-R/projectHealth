CREATE DATABASE  IF NOT EXISTS `healthstablishments` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `healthstablishments`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: healthstablishments
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `cityCode` varchar(6) NOT NULL,
  `cityName` varchar(60) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`internalId`,`cityCode`),
  KEY `cityCode` (`cityCode`)
) ENGINE=InnoDB AUTO_INCREMENT=33643 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `legalnature`
--

DROP TABLE IF EXISTS `legalnature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legalnature` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `natureCode` varchar(4) NOT NULL,
  `natureDescription` varchar(100) NOT NULL,
  PRIMARY KEY (`internalId`,`natureCode`),
  KEY `natureCode` (`natureCode`)
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `openinghours`
--

DROP TABLE IF EXISTS `openinghours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `openinghours` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `dayCode` tinyint(1) NOT NULL,
  `startHour` varchar(8) NOT NULL,
  `endHour` varchar(8) NOT NULL,
  `lastUpdate` date NOT NULL,
  `stablishmentSusId` varchar(31) NOT NULL,
  PRIMARY KEY (`internalId`),
  KEY `fk_openingHours_stablishment1_idx` (`stablishmentSusId`),
  CONSTRAINT `fk_openingHours_stablishment1` FOREIGN KEY (`stablishmentSusId`) REFERENCES `stablishment` (`susId`)
) ENGINE=InnoDB AUTO_INCREMENT=8454016 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `serviceCode` varchar(3) NOT NULL,
  `serviceDescription` varchar(60) NOT NULL,
  PRIMARY KEY (`internalId`,`serviceCode`),
  KEY `serviceCode` (`serviceCode`)
) ENGINE=InnoDB AUTO_INCREMENT=433 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stablishment`
--

DROP TABLE IF EXISTS `stablishment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stablishment` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `susId` varchar(31) NOT NULL,
  `cnes` varchar(7) NOT NULL,
  `personType` tinyint(1) NOT NULL,
  `socialReason` varchar(60) NOT NULL,
  `fantasyName` varchar(60) NOT NULL,
  `addressNumber` varchar(10) DEFAULT NULL,
  `address` varchar(60) NOT NULL,
  `addressComplement` varchar(20) DEFAULT NULL,
  `addressDistrict` varchar(40) NOT NULL,
  `addressCep` varchar(8) NOT NULL,
  `state` varchar(2) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `cnpj` varchar(15) DEFAULT NULL,
  `lastUpdate` date NOT NULL,
  `deactivationCode` varchar(2) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `latitude` varchar(30) DEFAULT NULL,
  `longitude` varchar(30) DEFAULT NULL,
  `alwaysOpen` varchar(1) DEFAULT NULL,
  `contractWithSus` varchar(1) DEFAULT NULL,
  `unitTypeCode` smallint NOT NULL,
  `stablishmentTypeCode` smallint NOT NULL,
  `cityCode` varchar(6) NOT NULL,
  `legalNatureCode` varchar(4) NOT NULL,
  PRIMARY KEY (`susId`,`cnes`),
  UNIQUE KEY `internalId_UNIQUE` (`internalId`),
  KEY `fk_stablishment_unitType1_idx` (`unitTypeCode`),
  KEY `fk_stablishment_stablishmentType1_idx` (`stablishmentTypeCode`),
  KEY `fk_stablishment_city1_idx` (`cityCode`),
  KEY `fk_stablishment_legalNature1_idx` (`legalNatureCode`),
  KEY `susId` (`susId`),
  CONSTRAINT `fk_stablishment_city1` FOREIGN KEY (`cityCode`) REFERENCES `city` (`cityCode`),
  CONSTRAINT `fk_stablishment_legalNature1` FOREIGN KEY (`legalNatureCode`) REFERENCES `legalnature` (`natureCode`),
  CONSTRAINT `fk_stablishment_stablishmentType1` FOREIGN KEY (`stablishmentTypeCode`) REFERENCES `stablishmenttype` (`typeCode`),
  CONSTRAINT `fk_stablishment_unitType1` FOREIGN KEY (`unitTypeCode`) REFERENCES `unittype` (`typeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=589816 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stablishmentservice`
--

DROP TABLE IF EXISTS `stablishmentservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stablishmentservice` (
  `stablishmentSusId` varchar(31) NOT NULL,
  `serviceCode` varchar(3) NOT NULL,
  PRIMARY KEY (`stablishmentSusId`,`serviceCode`),
  KEY `fk_stablishment_has_service_service1_idx` (`serviceCode`),
  KEY `fk_stablishment_has_service_stablishment1_idx` (`stablishmentSusId`),
  CONSTRAINT `fk_stablishment_has_service_service1` FOREIGN KEY (`serviceCode`) REFERENCES `service` (`serviceCode`),
  CONSTRAINT `fk_stablishment_has_service_stablishment1` FOREIGN KEY (`stablishmentSusId`) REFERENCES `stablishment` (`susId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stablishmenttype`
--

DROP TABLE IF EXISTS `stablishmenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stablishmenttype` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `typeCode` smallint NOT NULL,
  `typeDescription` varchar(100) NOT NULL,
  PRIMARY KEY (`internalId`,`typeCode`),
  KEY `typeCode` (`typeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tempstablishment`
--

DROP TABLE IF EXISTS `tempstablishment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempstablishment` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `susId` varchar(31) NOT NULL,
  `cnes` varchar(7) NOT NULL,
  `personType` tinyint(1) NOT NULL,
  `socialReason` varchar(60) NOT NULL,
  `fantasyName` varchar(60) NOT NULL,
  `addressNumber` varchar(10) DEFAULT NULL,
  `address` varchar(60) NOT NULL,
  `addressComplement` varchar(20) DEFAULT NULL,
  `addressDistrict` varchar(40) NOT NULL,
  `addressCep` varchar(8) NOT NULL,
  `state` varchar(2) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `cnpj` varchar(15) DEFAULT NULL,
  `lastUpdate` date NOT NULL,
  `deactivationCode` varchar(2) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `latitude` varchar(30) DEFAULT NULL,
  `longitude` varchar(30) DEFAULT NULL,
  `alwaysOpen` varchar(1) DEFAULT NULL,
  `contractWithSus` varchar(1) DEFAULT NULL,
  `unitTypeCode` smallint NOT NULL,
  `stablishmentTypeCode` smallint NOT NULL,
  `cityCode` varchar(6) NOT NULL,
  `legalNatureCode` varchar(4) NOT NULL,
  PRIMARY KEY (`susId`,`cnes`),
  UNIQUE KEY `internalId_UNIQUE` (`internalId`),
  KEY `fk_stablishment_unitType1_idx` (`unitTypeCode`),
  KEY `fk_stablishment_stablishmentType1_idx` (`stablishmentTypeCode`),
  KEY `fk_stablishment_city1_idx` (`cityCode`),
  KEY `fk_stablishment_legalNature1_idx` (`legalNatureCode`),
  KEY `susId` (`susId`)
) ENGINE=InnoDB AUTO_INCREMENT=589816 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unittype`
--

DROP TABLE IF EXISTS `unittype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unittype` (
  `internalId` int NOT NULL AUTO_INCREMENT,
  `typeCode` smallint NOT NULL,
  `typeDescription` varchar(100) NOT NULL,
  PRIMARY KEY (`internalId`,`typeCode`),
  KEY `typeCode` (`typeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 14:19:40
