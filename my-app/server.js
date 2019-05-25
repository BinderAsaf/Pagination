const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyparser = require('body-parser');

const app = express();
const port = 5000;


const server = http.createServer(app);
const io=socketIo(server);

app.use(express.static('build'));
app.set('views','./build');

// set io var to use in other files
app.set('socketio',io);

//bodyParser
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//routes uses
app.use('/',require('./routes/Users'));

//send index.html
app.get('/', (req, res) => res.sendFile(`${process.cwd()}/build/index.html`));

//logger connections
io.on("connection", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
  });



server.listen(port, () => console.log(`Example app listening on port ${port}!`))