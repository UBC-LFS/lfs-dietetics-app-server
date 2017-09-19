
DROP TABLE IF EXISTS Applicants;

CREATE TABLE Applicants
	(CWL VARCHAR(250) NOT NULL, 
	FirstName VARCHAR(250) NOT NULL,
	LastName VARCHAR(250) NOT NULL,
	ID INT(10) NOT NULL,
	Phone VARCHAR(250) NULL,
	Email VARCHAR(250) NULL,
	NumberOfApps VARCHAR(250) NULL,
	Aboriginal VARCHAR(250) NULL,
	AboriginalIdentity VARCHAR(250) NULL,
	ApplicationNumber VARCHAR(250) NULL,
	CreateDate DATE NOT NULL,
	PRIMARY KEY (CWL));

INSERT INTO Applicants VALUES ('plin219', 'Patrick', 'Lin', 12345678, '7783242213', 'patricklin@alumni.ubc.ca', 'yes', 'yes', 'first nation', '', DATE '2017-11-02');
