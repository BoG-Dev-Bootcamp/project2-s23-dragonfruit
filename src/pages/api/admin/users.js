import mongoose from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"




export default async function handler(req, res) {
    if (true) {
        try {
            await connectDB()
            const readUsers = async () => {
                const users = []
                const x = (await User.find()).forEach(function(u) {
                    const removeMe = password;

                    const { [removeMe]: removedKey, ...newObj } = u;
                    users.push(u)
                })
                return users
            }
            
            const users = await readUsers()
            console.log(users)

            await closeDB()
            res.status(200)
            return res.send(users)

        } catch (error) {
            res.status(500)
            console.log(error)
            return res.send(error)
        }
    }
}