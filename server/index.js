require("dotenv").config();
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:9487"],
  },
});
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.emit("setUserID", socket.id);

  socket.on("joinChat", (msg, callback) => {
    const err = "error";
    const ok = socket.id;
    return callback(ok);
  });

  socket.on("messageFromClient", async (messageData, userId) => {
    const message = {
      content: messageData,
      id: new Date().getMilliseconds(),
    };
    socket.emit("messageFromServer", message, "user");
    try {
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: messageData,
          max_tokens: 100,
          temperature: 0,
        },
        { timeout: 10000 }
      );
      console.log(response.data.choices[0].text);
      const AImessage = {
        content: response.data.choices[0].text,
        id: new Date().getMilliseconds(),
      };
      socket.emit("messageFromServer", AImessage, "AI");
    } catch (error) {
      console.log(error);
      socket.emit(
        "messageFromServer",
        {
          content: "time out",
          id: new Date().getMilliseconds(),
        },
        "AI"
      );
    }
  });
});

http.listen(9527, () => {
  console.log("listening on *:9527");
});
