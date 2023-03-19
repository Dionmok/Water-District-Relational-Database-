-- MariaDB dump 10.19  Distrib 10.6.8-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: wateragency
-- ------------------------------------------------------
-- Server version	10.6.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `addressID` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `customersCustomerID` int(11) NOT NULL,
  PRIMARY KEY (`addressID`,`customersCustomerID`),
  KEY `fk_addresses_customers1_idx` (`customersCustomerID`),
  CONSTRAINT `fk_addresses_customers1` FOREIGN KEY (`customersCustomerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'220 Nellen Ave','Corte Madera','CA','94925',7),(2,'225 Nellen Ave','Corte Madera','CA','94925',7),(3,'240 Nellen Ave','Corte Madera','CA','94925',7),(4,'10 School St','Fairfax','CA','94930',4),(5,'25 Merwin Ave','Fairfax','CA','94930',5),(6,'156 Acacia Rd','Fairfax','CA','94930',6);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `potableWater` int(11) NOT NULL,
  `recycledWater` int(11) NOT NULL,
  `occupantTypesOccupantType` varchar(20) NOT NULL,
  PRIMARY KEY (`customerID`),
  KEY `fk_customers_occupantTypes1_idx` (`occupantTypesOccupantType`),
  CONSTRAINT `fk_customers_occupantTypes1` FOREIGN KEY (`occupantTypesOccupantType`) REFERENCES `occupanttypes` (`occupantType`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (4,50000,1000,'Commercial'),(5,150,20,'Residential'),(6,20,20,'Residential'),(7,1500000,450000,'Government'),(9,250,100,'Charity');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `material` varchar(10) NOT NULL,
  PRIMARY KEY (`material`),
  UNIQUE KEY `material_UNIQUE` (`material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES ('Concrete'),('Metal'),('Plastic'),('Wood');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `occupanttypes`
--

DROP TABLE IF EXISTS `occupanttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `occupanttypes` (
  `occupantType` varchar(20) NOT NULL,
  PRIMARY KEY (`occupantType`),
  UNIQUE KEY `occupantTypes_UNIQUE` (`occupantType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occupanttypes`
--

LOCK TABLES `occupanttypes` WRITE;
/*!40000 ALTER TABLE `occupanttypes` DISABLE KEYS */;
INSERT INTO `occupanttypes` VALUES ('Charity'),('Commercial'),('Government'),('Residential');
/*!40000 ALTER TABLE `occupanttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources` (
  `sourceName` varchar(120) NOT NULL,
  `waterSupplied` int(11) NOT NULL,
  PRIMARY KEY (`sourceName`),
  UNIQUE KEY `sourceName_UNIQUE` (`sourceName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES ('Americano Creek',100000),('Groundwater',1200000),('Pacific Ocean',50000000),('Rainfall',6000000),('Rush Creek',500000);
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sourceshassourcetypes`
--

DROP TABLE IF EXISTS `sourceshassourcetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sourceshassourcetypes` (
  `sourcesSourceName` varchar(120) NOT NULL,
  `sourceTypesSourceType` varchar(45) NOT NULL,
  PRIMARY KEY (`sourcesSourceName`,`sourceTypesSourceType`),
  KEY `fk_Sources_has_SourceTypes_SourceTypes1_idx` (`sourceTypesSourceType`),
  KEY `fk_Sources_has_SourceTypes_Sources1_idx` (`sourcesSourceName`),
  CONSTRAINT `fk_Sources_has_SourceTypes_SourceTypes1` FOREIGN KEY (`sourceTypesSourceType`) REFERENCES `sourcetypes` (`sourceType`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Sources_has_SourceTypes_Sources1` FOREIGN KEY (`sourcesSourceName`) REFERENCES `sources` (`sourceName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sourceshassourcetypes`
--

LOCK TABLES `sourceshassourcetypes` WRITE;
/*!40000 ALTER TABLE `sourceshassourcetypes` DISABLE KEYS */;
INSERT INTO `sourceshassourcetypes` VALUES ('Americano Creek','Groundwater'),('Americano Creek','Rainfall'),('Americano Creek','River'),('Groundwater','Groundwater'),('Pacific Ocean','Ocean'),('Pacific Ocean','Rainfall'),('Rainfall','Rainfall'),('Rush Creek','Groundwater'),('Rush Creek','Rainfall');
/*!40000 ALTER TABLE `sourceshassourcetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sourcetypes`
--

DROP TABLE IF EXISTS `sourcetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sourcetypes` (
  `sourceType` varchar(45) NOT NULL,
  PRIMARY KEY (`sourceType`),
  UNIQUE KEY `sourceType_UNIQUE` (`sourceType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sourcetypes`
--

LOCK TABLES `sourcetypes` WRITE;
/*!40000 ALTER TABLE `sourcetypes` DISABLE KEYS */;
INSERT INTO `sourcetypes` VALUES ('Creek'),('Groundwater'),('Ocean'),('Rainfall'),('River');
/*!40000 ALTER TABLE `sourcetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagehasaddresses`
--

DROP TABLE IF EXISTS `storagehasaddresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storagehasaddresses` (
  `storageStorageID` int(11) NOT NULL,
  `addressesAddressID` int(11) NOT NULL,
  PRIMARY KEY (`storageStorageID`,`addressesAddressID`),
  KEY `fk_storage_has_addresses_addresses1_idx` (`addressesAddressID`),
  KEY `fk_storage_has_addresses_storage1_idx` (`storageStorageID`),
  CONSTRAINT `fk_storage_has_addresses_addresses1` FOREIGN KEY (`addressesAddressID`) REFERENCES `addresses` (`addressID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_storage_has_addresses_storage1` FOREIGN KEY (`storageStorageID`) REFERENCES `storages` (`storageID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagehasaddresses`
--

LOCK TABLES `storagehasaddresses` WRITE;
/*!40000 ALTER TABLE `storagehasaddresses` DISABLE KEYS */;
INSERT INTO `storagehasaddresses` VALUES (1,3),(2,2);
/*!40000 ALTER TABLE `storagehasaddresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagehassources`
--

DROP TABLE IF EXISTS `storagehassources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storagehassources` (
  `storageStorageID` int(11) NOT NULL,
  `sourcesSourceName` varchar(120) NOT NULL,
  PRIMARY KEY (`storageStorageID`,`sourcesSourceName`),
  KEY `fk_storage_has_sources_sources1_idx` (`sourcesSourceName`),
  KEY `fk_storage_has_sources_storage1_idx` (`storageStorageID`),
  CONSTRAINT `fk_storage_has_sources_sources1` FOREIGN KEY (`sourcesSourceName`) REFERENCES `sources` (`sourceName`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_storage_has_sources_storage1` FOREIGN KEY (`storageStorageID`) REFERENCES `storages` (`storageID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagehassources`
--

LOCK TABLES `storagehassources` WRITE;
/*!40000 ALTER TABLE `storagehassources` DISABLE KEYS */;
INSERT INTO `storagehassources` VALUES (1,'Americano Creek'),(1,'Rainfall'),(2,'Groundwater'),(2,'Rush Creek');
/*!40000 ALTER TABLE `storagehassources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storages`
--

DROP TABLE IF EXISTS `storages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storages` (
  `storageID` int(11) NOT NULL AUTO_INCREMENT,
  `storageCapacity` int(11) NOT NULL,
  `isCovered` varchar(6) NOT NULL,
  `materialsMaterial` varchar(10) DEFAULT NULL,
  `storageTypesStorageType` varchar(25) NOT NULL,
  PRIMARY KEY (`storageID`,`storageTypesStorageType`),
  KEY `fk_storage_materials1_idx` (`materialsMaterial`),
  KEY `fk_storage_storageTypes1_idx` (`storageTypesStorageType`),
  CONSTRAINT `fk_storage_materials1` FOREIGN KEY (`materialsMaterial`) REFERENCES `materials` (`material`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_storage_storageTypes1` FOREIGN KEY (`storageTypesStorageType`) REFERENCES `storagetypes` (`storageType`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storages`
--

LOCK TABLES `storages` WRITE;
/*!40000 ALTER TABLE `storages` DISABLE KEYS */;
INSERT INTO `storages` VALUES (1,5000000,'0','Concrete','Reservoir'),(2,120000,'1','Metal','Water Tower'),(3,200000,'1','Plastic','Storage Tank'),(4,85000,'1','Plastic','Storage Tank');
/*!40000 ALTER TABLE `storages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagetypes`
--

DROP TABLE IF EXISTS `storagetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storagetypes` (
  `storageType` varchar(25) NOT NULL,
  PRIMARY KEY (`storageType`),
  UNIQUE KEY `storageType_UNIQUE` (`storageType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagetypes`
--

LOCK TABLES `storagetypes` WRITE;
/*!40000 ALTER TABLE `storagetypes` DISABLE KEYS */;
INSERT INTO `storagetypes` VALUES ('Catch Basin'),('Reservoir'),('Storage Tank'),('Water Tower');
/*!40000 ALTER TABLE `storagetypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-23 20:31:09
