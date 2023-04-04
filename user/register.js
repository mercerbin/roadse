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

const register = (socket, sdata) => {
  var user = new users(sdata);

  try {
    users.findOne({ email: sdata.email }, null, (err, data) => {
      if (data) {
        return socket.emit('registerError', err || {
          message: "Email Already Exists"
        });
      } else {
        user.save().then(function (data) {
          const random = randomAuth(6)
          mail(sdata.email, random)
          users.updateOne({ "email": sdata.email }, { "auth": random })
            .then(() => {
              return socket.emit('registerSuccess', {
                message: 'Registered Successfully',
                email: sdata.email,
              });
            })
        });
      }
    });

  } catch (error) {
    console.log("Error creating user", error);
  }

}

export default register