const QRCode = require("qrcode")
const fs = require("fs")
const path = require("path")

const outputDir = path.join(__dirname, "../public/qr")

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

async function generate() {
  for (let i = 1; i <= 60; i++) {
    const serial = `FCA26-LE-${String(i).padStart(3, "0")}`

    const url = `https://oldtom1821-experience.vercel.app/p/${serial}`

    const outputPath = path.join(outputDir, `${serial}.png`)

    await QRCode.toFile(outputPath, url, {
      width: 500,
      margin: 2,
      color: {
        dark: "#D4A437",
        light: "#000000",
      },
    })

    console.log(`Generated ${serial}`)
  }
}

generate()