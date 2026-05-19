import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      serial,
      fromEmail,
      toName,
      toEmail,
      toCompany,
    } = body

    if (!serial || !fromEmail || !toName || !toEmail) {
      return NextResponse.json(
        { success: false, error: "Missing fields." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("transfer_requests")
      .insert({
        serial,
        from_email: fromEmail,
        to_name: toName,
        to_email: toEmail,
        to_company: toCompany || null,
      })
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Unable to create transfer." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      transferUrl: `/t/${data.token}`,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    )
  }
}