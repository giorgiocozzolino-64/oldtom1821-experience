import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

import { getBottle, bottles } from "@/app/lib/bottles"

import ClaimForm from "@/components/ClaimForm"
import TransferOwnershipForm from "@/components/TransferOwnershipForm"

export const dynamic = "force-dynamic"
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

  const bottleNumber = Number(serial.split("-").pop())

  const { data: claims } = await supabase
    .from("elyas_bottle_claims")
    .select("*")
    .eq("serial", serial)
    .limit(1)

  const currentClaim = claims?.[0] || null

  const { data: custodyHistory } = await supabase
    .from("ownership_history")
    .select("*")
    .eq("serial", serial)
    .order("created_at", { ascending: true })

  return (
    <main className="min-h-screen bg-black text-[#d6d0c7]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="border border-[#3a3126] px-10 py-20 text-center">
          <p className="text-[#c6a47a] tracking-[0.45em] uppercase text-sm mb-8">
            Fife Chamber Award 2026
          </p>

          <h1 className="text-6xl md:text-8xl leading-none font-light text-[#d4a63c]">
            Digital Innovation<br />
            & Technology
          </h1>

          <div className="w-28 h-px bg-[#5a4835] mx-auto mb-10" />

          <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-sm mb-6">
            You Have Unlocked
          </p>

          <h2 className="text-5xl md:text-6xl text-[#d4a63c] leading-tight">
            Ex-Bourbon Cask Aged
            <br />
            Negroni
          </h2>

          <div className="mt-12">
            <p className="text-5xl md:text-6xl text-[#d4a63c] font-semibold">
              Bottle {bottleNumber} Of 60
            </p>

            <p className="mt-5 text-[#c6a47a] tracking-[0.35em] uppercase text-sm">
              {bottle.serial}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div className="border border-[#3a3126] p-6">
            <p className="text-[#c6a47a] text-xs tracking-[0.35em] uppercase mb-4">
              Cask Entry
            </p>
            <p className="text-[#e7d7bd] text-3xl">30 September 2022</p>
          </div>

          <div className="border border-[#3a3126] p-6">
            <p className="text-[#c6a47a] text-xs tracking-[0.35em] uppercase mb-4">
              Maturation
            </p>
            <p className="text-[#e7d7bd] text-3xl">30 January 2026</p>
          </div>

          <div className="border border-[#3a3126] p-6">
            <p className="text-[#c6a47a] text-xs tracking-[0.35em] uppercase mb-4">
              Release
            </p>
            <p className="text-[#e7d7bd] text-3xl">21 May 2026</p>
          </div>
        </section>

        <section className="border border-[#3a3126] bg-black/40 px-8 py-10 mt-12">
          <p className="text-[#c6a47a] text-xs tracking-[0.35em] uppercase mb-6 text-center">
            Craft Composition
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border border-[#3a3126] p-6">
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-3">
                Formula
              </p>
              <p className="text-[#e7d7bd] text-xl">Equal Parts</p>
            </div>

            <div className="border border-[#3a3126] p-6">
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-3">
                Alcohol
              </p>
              <p className="text-[#e7d7bd] text-xl">24% ABV</p>
            </div>

            <div className="border border-[#3a3126] p-6">
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-3">
                Volume
              </p>
              <p className="text-[#e7d7bd] text-xl">100 mL</p>
            </div>
          </div>

          <div className="mt-8 text-center text-[#d6d0c7] leading-relaxed">
            <p>Old Tom Gin 1821 · Vermouth · Bitter</p>
            <p className="mt-4 text-[#a8957a] italic">
              Part of the inaugural serialized collector release.
            </p>
          </div>
        </section>

        <section className="border border-[#3a3126] mt-16 p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="border border-[#3a3126] p-8">
              <Image
                src={bottle.image}
                alt={bottle.serial}
                width={700}
                height={900}
                className="w-full h-auto"
              />
            </div>

            <div>
              <h2 className="text-6xl text-[#d4a63c] leading-none mb-8">
                Provenance
                <br />
                Journey
              </h2>

              <div className="w-24 h-px bg-[#5a4835] mb-10" />

              <div className="space-y-8 text-[#d6d0c7] text-xl leading-relaxed">
                <p>
                  This limited edition bottle belongs to a fully serialized
                  collector release created for the Fife Chamber Awards reception.
                </p>

                <p>
                  The liquid inside is an ex-bourbon cask aged Negroni connected
                  to the Old Tom Gin 1821 family in St Andrews.
                </p>

                <p>
                  The cocktail follows the classic Italian equal-parts structure:
                  gin, bitter aperitivo and sweet vermouth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border border-[#3a3126] mt-16 py-16 text-center">
          <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-sm mb-10">
            Digital Authentication
          </p>

          <Image
            src={`/qr/${bottle.serial}.png`}
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto border border-[#3a3126] p-4"
          />

          <p className="mt-10 text-[#c6a47a] tracking-[0.25em] uppercase text-sm">
            Scan To Verify Serialized Passport
          </p>
        </section>

        <section className="border border-[#3a3126] mt-16 p-12">
          <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-sm mb-12 text-center">
            Provenance Timeline
          </p>

          <div className="space-y-12">
            <div>
              <p className="text-[#8e7c63] tracking-[0.3em] uppercase text-xs mb-3">
                30 September 2022
              </p>
              <h3 className="text-[#d4a63c] text-4xl">Cask Filled</h3>
            </div>

            <div>
              <p className="text-[#8e7c63] tracking-[0.3em] uppercase text-xs mb-3">
                30 January 2026
              </p>
              <h3 className="text-[#d4a63c] text-4xl">
                Maturation Completed
              </h3>
            </div>

            <div>
              <p className="text-[#8e7c63] tracking-[0.3em] uppercase text-xs mb-3">
                21 May 2026
              </p>
              <h3 className="text-[#d4a63c] text-4xl">
                Released for Fife Chamber Awards
              </h3>
            </div>

            {custodyHistory?.map((event) => (
              <div key={event.id}>
                <p className="text-[#8e7c63] tracking-[0.3em] uppercase text-xs mb-3">
                  {new Date(event.created_at).toLocaleString()}
                </p>

                <h3 className="text-[#d4a63c] text-3xl">
                  {event.event_type}
                </h3>

                <p className="text-[#d6d0c7] mt-3">{event.owner_name}</p>
              </div>
            ))}
          </div>
        </section>

        {!currentClaim && (
          <div className="mt-16">
            <ClaimForm serial={bottle.serial} />
          </div>
        )}

        {currentClaim && (
          <section className="border border-[#3a3126] mt-16 p-10 text-center">
            <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-sm mb-8">
              Collector Certificate
            </p>

            <a
              href={`/api/certificate/${bottle.serial}`}
              target="_blank"
              className="inline-block border border-[#d4a63c] px-10 py-4 text-[#d4a63c] tracking-[0.3em] uppercase text-sm hover:bg-[#d4a63c] hover:text-black transition-all"
            >
              Download Certificate
            </a>
          </section>
        )}

        <section className="border border-[#3a3126] mt-16 p-10">
          <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-sm mb-8 text-center">
            Transfer Ownership
          </p>

          {currentClaim ? (
            <TransferOwnershipForm
              serial={bottle.serial}
              ownerEmail={currentClaim.email}
            />
          ) : (
            <p className="text-[#8e7c63] text-center">
              Ownership transfer becomes available after collector registration.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}