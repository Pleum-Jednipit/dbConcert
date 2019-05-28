-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2019 at 03:39 PM
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
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `Artist_ID` int(10) NOT NULL,
  `Artist_Name` varchar(64) NOT NULL,
  `Artist_Detail` text NOT NULL,
  `Record_Label_ID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`Artist_ID`, `Artist_Name`, `Artist_Detail`, `Record_Label_ID`) VALUES
(1, 'Tiger', 'Good Singer', 1),
(2, 'Pongsan', '132', 1);

-- --------------------------------------------------------

--
-- Table structure for table `booked_seat`
--

CREATE TABLE `booked_seat` (
  `Booking_ID` int(10) NOT NULL,
  `Seat_ID` int(10) NOT NULL,
  `Concert_ShowTime_ID` int(10) NOT NULL,
  `Booked_Seat_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booked_seat`
--

INSERT INTO `booked_seat` (`Booking_ID`, `Seat_ID`, `Concert_ShowTime_ID`, `Booked_Seat_ID`) VALUES
(10, 281, 9, 1),
(10, 282, 9, 2),
(11, 283, 9, 3),
(11, 284, 9, 4),
(12, 285, 9, 5),
(13, 286, 9, 6),
(14, 287, 9, 7),
(14, 288, 9, 8),
(10, 179, 9, 15),
(32, 179, 9, 18),
(32, 180, 9, 19),
(50, 181, 9, 20),
(51, 182, 9, 21),
(51, 183, 9, 22),
(51, 184, 9, 23);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `Booking_ID` int(10) NOT NULL,
  `Member_Username` varchar(64) NOT NULL,
  `Concert_ShowTime_ID` int(10) NOT NULL,
  `Booking_DateTime` datetime NOT NULL,
  `Booking_Quantity` int(4) NOT NULL,
  `Ticket_Receiving_ID` int(10) NOT NULL,
  `Payment_ID` int(10) NOT NULL,
  `Booking_Total_Price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`Booking_ID`, `Member_Username`, `Concert_ShowTime_ID`, `Booking_DateTime`, `Booking_Quantity`, `Ticket_Receiving_ID`, `Payment_ID`, `Booking_Total_Price`) VALUES
(6, 'test', 9, '2019-05-28 18:02:02', 2, 1, 1, 4600),
(7, 'test', 9, '2019-05-28 18:02:40', 2, 1, 1, 4600),
(8, 'test', 9, '2019-05-28 18:03:00', 2, 1, 1, 4600),
(9, 'test', 9, '2019-05-28 18:03:18', 2, 1, 1, 4600),
(10, 'test', 9, '2019-05-28 18:04:27', 2, 1, 1, 4600),
(11, 'test', 9, '2019-05-28 18:33:09', 2, 1, 1, 4600),
(12, 'test', 9, '2019-05-28 18:49:18', 1, 1, 1, 2600),
(13, 'test', 9, '2019-05-28 19:11:37', 1, 1, 1, 2600),
(14, 'test', 9, '2019-05-28 19:11:44', 2, 1, 1, 4600),
(15, 'test', 9, '2019-05-28 19:12:07', 1, 1, 1, 1600),
(16, 'test', 9, '2019-05-28 19:12:51', 2, 1, 1, 2600),
(17, 'test', 9, '2019-05-28 19:13:45', 3, 1, 1, 3600),
(18, 'test', 9, '2019-05-28 19:15:09', 2, 1, 1, 2600),
(19, 'test', 9, '2019-05-28 19:15:48', 2, 1, 1, 2600),
(20, 'test', 9, '2019-05-28 19:16:31', 2, 1, 1, 2600),
(21, 'test', 9, '2019-05-28 19:16:54', 2, 1, 1, 2600),
(22, 'test', 9, '2019-05-28 19:17:20', 1, 1, 1, 1600),
(23, 'test', 9, '2019-05-28 19:18:19', 3, 1, 1, 3600),
(24, 'test', 9, '2019-05-28 19:19:12', 2, 1, 1, 2600),
(25, 'test', 9, '2019-05-28 19:20:47', 2, 1, 1, 2600),
(26, 'test', 9, '2019-05-28 19:21:12', 2, 1, 1, 2600),
(27, 'test', 9, '2019-05-28 19:21:28', 3, 1, 1, 3600),
(28, 'test', 9, '2019-05-28 19:26:35', 3, 1, 1, 3600),
(29, 'test', 9, '2019-05-28 19:26:59', 2, 1, 1, 2600),
(30, 'test', 9, '2019-05-28 19:32:16', 3, 1, 1, 3600),
(31, 'test', 9, '2019-05-28 19:32:56', 2, 1, 1, 2600),
(32, 'test', 9, '2019-05-28 19:33:48', 2, 1, 1, 2600),
(33, 'test', 9, '2019-05-28 19:34:08', 1, 1, 1, 1600),
(34, 'test', 9, '2019-05-28 19:34:40', 1, 1, 1, 1600),
(35, 'test', 9, '2019-05-28 19:35:11', 1, 1, 1, 1600),
(36, 'test', 9, '2019-05-28 19:35:36', 1, 1, 1, 1600),
(37, 'test', 9, '2019-05-28 19:45:32', 2, 1, 1, 2600),
(38, 'test', 9, '2019-05-28 19:46:02', 2, 1, 1, 2600),
(39, 'test', 9, '2019-05-28 19:47:05', 1, 1, 1, 1600),
(40, 'test', 9, '2019-05-28 19:47:46', 1, 1, 1, 1600),
(41, 'test', 9, '2019-05-28 19:48:22', 1, 1, 1, 1600),
(42, 'test', 9, '2019-05-28 19:48:53', 1, 1, 1, 1600),
(43, 'test', 9, '2019-05-28 19:49:40', 1, 1, 1, 1600),
(44, 'test', 9, '2019-05-28 19:50:23', 1, 1, 1, 1600),
(45, 'test', 9, '2019-05-28 19:51:08', 1, 1, 1, 1600),
(46, 'test', 9, '2019-05-28 19:51:42', 2, 1, 1, 2600),
(47, 'test', 9, '2019-05-28 19:54:16', 1, 1, 1, 1600),
(48, 'test', 9, '2019-05-28 19:55:32', 1, 1, 1, 1600),
(49, 'test', 9, '2019-05-28 19:56:18', 1, 1, 1, 1600),
(50, 'test', 9, '2019-05-28 19:56:40', 1, 1, 1, 1600),
(51, 'test', 9, '2019-05-28 19:57:10', 3, 1, 1, 3600);

