# Real-time chat room

This project is a real-time chat room based on Socket.io and Express.js, which incorporates OpenAI's language model to enable automatic replies. The front-end uses Vue3 and TailwindCSS technologies to create a visual interface.

這個專案是一個基於 Socket.io 和 Express.js 的即時聊天室，並且結合了 OpenAI 的語言模型來實現自動回復的功能。前端採用了 Vue3 和 TailwindCSS 技術來實現視覺化介面。

## Project Setup

#####client：
```sh

cd client   // move to client dir

npm install  // Install dependencies

npm run dev
```

#####server:
```sh
cd server   // move to server dir

npm install  // Install dependencies

npm run dev  // run node.js server
```

### OpenAi api key setting
Modify the value of ```OPENAI_API_KEY``` in ```server/.env.sample``` then rename the file to ```.env```


