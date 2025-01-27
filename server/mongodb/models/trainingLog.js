import mongoose from "mongoose"

const trainingLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainingLogVideo: {
        type: String
    }
})

// export default mongoose.model("Training Log", trainingLogSchema)
module.exports = (mongoose.models.traininglogs ||  mongoose.model('traininglogs', trainingLogSchema))