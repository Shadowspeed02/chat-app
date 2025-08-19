import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import "dotenv/config";

// create expres app using http server
const app = express();
const server = http.createServer(app);

// initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}

})

// store online users
export const userSocketmap = {}

// socket io cibbection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected:", userId);

    if(userId) userSocketmap[userId] = socket.id;

    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketmap));

    socket.on("disconnect", () => {
        console.log("User Disconnected:", userId);    
        delete userSocketmap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketmap));  
    })
    
})

// middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());


// routes setup
app.use("/api/status", (req, res)=> res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect to mongodb
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("Serveris running on Port:" + PORT));