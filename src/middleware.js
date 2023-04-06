import { NextResponse } from "next/server"
import { checkMethod } from "../server/utils/middleware/checkMethod.js"

export default function middleware(req){
     const allowedMethods = ['POST', 'GET', 'DELETE'];
     return checkMethod(allowedMethods, req.method);
}