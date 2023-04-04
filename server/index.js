import { server, io } from './server.js'
import socketHandler from './socketHandler.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

async function mongo() {
  const port = process.env.PORT
  const uri = process.env.MONGODB_URI
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(uri, { useNewUrlParser: true })
      .then(async client => {
        server.listen(port, () => {
          socketHandler()
          console.log(`listening on port ${port}`)
          const changeStream = client.connection.collection("reals").watch({ fullDocument: 'updateLookup' });
          changeStream.on("change", (change) => {
            switch (change.operationType) {
              case "update":
                const srain = {
                  _id: change.fullDocument._id,
                  name: change.fullDocument.name,
                  email: change.fullDocument.email,
                  color: change.fullDocument.color,
                  lat: change.fullDocument.lat,
                  long: change.fullDocument.long,
                };

                io.emit("updates", srain);
                // io.emit("busdates",nrain);
                break;

              case "delete":
                io.emit("deletes", change.documentKey);
                break;
            }


          });
        })
      })
  }
  catch (e) { console.error(e) }
}
mongo().catch(console.error)