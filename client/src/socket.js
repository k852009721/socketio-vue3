import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? `window.location` : import.meta.env.VITE_SOCKET_ENDPOINT

export const socket = io(URL, { autoConnect: false })

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('foo', (...args) => {
  state.fooEvents.push(args)
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})
