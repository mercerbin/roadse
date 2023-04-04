import { users } from '../models/index.js'
import mail from '../mailer/mail.js'

function randomAuth(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const resendCode = (socket, data) => {

  try {
    users.findOne({ email: data.email }, null, (err, data) => {
      if (data) {
        const random = randomAuth(6)
        mail(data.email, random)
        users.updateOne({ "email": data.email }, { "auth": random })
          .then(() => {
            return socket.emit('confirmError', {
              message: 'Resent Successfully'
            });
          })
      }
    });

  } catch (error) {
    console.log("Error creating user", error);
  }

}

export default resendCode