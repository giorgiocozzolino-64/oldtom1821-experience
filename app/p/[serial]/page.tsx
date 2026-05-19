export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-[#D4A437] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center py-24">

        <p className="tracking-[0.45em] text-sm text-[#D4A437]/70 mb-8">
          OLD TOM GIN 1821 — ST ANDREWS
        </p>

        <h1 className="text-6xl md:text-8xl leading-none font-serif text-[#D4A437] drop-shadow-[0_0_18px_rgba(212,164,55,0.35)]">
          DIGITAL <br />
          PROVENANCE
        </h1>

        <div className="w-32 h-px bg-[#D4A437]/40 mx-auto my-10" />

        <p className="max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed text-[#D4A437]/80">
          A luxury authentication and storytelling platform for serialized
          collector spirits, rare cask releases and authenticated ownership experiences.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center mt-16">

          <a
            href="/p/FCA26-LE-001"
            className="border border-[#D4A437]/40 px-10 py-5 tracking-[0.25em] text-sm hover:bg-[#D4A437] hover:text-black transition-all duration-300"
          >
            ENTER EXPERIENCE
          </a>

          <a
            href="https://www.oldtomgin1821.com"
            target="_blank"
            className="border border-[#D4A437]/20 px-10 py-5 tracking-[0.25em] text-sm hover:border-[#D4A437]/50 transition-all duration-300"
          >
            OFFICIAL WEBSITE
          </a>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-28">

          <div className="border border-[#D4A437]/10 p-10 bg-[#0A0A0A]">
            <p className="tracking-[0.25em] text-xs text-[#D4A437]/60 mb-6">
              AUTHENTICATION
            </p>

            <h3 className="text-4xl font-serif mb-6">
              Serialized Identity
            </h3>

            <p className="text-[#D4A437]/70 leading-loose">
              Every bottle receives a unique provenance identity connected to release history and ownership records.
            </p>
          </div>

          <div className="border border-[#D4A437]/10 p-10 bg-[#0A0A0A]">
            <p className="tracking-[0.25em] text-xs text-[#D4A437]/60 mb-6">
              STORYTELLING
            </p>

            <h3 className="text-4xl font-serif mb-6">
              Cask Journey
            </h3>

            <p className="text-[#D4A437]/70 leading-loose">
              Production stages, aging periods and release events become part of an immersive collector narrative.
            </p>
          </div>

          <div className="border border-[#D4A437]/10 p-10 bg-[#0A0A0A]">
            <p className="tracking-[0.25em] text-xs text-[#D4A437]/60 mb-6">
              COLLECTORS
            </p>

            <h3 className="text-4xl font-serif mb-6">
              Ownership Experience
            </h3>

            <p className="text-[#D4A437]/70 leading-loose">
              Designed for premium distilleries, luxury releases and authenticated limited-edition spirits.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}