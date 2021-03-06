-- CREATES THE APP DATABASE WITH THE GIVEN NAME
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateAppDatabase`(IN dbName VARCHAR(100))
BEGIN
	DECLARE stmt TEXT;
    SET @stmt = CONCAT('CREATE DATABASE `', dbName, '` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci');
    PREPARE prep FROM @stmt;
    EXECUTE prep;
END$$
DELIMITER ;
