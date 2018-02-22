const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");
const WebSocket = require("ws");
const PORT = 3001;
const querystring = require("querystring");
const fetch = require("node-fetch");
const usersOnline = { type: "currentClients", clientsOn: 0 };
const randomColor = require("randomcolor");

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  const dataString = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(dataString);
    }
  });
};

wss.on("connection", ws => {
  let colour = randomColor();
  usersOnline.clientsOn += 1;
  wss.broadcast(usersOnline);

  ws.on("message", function incoming(message) {
    const messageParsed = JSON.parse(message);
    switch (messageParsed.type) {
      case "postMessage":
        messageParsed.id = uuidv1();
        messageParsed.type = "incomingMessage";
        messageParsed.colour = colour;
        wss.broadcast(messageParsed);
        break;

      case "postNotification":
        messageParsed.id = uuidv1();
        messageParsed.type = "incomingNotification";
        wss.broadcast(messageParsed);
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  });

  ws.on("close", () => {
    usersOnline.clientsOn -= 1;
    wss.broadcast(usersOnline);
    console.log("Client disconnected", usersOnline);
  });
});
