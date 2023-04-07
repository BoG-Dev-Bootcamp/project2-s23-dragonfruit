import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    owner: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User',
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

// export default mongoose.model("Animal", animalSchema)
module.exports = (mongoose.models.Animal ||  mongoose.model('Animal', animalSchema))