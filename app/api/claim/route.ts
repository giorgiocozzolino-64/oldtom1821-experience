import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { serial, name, email, company, marketingConsent } = body

    if (!serial || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      )
    }

    const { data: existingClaim } = await supabase
      .from("elyas_bottle_claims")
      .select("serial")
      .eq("serial", serial)
      .maybeSingle()

    if (existingClaim) {
      return NextResponse.json(
        { success: false, error: "This bottle has already been claimed." },
        { status: 409 }
      )
    }

    const { error } = await supabase.from("elyas_bottle_claims").insert({
      serial,
      name,
      email,
      company: company || null,
      marketing_consent: marketingConsent === true,
    })

    if (error) {
      return NextResponse.json(
        { success: false, error: "Unable to claim this bottle." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      certificateUrl: `/api/certificate/${serial}`,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    )
  }
}