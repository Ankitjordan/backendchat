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
    origin: ["https://frontend-logic-chatapp.vercel.app"],
    methods: ["GET", "POST"], // yeh likhna safe & recommended hai
  },
});
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-room", (key) => {
    socket.join(key);
  });

  socket.on("send-message", ({ roomKey, message }) => {
    io.to(roomKey).emit("receive-message", message);
  });
});

app.get("/", (req, res) => {
  console.log("✅ Hello from Vercel backend");
  res.send("Hello World from backend!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
