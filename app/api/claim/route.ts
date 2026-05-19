import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("CLAIM RECEIVED:", body)

    return NextResponse.json({
      success: true,
      message: "Claim received",
      data: body,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "API error",
      },
      {
        status: 500,
      }
    )
  }
}