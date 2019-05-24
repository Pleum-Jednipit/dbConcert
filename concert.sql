-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2019 at 05:39 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

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
  `Artist_Name` text NOT NULL,
  `Artist_Detail` text NOT NULL,
  `Record_Label_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booked_seat`
--

CREATE TABLE `booked_seat` (
  `Booked_Seat_ID` int(10) NOT NULL,
  `Booking_ID` int(10) NOT NULL,
  `Seat_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `Booking_ID` int(10) NOT NULL,
  `Member_Username` varchar(64) NOT NULL,
  `Concert_Datetime_ID` int(10) NOT NULL,
  `Booking_Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Booking_Seat_Quantity` int(2) NOT NULL,
  `Ticket_Receiving_ID` int(10) NOT NULL,
  `Payment_Method_ID` int(10) NOT NULL,
  `Payment_Total_Amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `concert`
--

CREATE TABLE `concert` (
  `Concert_ID` int(10) NOT NULL,
  `Concert_Name` text NOT NULL,
  `Concert_Sale_Datetime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `Concert_Detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `concert_artist`
--

CREATE TABLE `concert_artist` (
  `Concert_Artist_ID` int(10) NOT NULL,
  `Artist_ID` int(10) NOT NULL,
  `Concert_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `concert_datetime`
--

CREATE TABLE `concert_datetime` (
  `Concert_DateTime_ID` int(10) NOT NULL,
  `Concert_DateTime_Detail` text NOT NULL,
  `Conert_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `hall`
--

CREATE TABLE `hall` (
  `Hall_ID` int(10) NOT NULL,
  `Hall_Name` text NOT NULL,
  `Hall_Seating_Capacity` int(5) NOT NULL,
  `Venue_ID` int(10) NOT NULL,
  `Concert_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `Member_Username` varchar(64) NOT NULL,
  `Member_Password` varchar(64) NOT NULL,
  `Member_Name` text NOT NULL,
  `Member_DOB` date NOT NULL,
  `Member_Email_Address` text NOT NULL,
  `Member_Address` text NOT NULL,
  `Member_Phone_Number` int(15) NOT NULL,
  `MemberType_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `membertype`
--

CREATE TABLE `membertype` (
  `MemberType_ID` int(10) NOT NULL,
  `MemberType_Name` text NOT NULL,
  `MemberType_Detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member_promotion`
--

CREATE TABLE `member_promotion` (
  `Member_Promotion_ID` int(10) NOT NULL,
  `Promotion_ID` int(10) NOT NULL,
  `MemberType_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `Payment_Method_ID` int(10) NOT NULL,
  `Payment_Method_Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `Promotion_ID` int(10) NOT NULL,
  `Promotion_Name` text NOT NULL,
  `Promotion_Start` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `Promotion_Description` text NOT NULL,
  `Promotion_End` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `record_label`
--

CREATE TABLE `record_label` (
  `Record_Label_ID` int(10) NOT NULL,
  `Record_Label_Name` text NOT NULL,
  `Record_Label_Address` text NOT NULL,
  `Record_Label_EmailAddress` text NOT NULL,
  `Record_Label_Phone_Number` varchar(15) NOT NULL,
  `Record_Label_Website` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `Seat_ID` int(10) NOT NULL,
  `Seat_Number` int(5) NOT NULL,
  `Zone_ID` int(10) NOT NULL,
  `Hall_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_receiving_method`
--

CREATE TABLE `ticket_receiving_method` (
  `Ticket_Receiving_ID` int(10) NOT NULL,
  `Ticket_Receiving_Description` varchar(512) NOT NULL,
  `Ticket_Receiving_Price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `Venue_ID` int(10) NOT NULL,
  `Venue_Name` text NOT NULL,
  `Venue_Address` text NOT NULL,
  `Venue_Email_Address` text NOT NULL,
  `Venue_Phone_Number` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `Zone_ID` int(10) NOT NULL,
  `Zone_Name` text NOT NULL,
  `Concert_ID` int(10) NOT NULL,
  `Zone_Seating_Plan` text NOT NULL,
  `Zone_Seating_Type` text NOT NULL,
  `Zone_Seating_Price` varchar(5) NOT NULL,
  `Zone_Seating_Capacity` int(5) NOT NULL
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
  ADD KEY `booked_seat_ibfk_1` (`Booking_ID`),
  ADD KEY `booked_seat_ibfk_2` (`Seat_ID`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`Booking_ID`),
  ADD KEY `booking_ibfk_1` (`Member_Username`),
  ADD KEY `booking_ibfk_2` (`Concert_Datetime_ID`),
  ADD KEY `booking_ibfk_3` (`Ticket_Receiving_ID`),
  ADD KEY `booking_ibfk_4` (`Payment_Method_ID`);

--
-- Indexes for table `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`Concert_ID`);

--
-- Indexes for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD PRIMARY KEY (`Concert_Artist_ID`),
  ADD KEY `Concert_artist_ibfk_1` (`Artist_ID`),
  ADD KEY `Concert_artist_ibfk_2` (`Concert_ID`);

--
-- Indexes for table `concert_datetime`
--
ALTER TABLE `concert_datetime`
  ADD PRIMARY KEY (`Concert_DateTime_ID`),
  ADD KEY `concert_datetime_ibfk_1` (`Conert_ID`);

--
-- Indexes for table `hall`
--
ALTER TABLE `hall`
  ADD PRIMARY KEY (`Hall_ID`),
  ADD KEY `hall_ibfk_1` (`Venue_ID`),
  ADD KEY `hall_ibfk_2` (`Concert_ID`);

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
  ADD PRIMARY KEY (`Member_Promotion_ID`),
  ADD KEY `member_promotion_ibfk_1` (`Promotion_ID`),
  ADD KEY `member_promotion_ibfk_2` (`MemberType_ID`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`Payment_Method_ID`);

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
  ADD KEY `seat_ibfk_1` (`Zone_ID`),
  ADD KEY `seat_ibfk_2` (`Hall_ID`);

--
-- Indexes for table `ticket_receiving_method`
--
ALTER TABLE `ticket_receiving_method`
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
  ADD KEY `zone_ibfk_1` (`Concert_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_seat`
--
ALTER TABLE `booked_seat`
  MODIFY `Booked_Seat_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `Booking_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert`
--
ALTER TABLE `concert`
  MODIFY `Concert_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert_artist`
--
ALTER TABLE `concert_artist`
  MODIFY `Concert_Artist_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `concert_datetime`
--
ALTER TABLE `concert_datetime`
  MODIFY `Concert_DateTime_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hall`
--
ALTER TABLE `hall`
  MODIFY `Hall_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `membertype`
--
ALTER TABLE `membertype`
  MODIFY `MemberType_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member_promotion`
--
ALTER TABLE `member_promotion`
  MODIFY `Member_Promotion_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `Payment_Method_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `Promotion_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `record_label`
--
ALTER TABLE `record_label`
  MODIFY `Record_Label_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `Seat_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_receiving_method`
--
ALTER TABLE `ticket_receiving_method`
  MODIFY `Ticket_Receiving_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `Venue_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artist`
--
ALTER TABLE `artist`
  ADD CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`Record_Label_ID`) REFERENCES `record_label` (`Record_Label_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `booked_seat`
--
ALTER TABLE `booked_seat`
  ADD CONSTRAINT `booked_seat_ibfk_1` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booked_seat_ibfk_2` FOREIGN KEY (`Seat_ID`) REFERENCES `seat` (`Seat_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`Member_Username`) REFERENCES `member` (`Member_Username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`Concert_Datetime_ID`) REFERENCES `concert_datetime` (`Concert_DateTime_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`Ticket_Receiving_ID`) REFERENCES `ticket_receiving_method` (`Ticket_Receiving_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`Payment_Method_ID`) REFERENCES `payment_method` (`Payment_Method_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `concert_artist`
--
ALTER TABLE `concert_artist`
  ADD CONSTRAINT `Concert_artist_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `artist` (`Artist_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Concert_artist_ibfk_2` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `concert_datetime`
--
ALTER TABLE `concert_datetime`
  ADD CONSTRAINT `concert_datetime_ibfk_1` FOREIGN KEY (`Conert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `hall`
--
ALTER TABLE `hall`
  ADD CONSTRAINT `hall_ibfk_1` FOREIGN KEY (`Venue_ID`) REFERENCES `venue` (`Venue_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `hall_ibfk_2` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`Zone_ID`) REFERENCES `zone` (`Zone_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `seat_ibfk_2` FOREIGN KEY (`Hall_ID`) REFERENCES `hall` (`Hall_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `zone`
--
ALTER TABLE `zone`
  ADD CONSTRAINT `zone_ibfk_1` FOREIGN KEY (`Concert_ID`) REFERENCES `concert` (`Concert_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
