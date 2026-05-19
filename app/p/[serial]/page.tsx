
import Image from "next/image";
import { notFound } from "next/navigation";
import { bottles } from "@/app/lib/bottles";

type Props = {
  params: Promise<{
    serial: string;
  }>;
};

export async function generateStaticParams() {
  return bottles.map((bottle) => ({
    serial: bottle.serial,
  }));
}

export default async function BottlePage({ params }: Props) {
  const { serial } = await params;

  const bottle = bottles.find((b) => b.serial === serial);

  if (!bottle) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-[#D4A437] px-6 py-10 md:px-10">
      <div className="max-w-5xl mx-auto border border-[#D4A437]/40 p-8 md:p-14 bg-black">

        {/* HEADER */}
        <div className="text-center">

          <p className="tracking-[0.4em] text-sm md:text-base text-[#D4A437]/70 mb-8">
            FIFE CHAMBER AWARD 2026
          </p>

          <h1 className="text-6xl md:text-8xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_18px_rgba(212,164,55,0.45)]">
            INNOVATION & <br />
            DIGITALISATION
          </h1>

          <div className="w-32 h-px bg-[#D4A437]/50 mx-auto my-10" />

          <p className="tracking-[0.4em] text-sm text-[#D4A437]/70 mb-6">
            YOU HAVE UNLOCKED
          </p>

          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-[#D4A437]">
            Ex-Bourbon Cask Aged Negroni
          </h2>

          <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-[#D4A437] drop-shadow-[0_0_14px_rgba(212,164,55,0.35)]">
            BOTTLE {bottle.bottleNumber} OF 60
          </h3>

          <p className="mt-6 tracking-[0.3em] text-[#D4A437]/70">
            {bottle.serial}
          </p>
        </div>

        {/* INFO BOXES */}
        <div className="grid md:grid-cols-3 gap-4 mt-14">

          <div className="border border-[#D4A437]/30 p-6 bg-black/40">
            <p className="text-sm tracking-[0.2em] text-[#D4A437]/60 mb-3">
              CASK ENTRY
            </p>

            <p className="text-2xl font-serif">
              30 September 2022
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-6 bg-black/40">
            <p className="text-sm tracking-[0.2em] text-[#D4A437]/60 mb-3">
              MATURATION
            </p>

            <p className="text-2xl font-serif">
              30 January 2026
            </p>
          </div>

          <div className="border border-[#D4A437]/30 p-6 bg-black/40">
            <p className="text-sm tracking-[0.2em] text-[#D4A437]/60 mb-3">
              RELEASE
            </p>

            <p className="text-2xl font-serif">
              21 May 2026
            </p>
          </div>

        </div>

        {/* PROVENANCE */}
        <section className="border border-[#D4A437]/30 p-8 md:p-10 bg-black/40 backdrop-blur-sm mt-12">

          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* IMAGE */}
            <div className="relative h-[700px] border border-[#D4A437]/20 overflow-hidden">

              <Image
                src="/Negroni Dark.jpeg"
                alt="Luxury Negroni"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* TEXT */}
            <div>

              <h2 className="text-4xl md:text-5xl text-[#D4A437] mb-8 tracking-tight font-serif">
                Provenance Journey
              </h2>

              <div className="w-24 h-px bg-[#D4A437]/40 mb-8" />

              <div className="space-y-6 text-[#D4A437]/80 leading-loose text-lg">

                <p>
                  This limited edition bottle belongs to a fully serialized
                  collector release created for the Fife Chamber Awards reception.
                </p>

                <p>
                  The liquid inside is an ex-bourbon cask aged Negroni connected
                  to the Old Tom Gin 1821 family in St Andrews.
                </p>

                <p>
                  Each QR code unlocks a unique digital passport,
                  authenticating the bottle number, release context,
                  and provenance story through the E.L.Y.A.S.-A.I verification layer.
                </p>

                <div className="w-24 h-px bg-[#D4A437]/40 my-8" />

                <h3 className="text-3xl md:text-4xl text-[#D4A437] font-serif">
                  The Story of the Negroni
                </h3>

                <p>
                  Born in Florence in 1919, the Negroni is one of Italy’s
                  most iconic cocktails.
                </p>

                <p>
                  According to the most widely accepted story,
                  Count Camillo Negroni asked bartender Fosco Scarselli
                  to strengthen his favorite Americano cocktail
                  by replacing soda water with gin.
                </p>

                <p>
                  To distinguish the new creation,
                  the bartender garnished it with orange peel
                  instead of the traditional lemon slice.
                </p>

                <p>
                  The result was a perfectly balanced cocktail:
                  bold, bitter, elegant, and timeless.
                </p>

                <p>
                  More than a century later,
                  the Negroni remains a global symbol
                  of Italian aperitivo culture.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* AUTHENTICATION */}
        <section className="mt-12 border border-[#D4A437]/30 p-8 text-center">

          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Authentication Layer
          </h2>

          <p className="text-[#D4A437]/70 mb-8 max-w-2xl mx-auto leading-loose">
            This digital passport is connected to a serialized
            collector verification system.
          </p>

          <div className="border border-[#D4A437]/30 p-10 max-w-sm mx-auto bg-black/50">

            <p className="text-[#D4A437]/70 text-sm tracking-[0.25em]">
              QR VERIFIED ON LABEL
            </p>

            <p className="mt-6 text-2xl font-serif text-[#D4A437]">
              {bottle.serial}
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}