import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    user_id: String,
    name: String,
})

// Export the model
module.exports = mongoose.model('User', UserSchema)