import { shop } from "../models/index.js";

const getEmail = (socket) => {

  shop.find({}, { _id: 0, email: 1, shopName: 1, lati: 1, longi: 1 },
    function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        return socket.emit("takeShops", docs);
      }
    })

};

export default getEmail