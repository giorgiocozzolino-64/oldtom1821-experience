import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

import { getBottle, bottles } from "@/app/lib/bottles"
import ClaimForm from "../../../components/ClaimForm"

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

  if (!bottle) notFound()

  const { data: custodyHistory } = await supabase
    .from("custody_transfers")
    .select("*")
    .eq("serial", serial)
    .order("created_at", { ascending: true })

  return (
    <main className="min-h-screen bg-black text-[#D4A437] px-6 py-10 md:px-10">
      <div className="max-w-5xl mx-auto border border-[#D4A437]/40 p-8 md:p-14 bg-black">
        <div className="text-center">
          <p className="tracking-[0.4em] text-sm md:text-base text-[#D4A437]/70 mb-8">
            FIFE CHAMBER AWARD 2026
          </p>

          <h1 className="text-6xl md:text-8xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_18px_rgba(212,164,55,0.25)]">
            INNOVATION & <br />
            DIGITALISATION
          </h1>

          <div className="w-32 h-px bg-[#D4A437]/50 mx-auto my-12" />

          <p className="tracking-[0.35em] text-sm text-[#D4A437]/70 mb-6">
            YOU HAVE UNLOCKED
          </p>

          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            {bottle.product}
          </h2>

          <h3 className="mt-10 text-5xl md:text-7xl font-bold tracking-tight">
            BOTTLE {bottle.bottleNumber}
          </h3>

          <p className="mt-6 tracking-[0.3em] text-[#D4A437]/70">
            {bottle.serial}
          </p>
        </div>

        <section className="grid md:grid-cols-3 gap-4 mt-16">
          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/70">
              CASK ENTRY
            </p>
            <p className="mt-4 text-2xl font-serif">{bottle.caskEntry}</p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/70">
              MATURATION
            </p>
            <p className="mt-4 text-2xl font-serif">{bottle.maturation}</p>
          </div>

          <div className="border border-[#D4A437]/30 p-5">
            <p className="text-xs tracking-[0.25em] text-[#D4A437]/70">
              RELEASE
            </p>
            <p className="mt-4 text-2xl font-serif">{bottle.releaseDate}</p>
          </div>
        </section>

        <section className="mt-14 border border-[#D4A437]/30 p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="border border-[#D4A437]/20 p-4 flex justify-center">
              <Image
                src={bottle.image}
                alt={bottle.product}
                width={500}
                height={700}
                className="object-contain"
                priority
              />
            </div>

            <div>
              <h3 className="text-5xl font-serif leading-none">
                Provenance <br />
                Journey
              </h3>

              <div className="w-24 h-px bg-[#D4A437]/50 my-8" />

              <div className="space-y-8 text-lg leading-relaxed text-[#D4A437]/90 whitespace-pre-line">
                {bottle.story}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 border border-[#D4A437]/30 p-10 text-center">
          <p className="tracking-[0.3em] text-sm text-[#D4A437]/70">
            DIGITAL AUTHENTICATION
          </p>

          <div className="flex justify-center mt-8">
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

        <section className="mt-14 border border-[#D4A437]/30 p-10">
          <p className="tracking-[0.3em] text-sm text-[#D4A437]/70 text-center mb-10">
            PROVENANCE TIMELINE
          </p>

          <div className="space-y-8 max-w-2xl mx-auto">
            <div>
              <p className="text-[#D4A437]/50 text-sm tracking-[0.2em]">
                30 SEPTEMBER 2022
              </p>
              <p className="text-2xl font-serif mt-2">Cask Filled</p>
            </div>

            <div>
              <p className="text-[#D4A437]/50 text-sm tracking-[0.2em]">
                30 JANUARY 2026
              </p>
              <p className="text-2xl font-serif mt-2">Maturation Completed</p>
            </div>

            <div>
              <p className="text-[#D4A437]/50 text-sm tracking-[0.2em]">
                21 MAY 2026
              </p>
              <p className="text-2xl font-serif mt-2">
                Released for Fife Chamber Awards
              </p>
            </div>

            {custodyHistory?.map((event) => (
              <div key={event.id}>
                <p className="text-[#D4A437]/50 text-sm tracking-[0.2em]">
                  {new Date(event.created_at).toLocaleString("en-GB")}
                </p>

                <p className="text-2xl font-serif mt-2">
                  {event.transfer_type === "ownership_claim"
                    ? `Claimed by ${event.to_party}`
                    : `Transferred from ${event.from_party} to ${event.to_party}`}
                </p>

                <p className="text-[#D4A437]/60 mt-1">
                  {event.from_role} → {event.to_role}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ClaimForm serial={bottle.serial} />
      </div>
    </main>
  )
}