-- --------------------------------------------------------

--
-- Table structure for table `concert`
--

CREATE TABLE `concert` (
  `Concert_ID` int(10) NOT NULL,
  `Concert_Name` varchar(128) NOT NULL,
  `Concert_Sales_Date` date NOT NULL,
  `Concert_Sales_Time` time NOT NULL,
  `Concert_Detail` text NOT NULL,
  `Concert_Poster` varchar(1024) NOT NULL,
  `Venue_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `concert`
--

INSERT INTO `concert` (`Concert_ID`, `Concert_Name`, `Concert_Sales_Date`, `Concert_Sales_Time`, `Concert_Detail`, `Concert_Poster`, `Venue_ID`) VALUES
(2, 'Tiger World Tour', '0000-00-00', '00:00:00', 'Good Singer', '', 2),
(3, 'EMS', '0000-00-00', '00:00:00', 'Promoted', '', 2),
(4, 'Ponglnwz007', '0000-00-00', '00:00:00', 'Crazy', '', 1),
(7, 'Ponglnwz007', '0000-00-00', '00:00:00', 'asdasda', '', 1),
(9, 'A', '2019-04-05', '12:00:00', 'qwertt', '', 1),
(10, 'Comcamp30', '0000-00-00', '12:00:00', 'sadd', '', 1),
(11, 'Comcamp', '2019-02-06', '20:59:00', '213', '', 1),
(12, 'Comcamp30', '2019-05-31', '22:31:00', 'wqe', '', 1);

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
(7, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `concert_showtime`
--

CREATE TABLE `concert_showtime` (
  `Concert_ShowTime_ID` int(10) NOT NULL,
  `Concert_ShowDate` date NOT NULL,
  `Concert_ShowTime` time NOT NULL,
  `Concert_ShowTime_Plan` varchar(1024) NOT NULL,
  `Concert_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `concert_showtime`
--

INSERT INTO `concert_showtime` (`Concert_ShowTime_ID`, `Concert_ShowDate`, `Concert_ShowTime`, `Concert_ShowTime_Plan`, `Concert_ID`) VALUES
(9, '2019-11-05', '18:38:00', '', 2),
(10, '2019-05-31', '18:45:00', '23', 2);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `Member_Username` varchar(64) NOT NULL,
  `Member_Password` varchar(64) NOT NULL,
  `Member_Name` varchar(64) NOT NULL,
  `Member_Gender` char(1) NOT NULL,
  `Member_DOB` date NOT NULL,
  `Member_EmailAddress` varchar(64) NOT NULL,
  `Member_Address` varchar(256) NOT NULL,
  `Member_PhoneNumber` varchar(15) NOT NULL,
  `MemberType_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`Member_Username`, `Member_Password`, `Member_Name`, `Member_Gender`, `Member_DOB`, `Member_EmailAddress`, `Member_Address`, `Member_PhoneNumber`, `MemberType_ID`) VALUES
('60070503411', '21313', 'Comcamp30', 't', '0000-00-00', 'male', 'ascsad', '213123', 1),
('test', 'test', 'test', 'c', '0000-00-00', 'male', 'wqwqr', '123123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `membertype`
--

CREATE TABLE `membertype` (
  `MemberType_ID` int(10) NOT NULL,
  `MemberType_Name` varchar(64) NOT NULL,
  `MemberType_Detail` varchar(256) NOT NULL,
  `MemberType_PercentDiscount` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `membertype`
--

INSERT INTO `membertype` (`MemberType_ID`, `MemberType_Name`, `MemberType_Detail`, `MemberType_PercentDiscount`) VALUES
(1, 'Green', 'Demo', 10);

-- --------------------------------------------------------

--
-- Table structure for table `member_promotion`
--

CREATE TABLE `member_promotion` (
  `Member_Promotion` int(10) NOT NULL,
  `Promotion_ID` int(10) NOT NULL,
  `MemberType_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `Payment_ID` int(10) NOT NULL,
  `Payment_Name` varchar(64) NOT NULL,
  `Payment_Detail` text NOT NULL,
  `Payment_Fee` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`Payment_ID`, `Payment_Name`, `Payment_Detail`, `Payment_Fee`) VALUES
