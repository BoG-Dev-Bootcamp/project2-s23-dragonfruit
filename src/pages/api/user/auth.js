import { verify } from "jsonwebtoken"

export default function auth(req) {
    if (!req) {
       return res.status(400).send(false)
    }
    const jwt = req.cookies.OurJWT
    console.log(jwt)
    if (!jwt) {
        return res.status(400).send(false)
    }
    try {
        const decoded = verify(jwt, process.env.SECRET)
        return res.status(200).send(decoded)
    } catch (e) {
        return fres.status(500).send(false)
    }
    
}