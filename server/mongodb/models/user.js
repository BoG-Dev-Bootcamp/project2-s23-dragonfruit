import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    animalArray: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    profilePicture: {
        type: String
    }
})

module.exports = (mongoose.models.User ||  mongoose.model('User', userSchema))