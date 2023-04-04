import { shop, users } from "../models/index.js";

import mail from "../mailer/mail.js";

const addShop = (socket, data) => {
  var shopi = new shop(data);

  shop.findOne({ "email": data.email }, null, (err, data) => {
    if (data) {
      return socket.emit('ShopError', err || {
        message: "Email Already Exists"
      });
    } else {
      shopi.save().then(function (data) {
        if (!err) {
          users.updateOne({ "email": data.email }, { "role": "shop" }, (err, data) => {
            if (!err) {
              mail(data.email, null, "Shop Confirmed", "Your Shop Account has Been Created")
              socket.emit('ShopAccept', {
                message: 'Added Successfully'
              });
            }
          })
        }
      });
    }
  });

};

export default addShop