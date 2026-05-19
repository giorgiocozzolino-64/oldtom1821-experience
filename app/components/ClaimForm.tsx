"use client"

import { useState } from "react"

export default function ClaimForm({ serial }: { serial: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(event.currentTarget)

    const response = await fetch("/api/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial,
        name: form.get("name"),
        email: form.get("email"),
        company: form.get("company"),
        marketingConsent: form.get("marketingConsent") === "on",
      }),
    })

    if (!response.ok) {
      setError("Unable to claim this bottle.")
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <section className="mt-14 border border-[#D4A437]/30 p-10 text-center">
        <h2 className="text-4xl font-serif text-[#D4A437]">
          Ownership Claimed
        </h2>

        <p className="mt-4 text-[#D4A437]/70">
          Your bottle has been registered successfully.
        </p>
      </section>
    )
  }

  return (
    <section className="mt-14 border border-[#D4A437]/30 p-10 bg-black">
      <p className="tracking-[0.3em] text-sm text-[#D4A437]/70 text-center mb-6">
        OWNERSHIP CLAIM
      </p>

      <h2 className="text-4xl font-serif text-center mb-8 text-[#D4A437]">
        Claim this bottle
      </h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
        <input
          name="name"
          required
          placeholder="Name"
          className="w-full bg-black border border-[#D4A437]/30 p-4 text-[#D4A437] placeholder:text-[#D4A437]/40"
        />

        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-[#D4A437]/30 p-4 text-[#D4A437] placeholder:text-[#D4A437]/40"
        />

        <input
          name="company"
          placeholder="Company optional"
          className="w-full bg-black border border-[#D4A437]/30 p-4 text-[#D4A437] placeholder:text-[#D4A437]/40"
        />

        <label className="flex gap-3 text-sm text-[#D4A437]/70">
          <input type="checkbox" name="marketingConsent" />
          I agree to receive collector updates and future releases.
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-[#D4A437]/50 py-4 tracking-[0.25em] text-[#D4A437] hover:bg-[#D4A437] hover:text-black transition"
        >
          {loading ? "CLAIMING..." : "CLAIM OWNERSHIP"}
        </button>

        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
    </section>
  )
}