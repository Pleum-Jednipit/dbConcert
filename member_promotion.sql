-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2019 at 02:11 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `concert`
--

-- --------------------------------------------------------

--
-- Table structure for table `member_promotion`
--

CREATE TABLE `member_promotion` (
  `Member_Promotion_ID` int(10) NOT NULL,
  `Promotion_ID` int(10) NOT NULL,
  `MemberType_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member_promotion`
--
ALTER TABLE `member_promotion`
  ADD PRIMARY KEY (`Member_Promotion_ID`),
  ADD KEY `member_promotion_ibfk_1` (`Promotion_ID`),
  ADD KEY `member_promotion_ibfk_2` (`MemberType_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member_promotion`
--
ALTER TABLE `member_promotion`
  MODIFY `Member_Promotion_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `member_promotion`
--
ALTER TABLE `member_promotion`
  ADD CONSTRAINT `member_promotion_ibfk_1` FOREIGN KEY (`Promotion_ID`) REFERENCES `promotion` (`Promotion_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `member_promotion_ibfk_2` FOREIGN KEY (`MemberType_ID`) REFERENCES `membertype` (`MemberType_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
