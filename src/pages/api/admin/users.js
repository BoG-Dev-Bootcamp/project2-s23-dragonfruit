import mongoose, { get } from "mongoose"
import User from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"



const pagination = async (size, last_id) => {
    let cursor
    if (last_id == null) {
        cursor = await User.find().limit(size)
    } else {
        cursor = await User.find({'_id': {'$gt': last_id}}).limit(size)
    }
    

    if (cursor.length < size) {
        return {page: cursor, lastID: null}
    }
    const page = []
    cursor.forEach(element => {
        page.push(element)
    })

    return {page: page, lastID: page[page.length - 1]._id}
    

}


export default async function handler(req, res) {
    if (true) {
        try {
            await connectDB()
            const pages = req.query.p || 1
            const max = 3



            let all = []

            let objID = null
            for (let i = 0; i <= pages; i++) {
                let {page, lastID} = await pagination(max, objID)
                objID = lastID
                all.push(page)
            }
            
            
            
            //await closeDB()
            res.status(200)
            return res.send(all)

        } catch (error) {
            res.status(500)
            console.log(error)
            return res.send(error)
        }
    }
}