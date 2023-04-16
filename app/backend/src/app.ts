import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import SignUpRoutes from './routes/signup.routes';
import LoginRouter from './routes/login.routes';

import http from 'http';
import { Server } from 'socket.io';

const app = express();

mongoose.connect('mongodb://localhost:3002/webchat');

app.use(express.json());
app.use(cors());
app.use('/', LoginRouter);
app.use('/signup', SignUpRoutes);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000",
  }
});

export { serverHttp, io };

// class App {
//   public app: express.Express;

//   constructor() {
//     this.app = express();

//     this.config();

//     this.app.use('/', LoginRouter);
//     this.app.use('/signup', SignUpRoutes);
//   }

//   private config():void {
//     mongoose.connect('mongodb://localhost:3002/webchat');
//     this.app.use(express.json());
//     this.app.use(cors());
//   };

//   public start(PORT: string | number): void {
//     this.app.listen(PORT, () => {
//       console.log(`Running on port ${PORT}`)
//     });
//   }
// }

// export { App };

// const app = express();

// app.listen(3001, () => {
//   console.log('Server is listening')
// });
