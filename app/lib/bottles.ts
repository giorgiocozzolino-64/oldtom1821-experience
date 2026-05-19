export const bottles = [
  {
    serial: "FCA26-LE-001",
    bottleNumber: "01 OF 60",

    edition: "Fife Chamber Award 2026 Limited Edition",

    product: "Ex-Bourbon Cask Aged Negroni",

    brand: "Old Tom Gin 1821 – St Andrews",

    caskEntry: "30 September 2022",

    maturation: "30 January 2026",

    releaseDate: "21 May 2026",

    image: "/negroni-dark.jpeg",

    story: `
This limited edition bottle belongs to a fully serialized collector release created for the Fife Chamber Awards reception.

The liquid inside is an ex-bourbon cask aged Negroni connected to the Old Tom Gin 1821 family in St Andrews.

The cocktail follows the classic Italian equal-parts structure:
gin, bitter aperitivo and sweet vermouth.

The Negroni was born in Florence around 1919 when Count Camillo Negroni requested a stronger variation of the Americano cocktail.

Bartender Fosco Scarselli replaced soda water with gin and garnished it with orange peel instead of lemon.

The result was a perfectly balanced cocktail:
bold, bitter, elegant and timeless.

More than a century later, the Negroni remains a global symbol of Italian aperitivo culture, celebrated for its unmistakable harmony of gin, vermouth and bitter.
    `,
  },
]

export function getBottle(serial: string) {
  return bottles.find((bottle) => bottle.serial === serial)
}