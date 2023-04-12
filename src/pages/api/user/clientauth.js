import { verify } from "jsonwebtoken"


export default function clientauth(token) {
    if (!token) {
       return false 
    }
    const jwt = token
    console.log(process.env)
    try {
        const decoded = verify(jwt, process.env.SECRET)
        console.log(decoded)
        return decoded
    } catch (e) {
        return e
    }
    
}