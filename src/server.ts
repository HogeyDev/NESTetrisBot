import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
let server = http.createServer(app);
let io = new Server(server);

console.log(publicPath);
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server Started on Port: ${port}`);
});

io.on('/', function (req, res) {
    console.log(path.join(__dirname, '/../public/index.html'));
    res.sendFile(path.join(__dirname, '/../public/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('alert-for-me');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});