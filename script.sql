
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

INSERT INTO Applicants VALUES ('plin', 'Patrick', 'Lin', 12345678, 7783242213, 'patrick.lin@ubc.ca', 'yes', '', '', 186620, DATE '2017-09-25');
INSERT INTO Applicants VALUES ('jLee', 'Justin', 'Lee', 48535678, 7783242213, 'Justin.Lee@ubc.ca', 'no', 'no', '', 186521, DATE '2017-09-25');
INSERT INTO Applicants VALUES ('jChan', 'Johnathan', 'Chan', 12343248, 7783242213, 'johnathan.chan@ubc.ca', 'other', 'no', '', 186610, DATE '2017-09-25');
INSERT INTO Applicants VALUES ('aLiu', 'Aaron', 'Liu', 48564678, 7783242213, 'Aaron.Liu@ubc.ca', 'yes', 'yes', 'first nation', 186521, DATE '2017-09-25');