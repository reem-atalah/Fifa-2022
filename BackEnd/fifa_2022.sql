DROP DATABASE IF EXISTS FIFA_2022;

CREATE DATABASE FIFA_2022;
USE FIFA_2022;

-- Constant 32 Teams
create table IF NOT exists Teams
(
    ID int not null auto_increment,
    primary key (ID),
    Name varchar(50) not null unique,
    picture varchar(1000)
);

create table IF NOT exists Users
(
    ID int not null auto_increment,
    primary key (ID),
    Username varchar(50) not null unique,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Email varchar(50) not null unique,
    BirthDate date,
    Gender varchar(6),
    Password varchar(50) not null,
    Nationality varchar(50),
    Role varchar(1) not null  -- 0 for admin, 1 for Manager, 2 for Fan Who Wants Managment, 3 for Fan
);

CREATE TABLE IF NOT EXISTS Stadiums
(
    ID int not null auto_increment,
    primary key (ID),
    Name varchar(50) not null,
    NumRows int not null,
    NumSeatsPerRow int not null
);

create table IF NOT exists Matches
(
    ID int not null auto_increment,
    primary key (ID),
    StadiumID int not null,
    foreign key (StadiumID) references Stadiums(ID),
    Time datetime not null,
    Team1 int not null,
    foreign key (Team1) references Teams(ID),
    Team2 int not null,
    foreign key (Team2) references Teams(ID),
    Referee varchar(50) not null,
    Linesman1 varchar(50) not null,
    Linesman2 varchar(50) not null
);

CREATE TABLE IF NOT EXISTS Reserve
(
    UserID int not null,
    foreign key (UserID) references Users(ID),
    MatchID int not null,
    foreign key (MatchID) references Matches(ID),
    SeatNo int not null,
    -- Seats cant be booked twice in the same match
    primary key (MatchID, SeatNo)
);

/*Insert Records*/

-- Teams
-- 32 Teams
INSERT INTO Teams (Name) VALUES ('Egypt');
INSERT INTO Teams (Name) VALUES ('Morocco');
INSERT INTO Teams (Name) VALUES ('Tunisia');
INSERT INTO Teams (Name) VALUES ('Algeria');
INSERT INTO Teams (Name) VALUES ('Sudan');
INSERT INTO Teams (Name) VALUES ('Libya');
INSERT INTO Teams (Name) VALUES ('Mauritania');
INSERT INTO Teams (Name) VALUES ('Djibouti');
INSERT INTO Teams (Name) VALUES ('Somalia');
INSERT INTO Teams (Name) VALUES ('Comoros');
INSERT INTO Teams (Name) VALUES ('Yemen');
INSERT INTO Teams (Name) VALUES ('Oman');
INSERT INTO Teams (Name) VALUES ('Syria');
INSERT INTO Teams (Name) VALUES ('UAE');
INSERT INTO Teams (Name) VALUES ('Qatar');
INSERT INTO Teams (Name) VALUES ('Bahrain');
INSERT INTO Teams (Name) VALUES ('Kuwait');
INSERT INTO Teams (Name) VALUES ('Saudi-Arabia');
INSERT INTO Teams (Name) VALUES ('Iraq');
INSERT INTO Teams (Name) VALUES ('Jordan');
INSERT INTO Teams (Name) VALUES ('Lebanon');
INSERT INTO Teams (Name) VALUES ('Afghanistan');
INSERT INTO Teams (Name) VALUES ('Bangladesh');
INSERT INTO Teams (Name) VALUES ('Bhutan');
INSERT INTO Teams (Name) VALUES ('Brunei');
INSERT INTO Teams (Name) VALUES ('Cambodia');
INSERT INTO Teams (Name) VALUES ('China');
INSERT INTO Teams (Name) VALUES ('India');
INSERT INTO Teams (Name) VALUES ('Indonesia');
INSERT INTO Teams (Name) VALUES ('Iran');
INSERT INTO Teams (Name) VALUES ('Malaysia');
INSERT INTO Teams (Name) VALUES ('Maldives');
INSERT INTO Teams (Name) VALUES ('Mongolia');
INSERT INTO Teams (Name) VALUES ('Myanmar');
INSERT INTO Teams (Name) VALUES ('Nepal');

-- IT Adminstrators
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
VALUES ("medhat", "Medhat", "Nabel", "Nabel@gmail.com", "1999-01-01", "Male", "999879", "Egyptian", 0);

-- Managers
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
Values('ola', 'ola', 'adel', 'ola11@gmail.com', '1999-01-01', 'Female', '123456', 'Palestinian', 1);

-- Fan want to be a manager
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
Values('amira', 'Amira', 'Ahmed', 'amiraaa@gmail.com', '1999-01-01', 'Female', '123456', 'Yemeni', 2);

-- Fan
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
Values('ahmed', 'Ahmed', 'Ali', 'ahmed@gmail.com', '1999-01-01', 'Male', '123456', 'Saudi', 3);

select * from Users;

-- Stadiums
INSERT INTO Stadiums (Name, NumRows, NumSeatsPerRow)
VALUES ('S1', 10, 10);

INSERT INTO Stadiums (Name, NumRows, NumSeatsPerRow)
VALUES ('S2', 5, 15);

-- MATCHES
INSERT INTO Matches (StadiumID, Time, Team1, Team2, Referee, Linesman1, Linesman2)
VALUES (1, '2022-01-01 12:00:00', 1, 2, 'Ahmed', 'Ali', 'Mohamed');

-- Reserve
INSERT INTO Reserve (UserID ,MatchID ,SeatNo) VALUES (4,  1, 3);



