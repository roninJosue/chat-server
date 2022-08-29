require('dotenv').config()
console.log(process.env.HARPERDB_URL)
console.log(process.env.HARPERDB_PW)

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const harperSaveMessage = require('./services/harper-save-message')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const CHAT_BOT = 'ChatBot'
let chatRoom = ''
let allUsers = []
let chatRoomUsers = []

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)

  socket.on('join_room', data => {
    const {username, room} = data
    socket.join(room)

    chatRoom = room
    allUsers.push({id: socket.id, username, room})
    chatRoomUsers = allUsers.filter((user) => user.room === room)
    socket.to(room).emit('chatroom_users', chatRoomUsers)
    socket.emit('chatroom_users', chatRoomUsers)

    let __createdtime__ = Date.now()
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    })

    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__
    })
  })

  socket.on('send_message', (data) => {
    const {message, username, room, __createdtime__} = data
    io.in(room).emit('receive_message', data)
    harperSaveMessage(message, username, room, __createdtime__)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

})

app.get('/', (_req, res) => {
  res.send('Hello world!!!')
})

server.listen(4000, () => 'Server is running on port 4000')
