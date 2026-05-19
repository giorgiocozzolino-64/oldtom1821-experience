import Image from "next/image"
import { notFound } from "next/navigation"
import { bottles, getBottle } from "../../lib/bottles"

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

  if (!bottle) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-[#D4A437] px-6 py-10 md:px-10">
      <div className="max-w-5xl mx-auto border border-[#D4A437]/40 p-8 md:p-14 bg-black">

        {/* HEADER */}

        <div className="text-center">
          <p className="tracking-[0.4em] text-sm md:text-base text-[#D4A437]/70 mb-8">
            FIFE CHAMBER AWARD 2026
          </p>

          <h1 className="text-6xl md:text-8xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_18px_rgba(212,164,55,0.35)]">
            INNOVATION & <br />
            DIGITALISATION
          </h1>

          <div className="w-32 h-px bg-[#D4A437]/40 mx-auto my-10" />

          <p className="tracking-[0.45em] text-sm text-[#D4A437]/70">
            YOU HAVE UNLOCKED
          </p>

          <h2 className="mt-6 text-5xl md:text-7xl font-serif leading-tight">
            Ex-Bourbon Cask Aged Negroni
          </h2>

          <h3 className="mt-10 text-5xl md:text-7xl font-bold tracking-tight text-[#D4A437]">
            BOTTLE {bottle.number.toString().padStart(2, "0")} OF 60
          </h3>

          <p className="mt-6 tracking-[0.3em] text-[#D4A437]/70">
            {bottle.serial}
          </p>
        </div>

        {/* DATES */}

        <section className="grid md:grid-cols-3 gap-4 mt-16">
          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/60 mb-3">
              CASK ENTRY
            </p>

            <p className="text-2xl font-serif">
              30 September 2022
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/60 mb-3">
              MATURATION
            </p>

            <p className="text-2xl font-serif">
              30 January 2026
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/60 mb-3">
              RELEASE
            </p>

            <p className="text-2xl font-serif">
              21 May 2026
            </p>
          </div>
        </section>

        {/* PROVENANCE */}

        <section className="border border-[#D4A437]/20 p-8 md:p-10 bg-black mt-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            <div className="relative w-full h-[520px] border border-[#D4A437]/20 overflow-hidden">
              <Image
                src="/negroni-dark.jpeg"
                alt="Luxury Negroni"
                fill
                className="object-cover opacity-90"
              />
            </div>

            <div>
              <h2 className="text-5xl font-serif mb-6 leading-tight">
                Provenance Journey
              </h2>

              <div className="w-20 h-px bg-[#D4A437]/40 mb-8" />

              <div className="space-y-8 text-[#D4A437]/85 leading-loose text-lg">

                <p>
                  This limited edition bottle belongs to a fully serialized
                  collector release created for the Fife Chamber Awards
                  reception.
                </p>

                <p>
                  The liquid inside is an ex-bourbon cask aged Negroni
                  connected to the Old Tom Gin 1821 family in St Andrews.
                </p>

                <p>
                  Each QR code unlocks a unique digital passport,
                  authenticating the bottle number, release context and
                  provenance story through the E.L.Y.A.S.-A.I.
                  verification layer.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* HISTORY */}

        <section className="border border-[#D4A437]/20 p-8 md:p-10 bg-black mt-10">
          <div className="max-w-3xl">
            <p className="tracking-[0.3em] text-sm text-[#D4A437]/60 mb-6">
              HERITAGE STORY
            </p>

            <h2 className="text-5xl font-serif mb-8">
              The Birth of the Negroni
            </h2>

            <div className="space-y-8 text-[#D4A437]/85 leading-loose text-lg">

              <p>
                The Negroni was born in Florence around 1919 when Count
                Camillo Negroni requested a stronger version of the
                Americano cocktail.
              </p>

              <p>
                Bartender Fosco Scarselli replaced soda water with gin,
                creating one of the most iconic cocktails ever produced.
              </p>

              <p>
                The result became a perfect balance of bitterness,
                botanicals and barrel complexity — timeless, elegant and
                unmistakably Italian.
              </p>

              <p>
                More than a century later, the Negroni remains a symbol of
                luxury aperitivo culture celebrated around the world.
              </p>

            </div>
          </div>
        </section>

        {/* QR */}

        <section className="border border-[#D4A437]/20 p-10 text-center bg-black mt-10">

          <p className="tracking-[0.35em] text-sm text-[#D4A437]/70 mb-8">
            DIGITAL AUTHENTICATION
          </p>

          <div className="inline-flex items-center justify-center border border-[#D4A437]/30 p-6">
            <div className="w-[220px] h-[220px] border border-[#D4A437]/20 flex items-center justify-center">
              <p className="tracking-[0.3em] text-[#D4A437]/50 text-sm">
                QR PLACEHOLDER
              </p>
            </div>
          </div>

          <p className="mt-8 text-[#D4A437]/60 tracking-[0.2em] text-sm">
            SCAN TO VERIFY SERIALIZED PASSPORT
          </p>

        </section>

      </div>
    </main>
  )
}