import { work } from "../models/index.js";

import mail from "../mailer/mail.js";

const addWork = (socket, data) => {
  var doc = new work(data);
  doc.save().then(function (data) {
    if (data) {
      mail(data.shopEmail, null, "A New Request Arrived Just Now from", data.email)
      socket.emit('workAdded', {
        message: 'Added Successfully'
      })
    }
  });

};

export default addWork