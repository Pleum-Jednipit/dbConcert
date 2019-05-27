-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2019 at 09:12 AM
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
(1, 'Tiger', 'Good Singer', 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `Booking_ID` int(10) NOT NULL,
  `Member_Username` varchar(64) NOT NULL,
  `Concert_Show_ID` int(10) NOT NULL,
  `Booking_DateTime` datetime NOT NULL,
  `Booking_Quantity` int(4) NOT NULL,
  `Ticket_Receiving_ID` int(10) NOT NULL,
  `Payment_ID` int(10) NOT NULL,
  `Booking_Total_Price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(7, 'Ponglnwz007', '0000-00-00', '00:00:00', 'asdasda', '', 1);

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
(1, 1, 2);

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
(3, '0000-00-00', '00:00:00', '123', 2),
(4, '0000-00-00', '00:00:00', '', 2);

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
  `Concert_ShowTime_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD KEY `booking_ibfk_2` (`Concert_Show_ID`),
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
  MODIFY `Artist_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `Booking_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert`
--
ALTER TABLE `concert`
  MODIFY `Concert_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `concert_artist`
--
ALTER TABLE `concert_artist`
  MODIFY `Concert_Artist_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `concert_showtime`
--
ALTER TABLE `concert_showtime`
  MODIFY `Concert_ShowTime_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `membertype`
--
ALTER TABLE `membertype`
  MODIFY `MemberType_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member_promotion`
--
ALTER TABLE `member_promotion`
  MODIFY `Member_Promotion` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `Payment_ID` int(10) NOT NULL AUTO_INCREMENT;

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
  MODIFY `Seat_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_receiving`
--
ALTER TABLE `ticket_receiving`
  MODIFY `Ticket_Receiving_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `Venue_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `Zone_ID` int(10) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`Concert_Show_ID`) REFERENCES `concert_showtime` (`Concert_ShowTime_ID`) ON UPDATE CASCADE,
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
