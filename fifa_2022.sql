DROP DATABASE IF EXISTS FIFA_2022;

CREATE DATABASE FIFA_2022;
USE FIFA_2022;

create table IF NOT exists Users
(
    ID int not null auto_increment,
    primary key (ID),
    Username varchar(50) not null,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Email varchar(50),
    BirthDate date,
    Gender varchar(6),
    Password varchar(50) not null,
    Nationality varchar(50),
    Role varchar(1) not null,  -- 2 for admin, 1 for Manager, 0 for Fan --
    Manager boolean -- wanted to be manager: null: he didn't choose to be a manager, 
    -- 0: asked to be manager but not approved yet, 1: now he's manager--
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
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role, Manager)
VALUES ("medhat", "Medhat", "Nabel", "Nabel@gmail.com", "1999-01-01", "Male", "999879", "Egyptian", 2, null);                                 

-- managers --
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role, Manager)
Values('ola', 'ola', 'adel', 'ola11@gmail.com', '1999-01-01', 'Female', '123456', 'Palestinian', 1, 1);

-- Fan want to be a manager --
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role, Manager)
Values('amira', 'Amira', 'Ahmed', 'amiraaa@gmail.com', '1999-01-01', 'Female', '123456', 'Yemeni', 0, 0);

-- Fan --
INSERT INTO Users (UserName, FirstName, LastName, Email, BirthDate, Gender, Password, Nationality, Role, Manager)
Values('ahmed', 'Ahmed', 'Ali', 'ahmed@gmail.com', '1999-01-01', 'Male', '123456', 'Saudi', 0, null);

select * from Users;
