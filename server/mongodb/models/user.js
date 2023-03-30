import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    _id: {
        type: Object,
        required: true
    },
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
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    profilePicture: {
        type: String
    }
})

export default mongoose.model("User", userSchema)