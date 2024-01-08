import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// 채팅방을 위한 간단한 인메모리 저장소 (실제 프로덕션 환경에서는 데이터베이스 사용을 고려해야 함)
interface Message {
  author: string;
  message: string;
}

let chatHistory: Message[] = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 이전 채팅 기록 전송
  socket.emit('chat history', chatHistory);

  // 메시지 수신
  socket.on('chat message', (msg: Message) => {
    chatHistory.push(msg); // 메시지 저장
    io.emit('chat message', msg); // 모든 클라이언트에게 메시지 전송
  });

  // 연결 해제
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