(1, 'Credit Card', '', 500);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `Promotion_ID` int(10) NOT NULL,
  `Promotion_Name` varchar(64) NOT NULL,
  `Promotion_Detail` varchar(512) NOT NULL,
  `Promotion_Start` date NOT NULL,
  `Promotion_End` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `record_label`
--

CREATE TABLE `record_label` (
  `Record_Label_ID` int(10) NOT NULL,
  `Record_Label_Name` varchar(64) NOT NULL,
  `Record_Label_Address` text NOT NULL,
  `Record_Label_EmailAddress` varchar(128) NOT NULL,
  `Record_Label_PhoneNumber` varchar(15) NOT NULL,
  `Record_Label_Website` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `record_label`
--

INSERT INTO `record_label` (`Record_Label_ID`, `Record_Label_Name`, `Record_Label_Address`, `Record_Label_EmailAddress`, `Record_Label_PhoneNumber`, `Record_Label_Website`) VALUES
(1, 'BEC', 'BEC', 'info@bectero.com', '0831349171', 'http://www.bectero.com');

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `Seat_ID` int(10) NOT NULL,
  `Seat_Number` varchar(5) NOT NULL,
  `Zone_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`Seat_ID`, `Seat_Number`, `Zone_ID`) VALUES
(179, 'A0', 4),
(180, 'A1', 4),
(181, 'A2', 4),
(182, 'A3', 4),
(183, 'A4', 4),
(184, 'A5', 4),
(185, 'A6', 4),
(186, 'A7', 4),
(187, 'A8', 4),
(188, 'A9', 4),
(189, 'A10', 4),
(190, 'A11', 4),
(191, 'A12', 4),
(192, 'A13', 4),
(193, 'A14', 4),
(194, 'A15', 4),
(195, 'A16', 4),
(196, 'A17', 4),
(197, 'A18', 4),
(198, 'A19', 4),
(199, 'A20', 4),
(200, 'A21', 4),
(201, 'A22', 4),
(202, 'A23', 4),
(203, 'A24', 4),
(204, 'A25', 4),
(205, 'A26', 4),
(206, 'A27', 4),
(207, 'A28', 4),
(208, 'A29', 4),
(209, 'A30', 4),
(210, 'A31', 4),
(211, 'A32', 4),
(212, 'A33', 4),
(213, 'A34', 4),
(214, 'A35', 4),
(215, 'A36', 4),
(216, 'A37', 4),
(217, 'A38', 4),
(218, 'A39', 4),
(219, 'A40', 4),
(220, 'A41', 4),
(221, 'A42', 4),
(222, 'A43', 4),
(223, 'A44', 4),
(224, 'A45', 4),
(225, 'A46', 4),
(226, 'A47', 4),
(227, 'A48', 4),
(228, 'A49', 4),
(229, 'A50', 4),
(230, 'A51', 4),
(231, 'A52', 4),
(232, 'A53', 4),
(233, 'A54', 4),
(234, 'A55', 4),
(235, 'A56', 4),
(236, 'A57', 4),
(237, 'A58', 4),
(238, 'A59', 4),
(239, 'A60', 4),
(240, 'A61', 4),
(241, 'A62', 4),
(242, 'A63', 4),
(243, 'A64', 4),
(244, 'A65', 4),
(245, 'A66', 4),
(246, 'A67', 4),
(247, 'A68', 4),
(248, 'A69', 4),
(249, 'A70', 4),
(250, 'A71', 4),
(251, 'A72', 4),
(252, 'A73', 4),
(253, 'A74', 4),
(254, 'A75', 4),
(255, 'A76', 4),
(256, 'A77', 4),
(257, 'A78', 4),
(258, 'A79', 4),
(259, 'A80', 4),
(260, 'A81', 4),
(261, 'A82', 4),
(262, 'A83', 4),
(263, 'A84', 4),
(264, 'A85', 4),
(265, 'A86', 4),
(266, 'A87', 4),
(267, 'A88', 4),
(268, 'A89', 4),
(269, 'A90', 4),
(270, 'A91', 4),
(271, 'A92', 4),
(272, 'A93', 4),
(273, 'A94', 4),
(274, 'A95', 4),
(275, 'A96', 4),
(276, 'A97', 4),
(277, 'A98', 4),
(278, 'A99', 4),
(281, '19U', 5),
(282, '20U', 5),
(283, '21U', 5),
(284, '22U', 5),
(285, '23U', 5),
(286, '24U', 5),
(287, '19V', 5),
(288, '20V', 5),
(289, '21V', 5),
(290, '22V', 5),
(291, '23V', 5),
(292, '24V', 5),
(293, '19W', 5),
(294, '20W', 5),
(295, '21W', 5),
(296, '22W', 5),
(297, '23W', 5),
(298, '24W', 5);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_receiving`
--

CREATE TABLE `ticket_receiving` (
  `Ticket_Receiving_ID` int(10) NOT NULL,
  `Ticket_Receiving_Name` varchar(128) NOT NULL,
  `Ticket_Receiving_Detail` text NOT NULL,
  `Ticket_Receiving_Fee` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket_receiving`
--

INSERT INTO `ticket_receiving` (`Ticket_Receiving_ID`, `Ticket_Receiving_Name`, `Ticket_Receiving_Detail`, `Ticket_Receiving_Fee`) VALUES
(1, 'EMS', '123', 100);

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `Venue_ID` int(10) NOT NULL,
  `Venue_Name` varchar(64) NOT NULL,
  `Venue_Address` varchar(256) NOT NULL,
  `Venue_EmailAddress` varchar(64) NOT NULL,
  `Venue_PhoneNumber` varchar(15) NOT NULL,
  `Venue_SeatingCapacity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`Venue_ID`, `Venue_Name`, `Venue_Address`, `Venue_EmailAddress`, `Venue_PhoneNumber`, `Venue_SeatingCapacity`) VALUES
(1, 'Impact', 'BEC', 'impact@gmail.com', '0831349171', 100000),
(2, 'Comcamp', 'Yosemite', 'test.terrific@gmail.com', '213213', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `Zone_ID` int(10) NOT NULL,
  `Zone_Name` varchar(64) NOT NULL,
  `Zone_Type` varchar(64) NOT NULL,
  `Zone_Price` int(10) NOT NULL,
  `Zone_Capacity` int(10) NOT NULL,
  `Concert_ShowTime_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`Zone_ID`, `Zone_Name`, `Zone_Type`, `Zone_Price`, `Zone_Capacity`, `Concert_ShowTime_ID`) VALUES
(4, 'A', 'Standing', 1000, 100, 9),
(5, 'B', 'Seating', 2000, 18, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`Artist_ID`),
  ADD KEY `artist_ibfk_1` (`Record_Label_ID`);

--
-- Indexes for table `booked_seat`
--
ALTER TABLE `booked_seat`
  ADD PRIMARY KEY (`Booked_Seat_ID`),
  ADD KEY `booked_seat_ibfk_2` (`Booking_ID`),
  ADD KEY `booked_seat_ibfk_3` (`Seat_ID`),
  ADD KEY `booked_seat_ibfk_1` (`Concert_ShowTime_ID`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`Booking_ID`),
  ADD KEY `booking_ibfk_1` (`Member_Username`),
  ADD KEY `booking_ibfk_2` (`Concert_ShowTime_ID`),
  ADD KEY `booking_ibfk_3` (`Ticket_Receiving_ID`),
  ADD KEY `booking_ibfk_4` (`Payment_ID`);

--
-- Indexes for table `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`Concert_ID`),
  ADD KEY `Venue_ID` (`Venue_ID`);

--
-- Indexes for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD PRIMARY KEY (`Concert_Artist_ID`),
  ADD KEY `concert_artist_ibfk_1` (`Artist_ID`),
  ADD KEY `concert_artist_ibfk_2` (`Concert_ID`);

--
-- Indexes for table `concert_showtime`
--
ALTER TABLE `concert_showtime`
  ADD PRIMARY KEY (`Concert_ShowTime_ID`),
  ADD KEY `concert_showtime_ibfk_1` (`Concert_ID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`Member_Username`),
  ADD KEY `member_ibfk_1` (`MemberType_ID`);

--
-- Indexes for table `membertype`
--
ALTER TABLE `membertype`
  ADD PRIMARY KEY (`MemberType_ID`);

--
-- Indexes for table `member_promotion`
--
ALTER TABLE `member_promotion`
  ADD PRIMARY KEY (`Member_Promotion`),
  ADD KEY `member_promotion_ibfk_1` (`Promotion_ID`),
  ADD KEY `member_promotion_ibfk_2` (`MemberType_ID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`Payment_ID`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`Promotion_ID`);

--
-- Indexes for table `record_label`
--
ALTER TABLE `record_label`
  ADD PRIMARY KEY (`Record_Label_ID`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`Seat_ID`),
  ADD KEY `seat_ibfk_1` (`Zone_ID`);

--
-- Indexes for table `ticket_receiving`
--
ALTER TABLE `ticket_receiving`
  ADD PRIMARY KEY (`Ticket_Receiving_ID`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`Venue_ID`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`Zone_ID`),
  ADD KEY `zone_ibfk_1` (`Concert_ShowTime_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `Artist_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booked_seat`
--
ALTER TABLE `booked_seat`
  MODIFY `Booked_Seat_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `Booking_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `concert`
--
ALTER TABLE `concert`
  MODIFY `Concert_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `concert_artist`
--
ALTER TABLE `concert_artist`
  MODIFY `Concert_Artist_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `concert_showtime`
--
ALTER TABLE `concert_showtime`
  MODIFY `Concert_ShowTime_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `membertype`
--
ALTER TABLE `membertype`
  MODIFY `MemberType_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `member_promotion`
--
ALTER TABLE `member_promotion`
  MODIFY `Member_Promotion` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `Payment_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `Promotion_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `record_label`
--
ALTER TABLE `record_label`
  MODIFY `Record_Label_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `Seat_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT for table `ticket_receiving`
--
ALTER TABLE `ticket_receiving`
  MODIFY `Ticket_Receiving_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `Venue_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `Zone_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artist`
--
ALTER TABLE `artist`
  ADD CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`Record_Label_ID`) REFERENCES `record_label` (`Record_Label_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `booked_seat`
--
ALTER TABLE `booked_seat`
  ADD CONSTRAINT `booked_seat_ibfk_1` FOREIGN KEY (`Concert_ShowTime_ID`) REFERENCES `concert_showtime` (`Concert_ShowTime_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booked_seat_ibfk_2` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booked_seat_ibfk_3` FOREIGN KEY (`Seat_ID`) REFERENCES `seat` (`Seat_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`Member_Username`) REFERENCES `member` (`Member_Username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`Concert_ShowTime_ID`) REFERENCES `concert_showtime` (`Concert_ShowTime_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`Ticket_Receiving_ID`) REFERENCES `ticket_receiving` (`Ticket_Receiving_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`Payment_ID`) REFERENCES `payment` (`Payment_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `concert`
--
ALTER TABLE `concert`
  ADD CONSTRAINT `concert_ibfk_1` FOREIGN KEY (`Venue_ID`) REFERENCES `venue` (`Venue_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD CONSTRAINT `concert_artist_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `artist` (`Artist_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `concert_artist_ibfk_2` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `concert_showtime`
--
ALTER TABLE `concert_showtime`
  ADD CONSTRAINT `concert_showtime_ibfk_1` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`MemberType_ID`) REFERENCES `membertype` (`MemberType_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `member_promotion`
--
ALTER TABLE `member_promotion`
  ADD CONSTRAINT `member_promotion_ibfk_1` FOREIGN KEY (`Promotion_ID`) REFERENCES `promotion` (`Promotion_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `member_promotion_ibfk_2` FOREIGN KEY (`MemberType_ID`) REFERENCES `membertype` (`MemberType_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`Zone_ID`) REFERENCES `zone` (`Zone_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `zone`
--
ALTER TABLE `zone`
  ADD CONSTRAINT `zone_ibfk_1` FOREIGN KEY (`Concert_ShowTime_ID`) REFERENCES `concert_showtime` (`Concert_ShowTime_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
