import Training from '../models/trainingModule'
import Chunk from '../models/chunk'

export const create_module = (req, res, next) => {
    console.log(req.body)
    const training = new Training({
        chunks: [],
        description: req.body.description,
        m_id: req.body.m_id
    })

    console.log('training?', training)

    training.save(function(err, newTraining) {
        if (err) return next(err)
        console.log('new Training => ', newTraining)
        res.send('Training Created successfully')
    })
}

export const get_module = (req, res, next) => {
    Training.findOne({ m_id: req.params.id }).exec(function (err, training) {
        if (err) return next(err)
        console.log('PRODUCT => ', training)

        Chunk.find().exec(function(err, chunks) {
            training.chunks = chunks

            res.send(JSON.stringify(training))
        })
    })
}

export const get_all_modules = (req, res, next) => {
    Training.find({}, function(err, trainingModules) {
        if (err) next(err)
        console.log(trainingModules)

        res.send(JSON.stringify(trainingModules))
    })
}

export const create_chunk = (req, res, next) => {
    const chunk = new Chunk({ c_id : req.body.chunk.id })

    console.log('req.body.chunk', req.body.chunk)
    console.log('req.params.id ', req.params.id )
    console.log('chunk => ', chunk)

    chunk.save(function(err, savedChunk) {
        if (err) return next(err)
        console.log('saved chunk', savedChunk)
        Training.findOne({
            m_id: req.params.id
        }, console.log)
        Training
        .findOneAndUpdate({
            m_id: req.params.id
        }, {
            $push: { chunks: req.body.chunk.id }
        }, function(newChunk) {
            res.send(`Chunk saved ${JSON.stringify(newChunk)}`)
        })
    })
}

