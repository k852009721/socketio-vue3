require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
	cors: {
		origins: ['http://localhost:9487'],
	},
})
const { addUser, getUser, removeUser, getUserInRoom } = require('./utils/user')
const { addUserChatMessage, removeUserChatMessage, getUserChatMessage } = require('./utils/message')
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

app.get('/', (req, res) => {
	res.send('<h1>Hey Socket.io</h1>')
})

io.on('connection', (socket) => {
	console.log('user connect')
	socket.on('disconnect', () => {
		console.log('user disconnected')
		const user = removeUser(socket.id)
		if (user) {
			io.to(user.roomNumber).emit('setUsers', getUserInRoom(user.roomNumber))
		}
	})

	socket.emit('setUserID', socket.id)

	socket.on('joinChat', (status, callback) => {
		const { error, user } = addUser({ id: socket.id, ...status })
		if (error) {
			return callback(error)
		} else {
			socket.join(status.roomNumber)
			io.to(status.roomNumber).emit('setUsers', getUserInRoom(status.roomNumber))
			return callback()
		}
	})

	socket.on('messageFromClient', async (messageData, userId) => {
		const message = {
			content: messageData,
			id: new Date().getMilliseconds(),
		}
		const user = getUser(userId)
		io.to(user.roomNumber).emit('messageFromServer', message, userId, 'normal')
	})

	socket.on('aiMessageFromClient', async (messageData, userId) => {
		addUserChatMessage({
			userId: userId,
			message: messageData,
			messageRole: 'user',
		})
		const messages = getUserChatMessage({ userId: userId })
		console.log('messages:', messages)
		const message = {
			content: messageData,
			id: new Date().getMilliseconds(),
		}
		socket.emit('messageFromServer', message, userId, 'gpt')
		try {
			const openai = new OpenAIApi(configuration)
			const completion = await openai.createChatCompletion(
				{
					model: 'gpt-3.5-turbo-0301',
					messages: messages,
				},
				{
					timeout: 60000,
				}
			)
			console.log(completion.data.choices[0].message)
			addUserChatMessage({
				userId: userId,
				message: completion.data.choices[0].message.content,
				messageRole: 'assistant',
			})
			console.log(completion.data.choices[0].message.content)
			const AImessage = {
				content: completion.data.choices[0].message.content,
				id: new Date().getMilliseconds(),
			}
			socket.emit('messageFromServer', AImessage, 'AI', 'gpt')
		} catch (error) {
			removeUserChatMessage({ userId: userId })
			console.log(error)
			socket.emit(
				'messageFromServer',
				{
					content: 'time out',
					id: new Date().getMilliseconds(),
				},
				'AI',
				'gpt'
			)
		}
	})

	socket.on('personalMessageFromClient', ({ senderId, receiverId, message }) => {
		const messageData = {
			content: message,
			id: new Date().getMilliseconds(),
			senderId,
			receiverId,
		}
		socket.emit('messageFromServer', messageData, senderId, 'personal', receiverId)
		io.to(receiverId).emit('messageFromServer', messageData, senderId, 'personal')
	})
})

http.listen(9527, () => {
	console.log('listening on *:9527')
})
