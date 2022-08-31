# Chat Rooms
An application that will allow users to connect via socket to a certain chat room, 
in which they can receive and send messages to the other participants in the room.

## Introduction
In my current job, I am assigned the task of connecting through a socket to the server and getting the information, 
and displaying it to the user instantly. I needed to investigate it. 
The idea of the app is simple, connect to a channel (room) and start sending and receiving messages.

## Technologies
Project is created with: 
* **Axios 0.27.2**
* **cors 2.8.5**
* **dotenv 16.0.1**
* **express 4.18.1**
* **socket.io 4.5.1**

## Setup
To run this project
```
$ git clone https://github.com/roninJosue/chat-server.git

$ cd /chat-server
$ npm install
$ npm run dev
```

## Sources
This chat API was made following this awesome [tutorial](https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#what-is-socket-io) 
by [Danny Adams](https://www.freecodecamp.org/news/author/danny-adams/)