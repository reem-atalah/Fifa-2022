# Fifa-2022
A web project to implement website for reserving seats in stadium to attend match

# How to Launch 
make .env file in root directory and put no name. i.e. file name = ".env"
file should be like that
```
PORT=8080
KEY=123
sqluser= root
sqlpassword= 123
```
change the values according to yours.

Also, make another .env inside FrontEnd folder and write in it:
```
NEXTAUTH_SECRET=dXvHhW2YACdPWMYDjWl4SbLdIEjzI8LEXw3Yum0suSg=
```

### BackEnd
to run the backend, in the root directory execute the command:
```
npm install
```
to install needed packages. Then run :
```
npm start
```
backend server should be running now.

### FrontEnd 
to run the fronend, on another terminal open FrontEnd directory and run the command 
```
yarn
```
to install needed packages. Then run:
```
yarn dev
```
frontend should be running now.

Now, go to your browser and type 
```
http://localhost:3000/
```
and <strong>Enjoy 😎</strong>
