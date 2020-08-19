#Vidly
A simple Node REST API written in Node.
This is a part of the Coding with Mosh course on Node.js.

I built this simply for the purposes of my education (mainly in Node.js and MongoDB).

##Running the App

###Start MongoDB
Ensure that that mongodb-community is installed on your machine, and that the mongo daemon is running.

If you're just starting out with MongoDB on Mac, then follow along with the [official setup guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).

###Boot Up the Express Server

Optionally, set the port it will run on:
```
export PORT=4999
```

Start Node JS runtime with nodemon for monitoring of source files and auto-restart on save:
```
nodemon index.js
```
