CREATE DATABASE FIFA_2022;
USE FIFA_2022;
create table IF NOT exists User
(
Fname varchar(50) not null,
Lname varchar(50) not null,
primary key (Username),
Password varchar(50),
Email varchar(50),
Username varchar(50) not null,
Gender varchar(6),
Nationality varchar(50),
Birthdate date,
Role varchar(1),  -- 2 for admin, 1 for Manager, 0 for Fan --
manager boolean -- wanted to be manager: null: he didn't choose to be a manager, 
-- 0: asked to be manager but not approved yet, 1: now he's manager--
);

create table IF NOT exists Matches
(
MatchID int not null,
MatchDate date,
MatchTime time,
primary key (MatchID)

);

/*Insert Records*/

-- IT Adminstrators -- 
INSERT INTO User  VALUES ("Medhat","Nabel","999879","Nabel@gmail.com","mdehat","Male","Egyptian","1999-01-01",2,null);                                 

-- managers --
insert  into User values ('ola','adel','123456',"ola11@gmail.com",'ola', "Female" , "Palestinian","1999-01-01", 1,1);


-- Fan want to be a manager --
insert  into User values ('Amira','Ahmed','123456',"amiraaa@gmail.com",'amira', "Female" , "Yemeni","1999-01-01", 0,0);

--- Fan --
insert  into User values ('Ahmed','Ali','123456',"ahmed@gmail.com",'ahmed', "Male","Saudi","1999-01-01",0,null);

select * from User;
