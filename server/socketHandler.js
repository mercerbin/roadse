import { io } from "./server.js";
import { login, register, confirmEmail, forgotPass, newPass, resendCode } from '../user/index.js'
import { getEmail, addShop, getShops } from '../admin/index.js'
import addWork from "../user/addWork.js";
import getWork from "../user/getWork.js"

const socketHandler = () => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on('login', (token) => {
      login(socket, token)
    })

    socket.on('register', (token) => {
      register(socket, token)
    })

    socket.on('confirmEmail', (token) => {
      confirmEmail(socket, token)
    })

    socket.on('forgotPass', (token) => {
      forgotPass(socket, token)
    })

    socket.on('newPass', (token) => {
      newPass(socket, token)
    })

    socket.on('resendCode', (token) => {
      resendCode(socket, token)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
    });

    socket.on("getEmails", (token) => {
      getEmail(socket, token);
    })

    socket.on("addShop", (token) => {
      addShop(socket, token);
    })

    socket.on("getShops", (token) => {
      getShops(socket, token);
    })

    socket.on("addWork", (token) => {
      addWork(socket, token);
    })

    socket.on("getWork", (token) => {
      getWork(socket, token);
    })

  })

}

export default socketHandler