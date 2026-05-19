"use client"

import { useState } from "react"

export default function AcceptTransferForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false)
  const [successSerial, setSuccessSerial] = useState("")
  const [error, setError] = useState("")

  async function acceptTransfer() {
    setLoading(true)
    setError("")

    const res = await fetch("/api/transfer/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Unable to accept transfer.")
      setLoading(false)
      return
    }

    setSuccessSerial(data.serial)
    setLoading(false)
  }

  if (successSerial) {
    return (
      <section className="border border-[#D4A437]/30 p-10 text-center">
        <h1 className="text-4xl font-serif text-[#D4A437]">
          Ownership Transferred
        </h1>

        <p className="mt-4 text-[#D4A437]/70">
          This bottle is now registered to the new owner.
        </p>

        <a
          href={`/p/${successSerial}`}
          className="inline-block mt-8 border border-[#D4A437]/50 px-8 py-4 tracking-[0.25em] text-sm hover:bg-[#D4A437] hover:text-black transition"
        >
          VIEW DIGITAL PASSPORT
        </a>
      </section>
    )
  }

  return (
    <section className="border border-[#D4A437]/30 p-10 text-center">
      <p className="tracking-[0.35em] text-sm text-[#D4A437]/70 mb-8">
        SECURE OWNERSHIP TRANSFER
      </p>

      <h1 className="text-4xl md:text-5xl font-serif mb-6">
        Accept Bottle Transfer
      </h1>

      <p className="text-[#D4A437]/70 max-w-xl mx-auto mb-10 leading-relaxed">
        By accepting this transfer, the digital ownership record will be updated
        and the provenance chain will record the new custodian.
      </p>

      <button
        onClick={acceptTransfer}
        disabled={loading}
        className="border border-[#D4A437]/50 px-10 py-4 tracking-[0.25em] text-sm hover:bg-[#D4A437] hover:text-black transition"
      >
        {loading ? "ACCEPTING..." : "ACCEPT TRANSFER"}
      </button>

      {error && <p className="mt-6 text-red-400">{error}</p>}
    </section>
  )
}