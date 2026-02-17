import { createServer } from "http";
// import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer, {
    path: "/api/socket/io",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Socket.io server running at path: /api/socket/io`);
  });
});
