import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import bcrypt from "bcryptjs"
import axios from "axios"




export default async function handler(req, res) {
    if (true) {
        try {

            await connectDB()
            const password = "Test"
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const userEmail = {email: "jq@gmail.com"}
            const old = await User.findOne(userEmail)

            const info = {firstName: "Johannes", lastName: "Qian"}
            const final = {
                ...info,
                ...userEmail,
                password: hash
            }

            if(old == null) {
                const user = new User(final)
                await user.save()
                await closeDB()
                res.status(200)
                return res.send({message: "User Created Successfully!"})
            } else {
                await closeDB()
                res.status(400)
                return res.send({message: "User Not Created Successfully"})
            }
            

        } catch (error) {
            res.status(500)
            console.log(error)
            return res.send(error)
        }
    }
}
