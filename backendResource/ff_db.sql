-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2021 at 12:26 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mrtwinsister`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `DonationTotal` (`request` VARCHAR(8)) RETURNS DOUBLE NO SQL
BEGIN
DECLARE result double; 

SELECT SUM(Donation) INTO result FROM donorlist WHERE request_ID = request; 
return result;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `donorlist`
--

CREATE TABLE `donorlist` (
  `Donorlist_ID` int(12) NOT NULL,
  `Request_ID` varchar(8) DEFAULT NULL,
  `Donor_ID` varchar(8) DEFAULT NULL,
  `Donation` double NOT NULL,
  `Donation_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donorlist`
--

INSERT INTO `donorlist` (`Donorlist_ID`, `Request_ID`, `Donor_ID`, `Donation`, `Donation_Date`) VALUES
(1, '00000001', '00000001', 1000, '2021-03-16'),
(2, '00000001', '00000001', 500, '2021-04-05');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `request_ID` int(8) NOT NULL,
  `date_Start` date NOT NULL,
  `date_End` date DEFAULT NULL,
  `Author_ID` int(8) NOT NULL,
  `approval_bool` tinyint(1) NOT NULL,
  `approval_AdminID` int(8) DEFAULT NULL,
  `funding_Goal` int(11) NOT NULL,
  `funding_Raised` int(11) NOT NULL,
  `inprogress_bool` int(11) NOT NULL,
  `Donorlist` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_ID`, `date_Start`, `date_End`, `Author_ID`, `approval_bool`, `approval_AdminID`, `funding_Goal`, `funding_Raised`, `inprogress_bool`, `Donorlist`) VALUES
(1, '2021-03-16', '2021-03-18', 2, 1, 3, 5000, 1000, 1, 1),
(2, '2021-04-04', '2021-04-04', 2, 1, 2, 500, 0, 0, NULL),
(3, '2021-04-05', NULL, 2, 0, NULL, 500, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(8) NOT NULL,
  `AccountType` varchar(1) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `AccountType`, `Username`, `Password`) VALUES
(1, '1', 'donor', '5555'),
(2, '2', 'student', '5555'),
(3, '3', 'admin', '5555');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donorlist`
--
ALTER TABLE `donorlist`
  ADD PRIMARY KEY (`Donorlist_ID`),
  ADD KEY `Request` (`Request_ID`),
  ADD KEY `Donor` (`Donor_ID`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`request_ID`),
  ADD KEY `Author` (`Author_ID`),
  ADD KEY `Admin` (`approval_AdminID`),
  ADD KEY `Donor` (`Donorlist`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donorlist`
--
ALTER TABLE `donorlist`
  MODIFY `Donorlist_ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `Admin` FOREIGN KEY (`approval_AdminID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `Author` FOREIGN KEY (`Author_ID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `Donor` FOREIGN KEY (`Donorlist`) REFERENCES `donorlist` (`Donorlist_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
