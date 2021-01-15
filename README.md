# Simple Express REST API and some data manipulation with React

## REST API
Express API is written in [server.js](https://github.com/eliaspoylio/name_app/blob/master/server.js). You can start it with:
```
node .\server.js
```
### Requests
The API handles two kind of requests: 
1. All
```
/api/all
```
Response is all the names and amounts.


2. Name
```
/api/:name
```
Response is the name and amount of the specified name.

## React client

The app makes the `/api/all` -request when loaded and then calculates the amount of all the people presented in the response data. The user can toggle the order in which the data is presented. There's also a form and the user can search a specific name with the `/api/:name` -request from the form.

Start the development build with:
```
npm start
```

## TODO
- token/session id for the requests

- error response

- html-page for the API

## 
When building and displaying react frontend as default
```
//server.use(express.static(path.join(__dirname, 'build')));
//default
//res.sendFile(path.join(__dirname, 'build/index.html'));
```