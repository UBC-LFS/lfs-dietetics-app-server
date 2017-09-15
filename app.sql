
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
	(firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
	id VARCHAR(20) NOT NULL,
	phone CHAR(10) NULL,
	email VARCHAR(40) NULL,
    numofApps VARCHAR(20) NULL,
    aboriginal VARCHAR(20) NULL,
    aboriginalIdentity VARCHAR(20) NULL,
	pin VARCHAR(20) NULL,
	createDate DATE NOT NULL,
	PRIMARY KEY (id));

insert into Users values ('Patrick', 'Lin', '12345678', '7783242213', 'patricklin@alumni.ubc.ca', 'yes', 'yes', 'first nation', DATE '2016-11-02');