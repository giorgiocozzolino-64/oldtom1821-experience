export default function BusinessCardPage() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Cozzolino;Giorgio;;;
FN:Giorgio Cozzolino
ORG:McFratm Ltd.
TITLE:Project E.L.Y.A.S.-A.I.
TEL;TYPE=CELL:+447721966558
EMAIL:giorgio@mcfratmcommunity.com
ADR;TYPE=WORK:;;2 Muirfield Court;Anstruther;;KY10 3EQ;United Kingdom
URL:https://oldtom1821-experience.vercel.app/business-card
NOTE:Digital Traceability, Whisky Casks and bottles monitoring system on Land and Under Water.
END:VCARD`

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(vcard)}`

  return (
    <main className="min-h-screen bg-black text-[#d6d0c7] flex items-center justify-center px-6 py-12">
      <section className="w-full max-w-5xl border border-[#3a3126] bg-black p-8 md:p-12 text-center">
        <p className="text-[#c6a47a] tracking-[0.4em] uppercase text-xs mb-3">
          Digital Innovation & Technology
        </p>

        <p className="text-[#8e7c63] tracking-[0.3em] uppercase text-[10px] mb-8">
          Finalist — Fife Chamber Awards 2026
        </p>

        <h1 className="text-5xl md:text-7xl text-[#d4a63c] leading-tight mb-6">
          Giorgio Cozzolino
        </h1>

        <div className="w-24 h-px bg-[#5a4835] mx-auto mb-6" />

        <p className="text-[#c6a47a] tracking-[0.35em] uppercase text-lg mb-10">
          McFratm Ltd.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#3a3126]">
          <div className="p-8 text-left space-y-6">
            <div>
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-2">
                Company
              </p>
              <p className="text-[#e7d7bd] text-2xl">McFratm Ltd.</p>
            </div>

            <div>
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-2">
                Address
              </p>
              <p className="text-[#d6d0c7] text-xl leading-relaxed">
                2 Muirfield Court
                <br />
                Anstruther, KY10 3EQ
                <br />
                United Kingdom
              </p>
            </div>

            <div>
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-2">
                Email
              </p>
              <p className="text-[#d6d0c7] text-base break-all">
                giorgio@mcfratmcommunity.com
              </p>
            </div>

            <div>
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-2">
                Project
              </p>
              <p className="text-[#e7d7bd] text-2xl">E.L.Y.A.S.-A.I.</p>
            </div>

            <div>
              <p className="text-[#8e7c63] text-xs tracking-[0.25em] uppercase mb-2">
                Focus
              </p>
              <p className="text-[#d6d0c7] text-xl leading-relaxed">
                Digital Traceability, Whisky Casks and bottles monitoring system
                on Land and Under Water.
              </p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-[#3a3126] p-8 text-center flex flex-col justify-center">
            <img
              src={qrUrl}
              alt="Digital business card QR code"
              className="w-full max-w-[300px] mx-auto bg-white p-3"
            />

            <p className="text-[#d4a63c] tracking-[0.25em] uppercase text-sm mt-6">
              Scan to download
              <br />
              all information
            </p>

            <p className="text-[#a8957a] text-sm mt-5 leading-relaxed">
              Save my contact, company details and project information directly
              to your phone.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="tel:+447721966558"
            className="border border-[#d4a63c] px-6 py-5 text-[#d4a63c] text-3xl hover:bg-[#d4a63c] hover:text-black transition-all"
          >
            +44(0)7721966558
          </a>

          <a
            href="mailto:giorgio@mcfratmcommunity.com"
            className="border border-[#d4a63c] px-6 py-5 text-[#d4a63c] text-sm md:text-base break-all hover:bg-[#d4a63c] hover:text-black transition-all"
          >
            giorgio@mcfratmcommunity.com
          </a>
        </div>

        <p className="mt-8 pt-6 border-t border-[#3a3126] text-[#a8957a] text-sm leading-relaxed">
          Serialized provenance infrastructure for ownership, authentication,
          traceability and monitored cask lifecycle.
        </p>
      </section>
    </main>
  )
}