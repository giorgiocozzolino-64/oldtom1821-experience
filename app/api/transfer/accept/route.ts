import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token." },
        { status: 400 }
      )
    }

    const { data: transfer } = await supabase
      .from("transfer_requests")
      .select("*")
      .eq("token", token)
      .eq("status", "pending")
      .maybeSingle()

    if (!transfer) {
      return NextResponse.json(
        { success: false, error: "Invalid transfer request." },
        { status: 404 }
      )
    }

    const { data: currentClaim } = await supabase
      .from("elyas_bottle_claims")
      .select("*")
      .eq("serial", transfer.serial)
      .maybeSingle()

    if (!currentClaim) {
      return NextResponse.json(
        { success: false, error: "Bottle not found." },
        { status: 404 }
      )
    }

    await supabase
      .from("elyas_bottle_claims")
      .update({
        name: transfer.to_name,
        email: transfer.to_email,
        company: transfer.to_company,
      })
      .eq("serial", transfer.serial)

    await supabase.from("ownership_history").insert({
      serial: transfer.serial,
      from_owner: currentClaim.name,
      to_owner: transfer.to_name,
      to_email: transfer.to_email,
      to_company: transfer.to_company,
      transfer_type: "ownership_transfer",
    })

    await supabase.from("custody_transfers").insert({
      serial: transfer.serial,
      from_party: currentClaim.name,
      from_role: "collector",
      to_party: transfer.to_name,
      to_role: "collector",
      to_email: transfer.to_email,
      transfer_type: "private_transfer",
      notes: "Private ownership transfer completed.",
    })

    await supabase
      .from("transfer_requests")
      .update({
        status: "completed",
      })
      .eq("token", token)

    return NextResponse.json({
      success: true,
      serial: transfer.serial,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    )
  }
}