"use client"

import { useState } from "react"

export default function TransferOwnershipForm({
  serial,
  ownerEmail,
}: {
  serial: string
  ownerEmail: string
}) {
  const [toName, setToName] = useState("")
  const [toEmail, setToEmail] = useState("")
  const [toCompany, setToCompany] = useState("")
  const [loading, setLoading] = useState(false)
  const [transferUrl, setTransferUrl] = useState("")
  const [error, setError] = useState("")

  async function handleTransfer() {
    setLoading(true)
    setError("")

    const res = await fetch("/api/transfer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial,
        fromEmail: ownerEmail,
        toName,
        toEmail,
        toCompany,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Unable to create transfer.")
      setLoading(false)
      return
    }

    setTransferUrl(data.transferUrl)
    setLoading(false)
  }

  return (
    <section className="border border-[#D4A437]/30 p-10 mt-14">
      <p className="tracking-[0.3em] text-sm text-[#D4A437]/70 text-center mb-8">
        TRANSFER OWNERSHIP
      </p>

      <div className="space-y-4">
        <input
          placeholder="New owner name"
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          className="w-full bg-black border border-[#D4A437]/20 p-4 text-[#D4A437]"
        />

        <input
          placeholder="New owner email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="w-full bg-black border border-[#D4A437]/20 p-4 text-[#D4A437]"
        />

        <input
          placeholder="Company / Collection"
          value={toCompany}
          onChange={(e) => setToCompany(e.target.value)}
          className="w-full bg-black border border-[#D4A437]/20 p-4 text-[#D4A437]"
        />

        <button
          onClick={handleTransfer}
          disabled={loading}
          className="w-full border border-[#D4A437] py-4 tracking-[0.3em] hover:bg-[#D4A437] hover:text-black transition"
        >
          {loading ? "CREATING..." : "CREATE TRANSFER"}
        </button>

        {error && (
          <p className="text-red-400 text-center">
            {error}
          </p>
        )}

        {transferUrl && (
          <div className="pt-6 text-center">
            <p className="text-[#D4A437]/70 mb-4">
              Secure transfer link generated
            </p>

            <a
              href={transferUrl}
              className="underline break-all text-[#D4A437]"
            >
              {transferUrl}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}