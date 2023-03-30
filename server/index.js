const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:9487"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("join-chat", (msg, callback) => {
    console.log(msg);
    return callback();
  });
});

http.listen(9527, () => {
  console.log("listening on *:9527");
});
