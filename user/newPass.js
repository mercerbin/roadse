import { users } from '../models/index.js'
import mail from '../mailer/mail.js'

const forgotPass = (socket, mdata) => {
  try {
    users.findOne({ email: mdata.email, auth: mdata.auth }, null, (err, data) => {
      if (data) {
        users.updateOne({ "email": mdata.email }, { "auth": "", "password": mdata.password })
          .then(() => {
            return socket.emit('resetSuccess', { 'message': 'success' });
          })
      } else {
        return socket.emit('resetError', err || {
          message: "Email or Token Error"
        });
      }
    });

  } catch (error) {
    console.log("Error creating user", error);
  }

}

export default forgotPass