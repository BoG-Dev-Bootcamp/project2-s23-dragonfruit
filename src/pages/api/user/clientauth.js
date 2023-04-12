import { verify, decode } from "jsonwebtoken"


export default function clientauth(token) {
    if (!token) {
       return false 
    }
    const jwt = token
    
    try {
        const key = "javainuse-secret-key"
        const decoded = decode(jwt)
        //const decoded = verify(jwt, key)
        //console.log("decoded: " + decoded)
        return decoded
    } catch (e) {
        return false
    }
    
}