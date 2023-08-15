import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()

    if (!body.url) return NextResponse.json({
        // validation error
        error_code: 1000,
        document: null
    })
    const response = await axios.get(
        body.url
    )

    return NextResponse.json({
        error_code: 0,
        document: response.data
    })
}