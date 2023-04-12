import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"
import { serialize } from "cookie";




export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            await connectDB()
            const password = req.body.password

            const userEmail = {email: req.body.email}
            const user = await User.findOne(userEmail)
            const info = {_id: user._id, firstName: user.firstName, lastName: user.lastName}




            if(user == null) {
                res.status(400)
                return res.send({message: "Not logged in"})

            
            } else {
                const result = await bcrypt.compare(password, user.password)
                if (!result) {
                    res.status(403).send({message: "Incorrect Password!"})
                } 


                const token = sign({ admin: true, ...info}, process.env.SECRET, { expiresIn: '1800s' })

                const serialized = serialize("OurJWT", token, {
                    httpOnly: true,
                    secure: false, // change this in production
                    sameSite: "strict",
                    maxAge: 60,
                });
                res.setHeader('Set-Cookie', serialized)
                return res.status(200).send(token)


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
