
DROP TABLE IF EXISTS Applicants;

CREATE TABLE Applicants
	(CWL VARCHAR(250) NOT NULL,
	ShibStudentNumber INT(10) NOT NULL,
	ShibFirstName VARCHAR(250) NOT NULL,
	ShibLastName VARCHAR(250) NOT NULL,
	FirstName VARCHAR(250) NOT NULL,
	LastName VARCHAR(250) NOT NULL,
	ID INT(10) NOT NULL,
	CurrentInstitution VARCHAR(250) NOT NULL, 
	Phone VARCHAR(250) NULL,
	UBCEmail VARCHAR(250) NULL, 
	Email VARCHAR(250) NULL,
	Birthday DATE NULL,
	NumberOfApps VARCHAR(250) NULL,
	Aboriginal VARCHAR(250) NULL,
	AboriginalIdentity VARCHAR(250) NULL,
	ApplicationNumber VARCHAR(250) NULL,
	FilePath VARCHAR(250) NULL,
	CreateDate DATE NOT NULL,
	PRIMARY KEY (CWL));
	