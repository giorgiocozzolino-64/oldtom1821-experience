export const bottles = Array.from({ length: 60 }, (_, i) => {
  const n = i + 1
  const serial = `FCA26-LE-${String(n).padStart(3, "0")}`

  return {
    serial,
    bottleNumber: `${String(n).padStart(2, "0")} OF 60`,
    edition: "Fife Chamber Award 2026 Limited Edition",
    product: "Ex-Bourbon Cask Aged Negroni",
    brand: "Old Tom Gin 1821 — St Andrews",
    status: "E.L.Y.A.S.-A.I. ® VERIFIED",
    releaseDate: "21 May 2026",
    agingStart: "30 September 2022",
    agingEnd: "30 January 2026",
  }
})

export function getBottle(serial: string) {
  return bottles.find(
    bottle => bottle.serial.toLowerCase() === serial.toLowerCase()
  )
}