# NOTE

The project is hosted in this link https://basisfe-96d21.web.app/ , upon opening you can go through the login / signup flow as mentioned in the assignment. 

Libraries used : React toastify, Material UI, React - Redux, React Loading Overlay. 

The app is hosted using Firbase hosting. 

## Working flow: 

-> Some logins were created while development, a few you can try are : shishira_nataraj@live.com , shishiranataraj27@gmail.com .
Upon email ID given, the verify API is called to verify the crediblity of the user, on success, the user data is put onto a redux store. 
Based on the redux store isLogin status, the decision to login or not is given. 

-> For signup, the tokens are first being fetched on the login page which are again put onto the redux store, the token is passed along with the email, name and verify email field. Upon successful signup, the landing page is navigated to. 

-> Upon login failure, signup page is opened up. 
-> Upon signup failure, toast messages for each event has been put up in general and signup does not take place. 


## to run locally
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `yarn install`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

