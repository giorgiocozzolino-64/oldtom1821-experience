export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-[#D4A437] overflow-hidden">
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,55,0.12),transparent_65%)]" />

        <div className="relative z-10 max-w-5xl fade-in">

          <p className="tracking-[0.45em] text-xs text-[#D4A437]/70 mb-6">
            OLD TOM GIN 1821 — ST ANDREWS
          </p>

          <h1 className="text-6xl md:text-8xl font-serif leading-none mb-6 gold-glow">
            DIGITAL
            <br />
            PROVENANCE
          </h1>

          <div className="w-40 h-[1px] bg-[#D4A437]/60 mx-auto my-8" />

          <p className="max-w-2xl mx-auto text-[#D4A437]/80 text-lg leading-relaxed">
            A luxury authentication and storytelling platform for
            serialized collector spirits, rare cask releases and
            authenticated ownership experiences.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mt-14">

            <a
              href="/p/FCA26-LE-001"
              className="border border-[#D4A437]/60 px-10 py-4 tracking-[0.3em] text-sm hover:bg-[#D4A437] hover:text-black transition-all duration-500"
            >
              ENTER EXPERIENCE
            </a>

            <a
              href="https://www.oldtomgin1821.com"
              target="_blank"
              className="border border-[#D4A437]/20 px-10 py-4 tracking-[0.3em] text-sm hover:border-[#D4A437]/60 transition-all duration-500"
            >
              OFFICIAL WEBSITE
            </a>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">

            <div className="luxury-panel p-8">
              <p className="text-xs tracking-[0.3em] text-[#D4A437]/60 mb-3">
                AUTHENTICATION
              </p>

              <h3 className="text-2xl mb-4">
                Serialized Identity
              </h3>

              <p className="text-[#D4A437]/70 leading-relaxed">
                Every bottle receives a unique provenance identity
                connected to release history and ownership records.
              </p>
            </div>

            <div className="luxury-panel p-8">
              <p className="text-xs tracking-[0.3em] text-[#D4A437]/60 mb-3">
                STORYTELLING
              </p>

              <h3 className="text-2xl mb-4">
                Cask Journey
              </h3>

              <p className="text-[#D4A437]/70 leading-relaxed">
                Production stages, aging periods and release events
                become part of an immersive collector narrative.
              </p>
            </div>

            <div className="luxury-panel p-8">
              <p className="text-xs tracking-[0.3em] text-[#D4A437]/60 mb-3">
                COLLECTORS
              </p>

              <h3 className="text-2xl mb-4">
                Ownership Experience
              </h3>

              <p className="text-[#D4A437]/70 leading-relaxed">
                Designed for premium distilleries, luxury releases
                and authenticated limited-edition spirits.
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  )
}