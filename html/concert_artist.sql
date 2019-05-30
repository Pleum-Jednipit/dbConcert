-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2019 at 02:00 AM
-- Server version: 10.1.40-MariaDB
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
-- Table structure for table `concert_artist`
--

CREATE TABLE `concert_artist` (
  `Concert_Artist_ID` int(10) NOT NULL,
  `Artist_ID` int(10) NOT NULL,
  `Concert_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `concert_artist`
--

INSERT INTO `concert_artist` (`Concert_Artist_ID`, `Artist_ID`, `Concert_ID`) VALUES
(2, 2, 2),
(3, 1, 3),
(4, 1, 9),
(5, 2, 9),
(6, 1, 2),
(7, 2, 2),
(8, 2, 16),
(9, 1, 16),
(10, 9, 39),
(11, 10, 29),
(12, 8, 35),
(13, 10, 29),
(16, 10, 35),
(17, 11, 35),
(18, 10, 40),
(19, 11, 40),
(20, 11, 41),
(21, 9, 41),
(22, 17, 41),
(23, 11, 42),
(24, 9, 42),
(25, 11, 43),
(26, 9, 43),
(27, 11, 44),
(28, 17, 44),
(29, 8, 44),
(30, 18, 44),
(31, 11, 45),
(32, 10, 45),
(33, 8, 45);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD PRIMARY KEY (`Concert_Artist_ID`),
  ADD KEY `concert_artist_ibfk_1` (`Artist_ID`),
  ADD KEY `concert_artist_ibfk_2` (`Concert_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `concert_artist`
--
ALTER TABLE `concert_artist`
  MODIFY `Concert_Artist_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD CONSTRAINT `concert_artist_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `artist` (`Artist_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `concert_artist_ibfk_2` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
