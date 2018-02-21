const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");
const WebSocket = require("ws");

const PORT = 3001;

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

const wss = new SocketServer({ server });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("message", function incoming(message) {
    const newMsg = JSON.parse(message);
    newMsg.id = uuidv1();

    wss.broadcast = function broadcast(input) {
      const dataString = JSON.stringify(input);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          console.log("broadcast", typeof dataString);
          client.send(dataString);
        }
      });
    };
    wss.broadcast(newMsg);
  });

  ws.on("close", () => console.log("Client disconnected"));
});
