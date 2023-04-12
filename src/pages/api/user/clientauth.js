import { verify } from "jsonwebtoken"

export default function clientauth(token) {
    if (!req) {
       return false 
    }
    const jwt = token
    console.log(jwt)
    if (!jwt) {
        return false
    }
    try {
        const decoded = verify(jwt, process.env.SECRET)
        console.log(decoded)
        return decoded
    } catch (e) {
        return false
    }
    
}