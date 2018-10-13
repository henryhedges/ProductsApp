require('dotenv').config();

import BluebirdPromise from 'bluebird'
import mongoose from 'mongoose'
import User from '../models/user'
import TrainingModule from '../models/trainingModule'

mongoose.Promise = BluebirdPromise
mongoose.connect(process.env.DEV_MONGODB_URI, { useNewUrlParser: true })

User.collection.drop()
TrainingModule.collection.drop()

User.create([{
    name: "user1",
  }, {
    name: "user2",
  }
])
.then(user => {
  console.log(`${user.length} users created`)

  TrainingModule.create({
    name: 'FirstModule',
    user_id: '1'
  },{
    user_id: '2',
    name: "SecondModule"
  })
  .then(trainingmodule => {
    console.log(`${trainingmodule.length} modules created`)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    mongoose.connection.close()
  })
})
.catch((err) => {
  console.log(err)
})
// .finally(() => {
//   mongoose.connection.close()
// })