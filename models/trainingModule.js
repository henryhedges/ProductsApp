import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TrainingModuleSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    // module_id: { type: String, unique: true, required: true},
    name: { type: String, required: true, max: 100 },
    user_id: { type: String, required: true },
    // price: {type: Number, required: true},
})

// Export the model
module.exports = mongoose.model('TrainingModule', TrainingModuleSchema)