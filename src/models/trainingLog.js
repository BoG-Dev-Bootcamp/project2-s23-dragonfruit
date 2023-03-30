import mongoose from "mongoose"

const trainingLogSchema = new mongoose.Schema({
    _id: {
        type: Object,
        required: true
    },
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
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    trainingLogVideo: {
        type: String
    }

})

export default mongoose.model("Training Log", trainingLogSchema)