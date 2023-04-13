const messageList = {}

const addUserChatMessage = ({ userId, message, messageRole }) => {
	if (!messageList[userId]) {
		messageList[userId] = []
	}

	if (messageList[userId].length > 20) {
		messageList[userId].shift()
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
