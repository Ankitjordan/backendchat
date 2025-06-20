import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import router from "./routes/homeRoute.js";
import cors from "cors";
/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://frontend-logic-chatapp-frm1.vercel.app/",
    methods: ["GET", "POST"], // yeh likhna safe & recommended hai
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-room", (key) => {
    socket.join(key);
  });

  socket.on("send-message", ({ roomKey, message }) => {
    io.to(roomKey).emit("receive-message", message);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", router);
const PORT = process.env.PORT || 3000;

server.listen(PORT);
