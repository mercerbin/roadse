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

const forgotPass = (socket, data) => {
  var user = new users(data);

  try {
    users.findOne({ email: data.email }, null, (err, data) => {
      if (data) {
        const random = randomAuth(20)
        mail(data.email, random)
        users.updateOne({ "email": data.email }, { "auth": random })
          .then(() => {
            return socket.emit('forgotSuccess', { 'email': data.email });
          })
      } else {
        return socket.emit('forgotError', err || {
          message: "Email Not Found"
        });
      }
    });

  } catch (error) {
    console.log("Error creating user", error);
  }

}

export default forgotPass