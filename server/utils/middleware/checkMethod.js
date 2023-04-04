import { NextResponse } from "next/server"

export function checkMethod(allowedMethods, method) {
    if (!allowedMethods.includes(method.toUpperCase())) {
        return new NextResponse(
            JSON.stringify({ success: false, error: "Invalid request method: " + method}),
            { status: 400 }
        )
    }
    return NextResponse.next()
}