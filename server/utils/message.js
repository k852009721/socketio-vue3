const messageList = {}

const addUserChatMessage = ({ userId, message, messageRole }) => {
	if (!messageList[userId]) {
		messageList[userId] = []
	}

	messageList[userId].push({
		role: messageRole,
		content: message,
	})
}

const removeUserChatMessage = ({ userId }) => {
	messageList[userId].pop()
}

const getUserChatMessage = ({ userId }) => {
	return messageList[userId]
}

module.exports = { addUserChatMessage, removeUserChatMessage, getUserChatMessage }
