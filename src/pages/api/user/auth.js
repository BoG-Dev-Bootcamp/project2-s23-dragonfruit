import { verify } from "jsonwebtoken"

export default function auth(req) {
    if (!req) {
       return false 
    }
    const jwt = req.cookies.OurJWT
    console.log(jwt)
    if (!jwt) {
        return false
    }
    try {
        const decoded = verify(jwt, process.env.SECRET)
        return true
    } catch (e) {
        return false
    }
    
}