import { NextResponse } from "next/server"

export function checkMethod(allowedMethods, method) {
    let allowed = false;
    for (let i = 0; i < allowedMethods.length; i++) {
        if (allowedMethods[i] == method.toUpperCase()) {
            allowed = true;
        }
    }
    if (!allowed) {
        return new NextResponse(
            JSON.stringify({ success: false, error: "Invalid request method: " + method}),
            { status: 400 }
        )
    }
    return NextResponse.next()
}