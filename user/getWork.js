import { work } from "../models/index.js";

const getWork = (socket) => {

  work.find({}, { _id: 0, email: 1, shopEmail: 1, work: 1, status: 1 },
    function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        return socket.emit("allWorks", docs);
      }
    })

};

export default getWork