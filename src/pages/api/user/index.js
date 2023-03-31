import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import axios from "axios"




export default async function handler(req, res) {
    console.log("Test1")
    if (true) {
        try {
            await connectDB()
            console.log("Test")
            const user = new User({firstName: "Johannes", lastName: "Qian", email: "jq", password: "Test"})

            console.log("T")
            await user.save()
            console.log("S")

            await closeDB()
            res.status(200)

            return res.send({ winner: "test" })

        } catch (error) {
            
            res.status(400)
            console.log(error)
            return res.send(error)
        }
    }
}
