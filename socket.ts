import http from 'http';
import { Server } from 'socket.io';

let interval: number = 1000;

const socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => console.log('user disconnect', socket.id));

    socket.on('good', (data: any) => {
      console.log(data); // 클라이언트 -> 서버
    });

    setInterval(() => {
      socket.emit('hi', '서버 -> 클라이언트');
    }, interval);
  });
};

export default socket;
