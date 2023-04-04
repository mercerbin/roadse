import { users } from '../models/index.js'
import mail from '../mailer/mail.js'

const confirmEmail = (socket, data) => {
  try {
    users.findOne({ "email": data.email, "auth": data.code }, null, (err, data) => {
      if (data) {
        users.updateOne({ "email": data.email }, { "auth": "" })
          .then(() => {
            mail(data.email, null, "Email Confirmed", "Your Account for Busone is Confirmed")
            return socket.emit('emailConfirmed', { message: "success" })
          })
      } else {
        return socket.emit('confirmError', err || {
          message: 'Invalid Auth Token'
        });
      }
    });
  } catch (error) {
    console.log("Error while logging in", error)
  }
}

export default confirmEmail