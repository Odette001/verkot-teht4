DROP DATABASE IF EXISTS cicdtest;
CREATE DATABASE cicdtest;
-- Using root user, no need to create additional user
-- CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT ALL PRIVILEGES ON `cicdtest`.* TO 'your_username'@'localhost';
-- FLUSH PRIVILEGES;

USE cicdtest;

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_name` text NOT NULL,
  `filename` text NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);
  
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;