DROP DATABASE IF EXISTS FIFA_2022;

CREATE DATABASE FIFA_2022;
USE FIFA_2022;


/* Tables for Teams? 
    - Check that Team can't have two matches Same time!
*/

create table IF NOT exists Users
(
    ID int not null auto_increment,
    primary key (ID),
    Username varchar(50) not null unique,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Email varchar(50),
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
    Team1 varchar(50) not null,
    Team2 varchar(50) not null,
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
    TicketID int not null
);

/*Insert Records*/

-- IT Adminstrators -- 
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
VALUES ("medhat", "Medhat", "Nabel", "Nabel@gmail.com", "1999-01-01", "Male", "999879", "Egyptian", 0);                                 

-- managers --
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
Values('ola', 'ola', 'adel', 'ola11@gmail.com', '1999-01-01', 'Female', '123456', 'Palestinian', 1);

-- Fan want to be a manager --
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role)
Values('amira', 'Amira', 'Ahmed', 'amiraaa@gmail.com', '1999-01-01', 'Female', '123456', 'Yemeni', 2);

-- Fan --
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
VALUES (1, '2022-01-01 12:00:00', 'Egypt', 'Saudi', 'Ahmed', 'Ali', 'Mohamed');

