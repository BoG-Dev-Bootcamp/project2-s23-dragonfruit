import mongoose from "mongoose"
import trainingLogSchema from "../../../../../server/mongodb/models/trainingLog.js"

export default async function handler(request, response) {
    if (request.method == "POST") {
        try {

            // request.body.id
            // request.body.date
            // request.body.description
            // request.body.
            trainingLogSchema
            
            response.status(200)

            return response.send({ winner: winnerPokemon })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}