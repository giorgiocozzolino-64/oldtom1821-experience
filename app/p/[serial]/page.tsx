import { notFound } from "next/navigation"
import { getBottle, bottles } from "../../lib/bottles"

export function generateStaticParams() {
  return bottles.map((bottle) => ({
    serial: bottle.serial,
  }))
}

export default async function BottlePage({
  params,
}: {
  params: Promise<{ serial: string }>
}) {
  const { serial } = await params
  const bottle = getBottle(serial)

  if (!bottle) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-[#D4A437] flex items-center justify-center px-5 py-10">
      <section className="fade-in luxury-panel luxury-border w-full max-w-4xl p-6 md:p-12 text-center">

        <p className="tracking-[0.45em] text-xs md:text-sm text-[#D4A437]/70 mb-4">
          FIFE CHAMBER AWARD 2026
        </p>

        <h1 className="gold-glow text-3xl md:text-6xl font-serif leading-tight mb-3">
          INNOVATION & DIGITALISATION
        </h1>

        <div className="w-32 h-[1px] bg-[#D4A437]/70 mx-auto my-8" />

        <p className="tracking-[0.35em] text-xs md:text-sm text-[#D4A437]/70 mb-4">
          YOU HAVE UNLOCKED
        </p>

        <h2 className="gold-glow text-3xl md:text-5xl font-serif mb-8">
          {bottle.product}
        </h2>

        <p className="text-3xl md:text-5xl font-bold tracking-wide mb-2">
          BOTTLE {bottle.bottleNumber}
        </p>

        <p className="tracking-[0.28em] text-xs md:text-sm text-[#D4A437]/60 mb-10">
          {bottle.serial}
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-left my-10">
          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-sm text-[#D4A437]/50 mb-2">CASK ENTRY</p>
            <p className="text-xl">{bottle.agingStart}</p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-sm text-[#D4A437]/50 mb-2">MATURATION</p>
            <p className="text-xl">{bottle.agingEnd}</p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-sm text-[#D4A437]/50 mb-2">RELEASE</p>
            <p className="text-xl">{bottle.releaseDate}</p>
          </div>
        </div>

        <section className="border border-[#D4A437]/30 p-6 md:p-8 text-left">
          <h3 className="gold-glow text-3xl font-serif mb-6">
            Provenance Journey
          </h3>

          <div className="space-y-6 text-[#D4A437]/80 leading-relaxed">
            <p>
              This limited edition bottle belongs to a fully serialized
              collector release created for the Fife Chamber Awards reception.
            </p>

            <p>
              The liquid inside is an ex-bourbon cask aged Negroni connected to
              the Old Tom Gin 1821 family in St Andrews.
            </p>

            <p>
              Each QR code unlocks a unique digital passport, authenticating the
              bottle number, release context, and provenance story through the
              E.L.Y.A.S.-A.I. verification layer.
            </p>
          </div>
        </section>

        <section className="mt-10 border border-[#D4A437]/30 p-6 text-center">
          <p className="gold-glow text-3xl md:text-4xl font-serif mb-4">
            E.L.Y.A.S.-A.I. ® VERIFIED
          </p>

          <p className="max-w-2xl mx-auto text-[#D4A437]/70 leading-relaxed">
            A live demonstration of digital authentication, serialized
            provenance and anti-counterfeit storytelling for luxury spirits.
          </p>

          <div className="w-40 h-[1px] bg-[#D4A437]/60 mx-auto my-8" />

          <p className="tracking-[0.35em] text-xs text-[#D4A437]/50">
            OLD TOM GIN 1821 — ST ANDREWS
          </p>
        </section>

      </section>
    </main>
  )
}