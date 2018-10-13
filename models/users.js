import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {type: String, required: true, max: 100}
})

// Export the model
module.exports = mongoose.model('User', UserSchema)