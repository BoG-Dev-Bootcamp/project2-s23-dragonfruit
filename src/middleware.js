import checkMethod from "../server/utils/middleware/checkMethod"

export default function middleware(req){
    const allowedMethods = ['POST', 'GET', 'DELETE'];
    return checkAllowed(allowedMethods, req)
}