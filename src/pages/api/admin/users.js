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
    
    const page = []
    cursor.forEach(element => {
        //console.log(element);
        const newObj = {_id: element._id, firstName: element.firstName, lastName: element.lastName, email: element.email, animalArray: element.animalArray, __v: element.__v}
        page.push(newObj)
    })

    if (cursor.length < size) {
        return {page: page, lastID: null}
    }
    

    return {page: page, lastID: page[page.length - 1]._id}
    

}


export default async function handler(req, res) {
    if (true) {
        try {
            await connectDB()
            const pages = req.query.p || 0
            const max = 10

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