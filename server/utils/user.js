const userList = []

const addUser = ({ id, userName, roomNumber }) => {
	userName = userName.trim().toLowerCase()

	if (!userName || !roomNumber) {
		return {
			error: 'Username and room are required',
		}
	}

	const existingUser = userList.find((user) => {
		return user.roomNumber === roomNumber && user.userName === userName
	})

	if (existingUser) {
		return { error: 'Username is in use' }
	}

	const user = { id, userName, roomNumber }
	userList.push(user)
	return { user }
}

const getUser = (id) => {
	return userList.find((user) => user.id === id)
}

const removeUser = (id) => {
	const index = userList.findIndex((user) => user.id === id)
	if (index !== -1) {
		return userList.splice(index, 1)[0]
	}
}

const getUserInRoom = (roomNumber) => {
	return userList.filter((user) => {
		return user.roomNumber === roomNumber
	})
}

module.exports = { addUser, getUser, removeUser, getUserInRoom }
