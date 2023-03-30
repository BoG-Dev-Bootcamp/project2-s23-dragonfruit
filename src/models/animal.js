import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
    _id: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    owner: {
        type: Object,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String
    }


})

export default mongoose.model("Animal", animalSchema)