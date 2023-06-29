-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2023 at 10:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab11`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Account` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Block` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `EmpID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account`, `Password`, `Block`, `Role`, `EmpID`) VALUES
('quanh', '123', '0', '1', 1),
('phuong', '123', '1', '0', 2),
('hung', '123', '0', '0', 3),
('duong', '123', '0', '0', 4),
('duy', '123', '0', '0', 5),
('quanh2', '123', '0', '0', 24);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Fullname` varchar(255) NOT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `EmpID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Fullname`, `Birthday`, `Gender`, `Email`, `Phone`, `Address`, `EmpID`) VALUES
('Chu Quang Anh', '2002-05-23', 'Men', 'anh@gmail.com', '0372691660', 'Ha Noi', 1),
('Nguyen Thi Thu Phuong', '2023-05-11', 'Woman', 'asda@dasdas.com', '035265856', 'Hai Phong', 2),
('Le Thuy Duong', '2023-05-18', 'False', 'asdsad@sdasd.com', '0355685625', 'Da Nang', 4),
('Vu Ngoc Hung', '2023-05-11', 'True', 'asdsa@dasda.com', '0352586523', 'Vinh Phuc', 3),
('Chu Thanh Duy', '2023-05-17', 'Men', 'asdsad@sdaw.com', '03522132525', 'Tinh Lam', 5),
('Quang Anh Chu', '2023-05-20', 'True', 'sdad@fdfsdf', '+84372691660', 'Ngai Cau, An Khanh, Hoai Duc', 24);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`EmpID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD KEY `EmpID` (`EmpID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `EmpID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `account` (`EmpID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
