const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const path = require("path");
const connectDB = require('./config/db')
const socket = require("socket.io");
const ChatMessage = require('./models/ChatMessage');
require('dotenv').config()


// mongodb connect
connectDB()

// app
const app = express();

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())


//------------deploy/serve reactBuild---------------
const _dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "/client/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API GOOD & running");
    });
  }
//-------------------------------------------------




// app listen
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server GOOD, running on port http://localhost:${PORT}/...`)
})



// io/socket
const io = socket(server, {
    cors: {
        pingTimeout: 60000,
        origin: process.NODE_ENV === 'production' ? `${process.env.ORIGIN}`: "http://localhost:3000/" ,
        methods: [ 'GET', 'POST' ]
    }
});


// io on connection/listen events
io.on('connection', (socket) => {
    // on connect display messages
    ChatMessage.find({}).then(result => {
        socket.emit('display-messages', result)
    })
    // user connected event
      console.log('user connected: ', socket.id);
    
      // user disconnected event
      socket.on("disconnect", () => {
          console.log('user is disconnected')
        });

        // add new message
        socket.on('add-message', ({message, name, image}) => {
            let  chatMessage  =  new ChatMessage({ message: message, name: name, image: image});
            chatMessage.save();
            io.emit("add-message", chatMessage);
    });

})
  


