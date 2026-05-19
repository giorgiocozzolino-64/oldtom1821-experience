import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-[#D4A437] flex items-center justify-center px-6">
      <section className="max-w-4xl border border-[#D4A437] p-10 text-center">
        
        <p className="tracking-[0.4em] text-sm mb-4">
          ST ANDREWS
        </p>

        <h1 className="text-5xl md:text-7xl font-serif mb-6">
          OLD TOM GIN 1821
        </h1>

        <p className="text-xl text-[#D4A437]/80 mb-10">
          Digital Provenance Experience powered by E.L.Y.A.S.-A.I.
        </p>

        <Link
          href="/p/FCA26-LE-001"
          className="border border-[#D4A437] px-8 py-4 tracking-[0.3em] text-sm hover:bg-[#D4A437] hover:text-black transition-all duration-300"
        >
          OPEN DEMO PASSPORT
        </Link>

      </section>
    </main>
  );
}