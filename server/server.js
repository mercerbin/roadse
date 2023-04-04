import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { createServer } from 'http'
import { Server } from 'socket.io'

const Storage = multer.diskStorage({ destination: 'uploads', filename: (req, file, cb) => { cb(null, file.originalname) } })
const upload = multer({ storage: Storage }).single('Image')

const app = express()
app.use(cors())
app.use(express.json())
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

export { io, server, upload }