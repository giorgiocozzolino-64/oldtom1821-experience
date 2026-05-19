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

    const { error: claimError } = await supabase
      .from("elyas_bottle_claims")
      .insert({
        serial,
        name,
        email,
        company: company || null,
        marketing_consent: marketingConsent === true,
      })

    if (claimError) {
      return NextResponse.json(
        { success: false, error: "Unable to claim this bottle." },
        { status: 400 }
      )
    }

    await supabase.from("ownership_history").insert({
      serial,
      from_owner: null,
      to_owner: name,
      to_email: email,
      to_company: company || null,
      transfer_type: "genesis_claim",
    })

    await supabase.from("custody_transfers").insert([
      {
        serial,
        from_party: "Old Tom Gin 1821",
        from_role: "producer",
        to_party: "Fife Chamber Awards Reception",
        to_role: "event",
        to_email: null,
        transfer_type: "production_release",
        notes: "Limited edition released for the Fife Chamber Awards reception.",
      },
      {
        serial,
        from_party: "Fife Chamber Awards Reception",
        from_role: "event",
        to_party: name,
        to_role: "final_consumer",
        to_email: email,
        transfer_type: "ownership_claim",
        notes: "Bottle claimed by event guest / collector.",
      },
    ])

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