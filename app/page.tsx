import Image from "next/image"
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
    <main className="min-h-screen bg-black text-[#D4A437] px-6 py-12">
      <section className="max-w-5xl mx-auto border border-[#D4A437]/40 p-8 md:p-14 bg-black">

        {/* HEADER */}
        <div className="text-center space-y-8">

          <div className="space-y-2">
            <p className="tracking-[0.45em] text-sm text-[#D4A437]/70">
              FIFE CHAMBER AWARD 2026
            </p>

            <h1 className="text-5xl md:text-7xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_18px_rgba(212,164,55,0.25)]">
              INNOVATION & DIGITALISATION
            </h1>
          </div>

          <div className="w-40 h-px bg-[#D4A437]/40 mx-auto" />

          <div className="space-y-4">
            <p className="tracking-[0.35em] text-sm text-[#D4A437]/70">
              YOU HAVE UNLOCKED
            </p>

            <h2 className="text-4xl md:text-6xl font-serif">
              Ex-Bourbon Cask Aged Negroni
            </h2>

            <div className="space-y-2">
              <h3 className="text-5xl md:text-6xl font-serif font-bold">
                BOTTLE {bottle.bottleNumber}
              </h3>

              <p className="tracking-[0.25em] text-[#D4A437]/80">
                {bottle.serial}
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <section className="grid md:grid-cols-3 gap-4 mt-14">

          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 uppercase mb-3">
              Cask Entry
            </p>

            <p className="text-3xl font-serif">
              {bottle.agingStart}
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 uppercase mb-3">
              Maturation
            </p>

            <p className="text-3xl font-serif">
              {bottle.agingEnd}
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 uppercase mb-3">
              Release
            </p>

            <p className="text-3xl font-serif">
              {bottle.releaseDate}
            </p>
          </div>

        </section>

        {/* PROVENANCE */}
        <section className="border border-[#D4A437]/30 p-8 md:p-10 bg-black/40 backdrop-blur-sm mt-10">

          <h2 className="text-4xl md:text-5xl text-[#D4A437] mb-8 tracking-tight font-serif">
            Provenance Journey
          </h2>

          <div className="space-y-8 text-[#D4A437]/80 leading-loose text-lg max-w-4xl">

            <p>
              This limited edition bottle belongs to a fully serialized
              collector release created for the Fife Chamber Awards reception.
            </p>

            <div className="w-24 h-px bg-[#D4A437]/40" />
            <Image
  src="/negroni-dark.jpeg"
  alt="Luxury Negroni"
  fill
  className="object-cover opacity-80"
/>

            <div className="space-y-6">

              <p>
                Born in Florence in 1919, the Negroni stands among Italy’s
                most iconic cocktails.
              </p>

              <p>
                According to the most widely accepted story, Count Camillo
                Negroni entered the legendary Caffè Casoni on Via de’
                Tornabuoni and asked bartender Fosco Scarselli to strengthen
                his favorite Americano by replacing soda water with gin.
              </p>

              <p>
                To distinguish the new creation, the bartender finished the
                drink with an orange peel instead of the traditional lemon
                garnish.
              </p>

              <p>
                The result was extraordinary — bold yet refined, bitter yet
                perfectly balanced.
              </p>

              <p>
                Patrons soon began requesting “the Count’s drink,” and the
                Negroni quickly became a symbol of Italian sophistication and
                aperitivo culture.
              </p>

              <p>
                More than a century later, the Negroni remains timeless: a
                ritual of elegance, craftsmanship, and character, celebrated
                worldwide for the harmonious union of gin, vermouth, and
                bitter.
              </p>

            </div>

            <div className="pt-6 border-t border-[#D4A437]/20">
              <p className="tracking-[0.35em] text-sm text-[#D4A437]/60">
                E.L.Y.A.S.-A.I. VERIFIED DIGITAL PROVENANCE EXPERIENCE
              </p>
            </div>

          </div>

        </section>

        {/* FOOTER */}
        <section className="text-center mt-14 space-y-6">

          <div className="w-40 h-px bg-[#D4A437]/40 mx-auto" />

          <p className="max-w-2xl mx-auto text-[#D4A437]/70 leading-relaxed">
            A live demonstration of digital authentication, serialized
            provenance and anti-counterfeit storytelling for luxury spirits.
          </p>

          <p className="tracking-[0.35em] text-xs text-[#D4A437]/50">
            OLD TOM GIN 1821 — ST ANDREWS
          </p>

        </section>

      </section>
    </main>
  )
}