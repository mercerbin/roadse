import { users } from '../models/index.js'

const login = (socket, data) => {
  try {
    users.findOne(data, null, (err, data) => {
      if (data) {
        if (data.auth !== "") {
          return socket.emit('loginConfirm', { 'email': data.email })
        } else {
          return socket.emit('loginSuccess', data);
        }
      } else {
        return socket.emit('loginError', err || {
          message: 'Invalid email or password'
        });
      }
    });
  } catch (error) {
    console.log("Error while logging in", error)
  }
}

export default login