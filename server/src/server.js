const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});


const SocketEvent = require('./types');

app.set('view engine', 'ejs');
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('ala ma kota');
})

io.on('connection', (socket) => {
    socket.on(SocketEvent.RoomJoin, (data) => {
        console.log(data);
    })

    socket.on(SocketEvent.SendMessage, (data) => {
        console.log(data);
        socket.broadcast.emit(SocketEvent.SendMessage, data);
    })

    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// const peerServer = PeerServer({port: 3001, path: '/'});

http.listen(3000, () => {
    console.log('App started on 3000');
});
