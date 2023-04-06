import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import bcrypt from "bcryptjs"
import axios from "axios"




export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            console.log(req.body)
            await connectDB()
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const userEmail = {email: req.body.email}
            const old = await User.findOne(userEmail)

            const info = {firstName: req.body.firstName, lastName: req.body.lastName}
            const final = {
                ...info,
                ...userEmail,
                password: hash
            }

            if(old == null) {
                const user = new User(final)
                await user.save()
                res.status(200)
                return res.send({message: "User Created Successfully!"})
            } else {
                res.status(400)
                return res.send({message: "User Not Created Successfully"})
            }
            

        } catch (error) {
            res.status(500)
            console.log(error)
            return res.send(error)
        }
    } else {
        res.status(400)
        return res.send({message: "Wrong method"})
    }
}
