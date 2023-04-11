import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import bcrypt from "bcryptjs"

import axios from "axios"


export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            console.log("In login")
            await connectDB()
            const password = req.body.password

            const userEmail = {email: req.body.email}
            const user = await User.findOne(userEmail)


            if(user == null) {
                console.log("Not logged in")
                res.status(400)
                return res.send({message: "Not logged in"})

            
            } else {
                const result = await bcrypt.compare(password, user.password)
                if (!result) {
                    console.log("Incorrect password")
                    return res.status(403).send({message: "Incorrect Password!"})
                } 


                return res.status(200).send({message: "Logged in!"})
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
