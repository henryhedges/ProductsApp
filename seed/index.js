require('dotenv').config();

import BluebirdPromise from 'bluebird'
import mongoose from 'mongoose'
import User from '../models/user'
import TrainingModule from '../models/trainingModule'
import Chunk from '../models/chunk'

mongoose.Promise = BluebirdPromise
mongoose.connect(process.env.DEV_MONGODB_URI, { useNewUrlParser: true })

User.collection.drop()
TrainingModule.collection.drop()
Chunk.collection.drop()

User.create([{
    user_id: '1',
    name: "user1",
  }, {
    user_id: '2',
    name: "user2",
  }
])
.then(user => {
  console.log(`${user.length} users created`)

  TrainingModule.create({
    module_id: '1m',
    user_id: '1',
    name: 'FirstModule',
  },{
    module_id: '2m',
    user_id: '2',
    name: "SecondModule",
  })
  .then(trainingmodule => {
    console.log(`${trainingmodule.length} modules created`)

    Chunk.create([{
      chunk_id: '1c',
      module_id: '1m',
      type: 'head',
      context: {
          url: 'http://localhost:5000'
      }
    }])
    .then(chunks => {
      console.log(`${chunks.length} modules created`)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      mongoose.connection.close()
    })
  })
})
.catch((err) => {
  console.log(err)
})
// .finally(() => {
//   mongoose.connection.close()
// })