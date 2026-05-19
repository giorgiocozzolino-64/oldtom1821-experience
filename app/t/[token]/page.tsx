import AcceptTransferForm from "@/components/AcceptTransferForm"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <main className="min-h-screen bg-black text-[#D4A437] px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <AcceptTransferForm token={token} />
      </div>
    </main>
  )
}