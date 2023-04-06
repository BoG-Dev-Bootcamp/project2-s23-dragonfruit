import checkMethod from "../server/utils/middleware/checkMethod"
import { NextResponse } from "next/server"

export default function middleware(req){
    const allowedMethods = ['POST', 'GET', 'DELETE'];
    return checkMethod(allowedMethods, req)
}