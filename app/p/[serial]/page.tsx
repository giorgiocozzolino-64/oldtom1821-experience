import Image from "next/image"
import { notFound } from "next/navigation"

import { getBottle, bottles } from "@/app/lib/bottles"
import ClaimForm from "@/components/ClaimForm"

export async function generateStaticParams() {
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

  if (!bottle) notFound()

  return (
    <main className="min-h-screen bg-black text-[#D4A437]">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#D4A437]/20">
        <Image
          src="/negroni-dark.jpeg"
          alt="Old Tom Gin"
          fill
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="tracking-[0.45em] text-xs md:text-sm text-[#D4A437]/70 mb-6 uppercase">
            Old Tom Gin 1821 — Digital Passport
          </p>

          <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tight text-[#D4A437]">
            {bottle.product}
          </h1>

          <div className="w-32 h-px bg-[#D4A437]/40 mx-auto my-10" />

          <h2 className="text-3xl md:text-5xl font-serif">
            {bottle.edition}
          </h2>

          <h3 className="mt-10 text-5xl md:text-7xl font-bold tracking-tight text-[#D4A437]">
            BOTTLE {bottle.bottleNumber.toString().padStart(2, "0")} OF 60
          </h3>

          <p className="mt-6 tracking-[0.3em] text-[#D4A437]/70 uppercase">
            Serial {bottle.serial}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <section className="grid md:grid-cols-2 gap-16 border border-[#D4A437]/20 p-10 bg-[#050505]">
          <div>
            <p className="tracking-[0.4em] text-xs text-[#D4A437]/70 uppercase mb-6">
              Authentication
            </p>

            <h2 className="text-5xl font-serif mb-10">
              Digital Certificate
            </h2>

            <div className="space-y-6 text-[#D4A437]/80">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4A437]/50 mb-2">
                  Brand
                </p>

                <p className="text-2xl font-serif">{bottle.brand}</p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4A437]/50 mb-2">
                  Distillation
                </p>

                <p className="text-2xl font-serif">
                  {bottle.distillationYear}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4A437]/50 mb-2">
                  Cask
                </p>

                <p className="text-2xl font-serif">{bottle.cask}</p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4A437]/50 mb-2">
                  ABV
                </p>

                <p className="text-2xl font-serif">{bottle.abv}</p>
              </div>
            </div>
          </div>

          <div className="border border-[#D4A437]/20 p-10 flex flex-col justify-center">
            <p className="tracking-[0.4em] text-xs text-[#D4A437]/70 uppercase mb-8">
              Provenance Story
            </p>

            <div className="space-y-8 text-lg leading-relaxed text-[#D4A437]/85">
              <p>
                In 1919, Count Camillo Negroni requested a stronger version of
                his Americano cocktail at Caffè Casoni in Florence.
              </p>

              <p>
                Bartender Fosco Scarselli replaced soda water with gin and
                garnished it with orange peel instead of lemon.
              </p>

              <p>
                The result was a perfectly balanced cocktail: bold, bitter,
                elegant and timeless.
              </p>

              <p>
                More than a century later, the Negroni remains a global symbol
                of Italian aperitivo culture, celebrated for its unmistakable
                harmony of gin, vermouth and bitter.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 border border-[#D4A437]/20 p-14 text-center bg-[#050505]">
          <p className="tracking-[0.45em] text-xs uppercase text-[#D4A437]/70 mb-10">
            Digital Authentication
          </p>

          <div className="flex justify-center">
            <Image
              src={`/qr/${bottle.serial}.png`}
              alt={`QR ${bottle.serial}`}
              width={220}
              height={220}
              className="border border-[#D4A437]/20 p-2 bg-black"
            />
          </div>

          <p className="mt-6 text-[#D4A437]/60 tracking-[0.2em] text-sm">
            SCAN TO VERIFY SERIALIZED PASSPORT
          </p>
        </section>

        <ClaimForm serial={bottle.serial} />
      </div>
    </main>
  )
}