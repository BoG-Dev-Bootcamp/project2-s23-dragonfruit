import mongoose, { get } from "mongoose"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import trainingLog from "../../../../server/mongodb/models/trainingLog.js"
import auth from "../user/auth.js"



const pagination = async (size, last_id) => {
    let cursor
    if (last_id == null) {
        cursor = await trainingLog.find().limit(size)
    } else {
        cursor = await trainingLog.find({'_id': {'$gt': last_id}}).limit(size)
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
    const authenticate = auth(req, res) 
    if (authenticate.admin) {
        try {
            await connectDB()
            const pages = req.query.p || 0
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
    } else {
        res.status(403);
        res.send("Login Again!")
    }
}