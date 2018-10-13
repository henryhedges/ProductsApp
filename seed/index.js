require('dotenv').config();

import BluebirdPromise from 'bluebird'
import mongoose from 'mongoose'
import User from '../models/user'
import TrainingModule from '../models/trainingModule'
import Chunk from '../models/chunk'

import {
  userData,
  trainingModuleData,
  chunkData
} from './data'

mongoose.Promise = BluebirdPromise
mongoose.connect(process.env.DEV_MONGODB_URI, { useNewUrlParser: true })

User.collection.drop()
TrainingModule.collection.drop()
Chunk.collection.drop()

User.create(userData)
.then(user => {
  console.log(`${user.length} users created`)

  TrainingModule.create(trainingModuleData)
  .then(trainingmodule => {
    console.log(`${trainingmodule.length} modules created`)

    Chunk.create(chunkData)
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