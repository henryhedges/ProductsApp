import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TrainingModuleSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    module_id: String,
    user_id: String,
    name: String,
})

// Export the model
module.exports = mongoose.model('TrainingModule', TrainingModuleSchema)