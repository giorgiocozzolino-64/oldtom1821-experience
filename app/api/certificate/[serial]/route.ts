import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { getBottle } from "@/app/lib/bottles"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: Request,
  { params }: { params: Promise<{ serial: string }> }
) {
  const { serial } = await params

  const bottle = getBottle(serial)

  if (!bottle) {
    return NextResponse.json(
      { error: "Bottle not found." },
      { status: 404 }
    )
  }

  const { data: claim, error } = await supabase
    .from("elyas_bottle_claims")
    .select("*")
    .eq("serial", serial)
    .maybeSingle()

  if (error || !claim) {
    return NextResponse.json(
      { error: "Certificate not available. Bottle has not been claimed." },
      { status: 404 }
    )
  }

  const pdfDoc = await PDFDocument.create()

  const page = pdfDoc.addPage([842, 595])

  const serif = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const sans = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const gold = rgb(0.831, 0.643, 0.216)
  const black = rgb(0, 0, 0)

  page.drawRectangle({
    x: 0,
    y: 0,
    width: 842,
    height: 595,
    color: black,
  })

  page.drawRectangle({
    x: 36,
    y: 36,
    width: 770,
    height: 523,
    borderColor: gold,
    borderWidth: 1,
  })

  page.drawText("OLD TOM GIN 1821", {
    x: 340,
    y: 520,
    size: 12,
    font: sans,
    color: gold,
  })

  page.drawText("CERTIFICATE OF OWNERSHIP", {
    x: 205,
    y: 455,
    size: 32,
    font: serifBold,
    color: gold,
  })

  page.drawText(
    "This certifies that the serialized bottle below has been claimed by:",
    {
      x: 205,
      y: 395,
      size: 14,
      font: sans,
      color: gold,
    }
  )

  page.drawText(claim.name, {
    x: 205,
    y: 350,
    size: 30,
    font: serifBold,
    color: gold,
  })

  page.drawText(`Email: ${claim.email}`, {
    x: 205,
    y: 310,
    size: 13,
    font: sans,
    color: gold,
  })

  if (claim.company) {
    page.drawText(`Company / Collection: ${claim.company}`, {
      x: 205,
      y: 285,
      size: 13,
      font: sans,
      color: gold,
    })
  }

  page.drawText(`Product: ${bottle.product}`, {
    x: 205,
    y: 240,
    size: 15,
    font: serif,
    color: gold,
  })

  page.drawText(`Edition: ${bottle.edition}`, {
    x: 205,
    y: 215,
    size: 15,
    font: serif,
    color: gold,
  })

  page.drawText(`Serial: ${bottle.serial}`, {
    x: 205,
    y: 190,
    size: 15,
    font: serif,
    color: gold,
  })

  page.drawText(`Bottle: ${bottle.bottleNumber}`, {
    x: 205,
    y: 165,
    size: 15,
    font: serif,
    color: gold,
  })

  page.drawText(
    `Claimed At: ${new Date(claim.claimed_at).toLocaleString("en-GB")}`,
    {
      x: 205,
      y: 125,
      size: 12,
      font: sans,
      color: gold,
    }
  )

  page.drawText(
    "Digitally issued by E.L.Y.A.S.-A.I. Serialized Passport System",
    {
      x: 230,
      y: 70,
      size: 11,
      font: sans,
      color: gold,
    }
  )

  const pdfBytes = await pdfDoc.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${serial}-ownership-certificate.pdf"`,
    },
  })
}