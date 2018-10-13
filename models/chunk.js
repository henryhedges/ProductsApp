import mongoose from 'mongoose'

const Schema = mongoose.Schema
const { Mixed } = Schema.Types
const ChunkSchema = new Schema({
    chunk_id: String,
    module_id: String,
    type: String,
    context: {
        url: String,
        previousChunk: Mixed,
        nextChunk: Mixed,
    },
    action: {
        type: { type: String } 
    },
    target: {
        DOMObject: Object,
        element: String,
    },  
    description: String,
})

// Export the model
module.exports = mongoose.model('Chunk', ChunkSchema)


// CHUNK SAMPLE 
// {
// 	Id, //String
// 	Type, //String - either “head”, “body”, or “tail”
// 	Context: { //Object
// 		Url, //string
// 		previousChunk, // String or Null
// 		nextChunk // String or Null
// 	},
// 	Action: {
// 		Type, // String - “click”, “hover” - describes DOM event or training interaction, this can also include a “wait-for” action the trainer will interpret to wait for a target to appear
// },
// Target: {
// 	DOMObject, // Object - this is a copy of the DOM object
// 	Element, // String - this is a text copy of the DOM element
// },
// Description, //String - description of the action that will describe what the trainee should do next
// }
