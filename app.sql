
DROP TABLE IF EXISTS Applicants;

CREATE TABLE Applicants
	(FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	ID VARCHAR(10) NOT NULL,
	Phone VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	ApplicationNumber VARCHAR(10) NULL,
	Aboriginal VARCHAR(5) NULL,
	AboriginalIdentity VARCHAR(20) NULL,
	PIN VARCHAR(20) NULL,
	CreateDate DATE NOT NULL,
	PRIMARY KEY (ID));

insert into Applicants values ('Patrick', 'Lin', '12345678', '7783242213', 'patricklin@alumni.ubc.ca', 'yes', 'yes', 'first nation', '', DATE '2016-11-02');
