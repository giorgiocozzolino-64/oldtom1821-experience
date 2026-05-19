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

        <div className="text-center">
          <p className="tracking-[0.4em] text-sm md:text-base text-[#D4A437]/70 mb-8">
            FIFE CHAMBER AWARD 2026
          </p>

          <h1 className="text-6xl md:text-8xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_14px_rgba(212,164,55,0.35)]">
            INNOVATION & <br />
            DIGITALISATION
          </h1>

          <div className="w-32 h-px bg-[#D4A437]/50 mx-auto my-10" />

          <p className="tracking-[0.35em] text-[#D4A437]/70 text-sm mb-6">
            YOU HAVE UNLOCKED
          </p>

          <h2 className="text-5xl md:text-7xl font-serif text-[#D4A437] leading-tight">
            Ex-Bourbon Cask Aged Negroni
          </h2>

          <h3 className="mt-10 text-5xl md:text-7xl font-bold tracking-tight text-[#D4A437] drop-shadow-[0_0_14px_rgba(212,164,55,0.25)]">
            BOTTLE {bottle.bottleNumber}
          </h3>

          <p className="mt-6 tracking-[0.3em] text-[#D4A437]/70">
            {bottle.serial}
          </p>
        </div>

        <section className="grid md:grid-cols-3 gap-4 mt-16">
          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 mb-4">
              CASK ENTRY
            </p>
            <p className="text-2xl font-serif">30 September 2022</p>
          </div>

          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 mb-4">
              MATURATION
            </p>
            <p className="text-2xl font-serif">30 January 2026</p>
          </div>

          <div className="border border-[#D4A437]/30 p-6">
            <p className="text-xs tracking-[0.2em] text-[#D4A437]/60 mb-4">
              RELEASE
            </p>
            <p className="text-2xl font-serif">21 May 2026</p>
          </div>
        </section>

        <section className="border border-[#D4A437]/30 p-8 md:p-10 bg-black/40 backdrop-blur-sm mt-14">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            <div className="relative w-full h-[520px] overflow-hidden border border-[#D4A437]/20">
              <img
                src="/negroni-dark.jpeg"
                alt="Luxury Negroni"
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            <div>
              <h2 className="text-5xl text-[#D4A437] mb-6 tracking-tight font-serif">
                Provenance Journey
              </h2>

              <div className="w-20 h-px bg-[#D4A437]/40 mb-10" />

              <div className="space-y-8 text-[#D4A437]/85 leading-loose text-lg">
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

                <div className="w-24 h-px bg-[#D4A437]/30" />

                <div className="space-y-6">
                  <h3 className="text-4xl text-[#D4A437] font-serif">
                    The Story of the Negroni
                  </h3>

                  <p>
                    Born in Florence in 1919, the Negroni is one of Italy’s
                    most iconic cocktails.
                  </p>

                  <p>
                    According to the most widely accepted story, Count Camillo
                    Negroni entered Caffè Casoni and asked bartender Fosco
                    Scarselli to strengthen his favorite Americano by replacing
                    soda water with gin.
                  </p>

                  <p>
                    To distinguish the new creation, the bartender garnished it
                    with orange peel instead of lemon.
                  </p>

                  <p>
                    The result was a perfectly balanced cocktail: bold, bitter,
                    elegant, and timeless.
                  </p>

                  <p>
                    More than a century later, the Negroni remains a global
                    symbol of Italian aperitivo culture, celebrated for its
                    unmistakable harmony of gin, vermouth, and bitter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 border border-[#D4A437]/30 p-10 text-center">
          <p className="tracking-[0.25em] text-sm text-[#D4A437]/60 mb-6">
            DIGITAL AUTHENTICATION
          </p>

          <div className="flex justify-center">
            <div className="border border-[#D4A437]/20 p-6 bg-black">
              <div className="w-[220px] h-[220px] border border-[#D4A437]/20 flex items-center justify-center text-[#D4A437]/40 text-sm tracking-[0.2em]">
                QR PLACEHOLDER
              </div>
            </div>
          </div>

          <p className="mt-6 text-[#D4A437]/60 tracking-[0.2em] text-sm">
            SCAN TO VERIFY SERIALIZED PASSPORT
          </p>
        </section>

      </div>
    </main>
  );
}