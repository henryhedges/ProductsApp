import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TrainingModuleSchema = new Object({
    chunks: [],
    description: String,
    m_id: String
});

// Export the model
module.exports = mongoose.model('TrainingModule', TrainingModuleSchema)