
DROP TABLE IF EXISTS Applicants;

CREATE TABLE Applicants
	(CWL VARCHAR(250) NOT NULL,
	ShibStudentNumber INT(10) NOT NULL,
	ShibFirstName VARCHAR(250) NOT NULL,
	ShibLastName VARCHAR(250) NOT NULL,
	FirstName VARCHAR(250) NOT NULL,
	LastName VARCHAR(250) NOT NULL,
	ID INT(10) NOT NULL,
	Phone VARCHAR(250) NULL,
	Email VARCHAR(250) NULL,
	Birthday DATE NULL,
	NumberOfApps VARCHAR(250) NULL,
	Aboriginal VARCHAR(250) NULL,
	AboriginalIdentity VARCHAR(250) NULL,
	ApplicationNumber VARCHAR(250) NULL,
	FilePath VARCHAR(250) NULL,
	CreateDate DATE NOT NULL,
	PRIMARY KEY (CWL));

INSERT INTO Applicants VALUES ('plin', 12345678, 'Patrick', 'Lin', 'Patrick', 'Lin', 12345678, 7783242213, 'patrick.lin@ubc.ca', DATE '2017-09-25', 'yes', '', '', 186620, '', DATE '2017-09-25');
INSERT INTO Applicants VALUES ('jLee', 48535678, 'Justin', 'Lee', 'Justin', 'Lee', 48535678, 7783242213, 'Justin.Lee@ubc.ca', DATE '2017-09-25', 'no', 'no', '', 186521, '', DATE '2017-09-25');
INSERT INTO Applicants VALUES ('jChan', 12343248, 'Johnathan', 'Chan', 'Johnathan', 'Chan', 12343248, 7783242213, 'johnathan.chan@ubc.ca', DATE '2017-09-25', 'other', 'no', '', 186610, '', DATE '2017-09-25');
INSERT INTO Applicants VALUES ('aLiu', 48564678, 'Aaron', 'Liu', 'Aaron', 'Liu', 48564678, 7783242213, 'Aaron.Liu@ubc.ca', DATE '2017-09-25', 'yes', 'yes', 'first nation', 186521, '', DATE '2017-09-25');