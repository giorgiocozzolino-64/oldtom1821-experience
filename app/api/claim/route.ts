import { NextResponse } from "next/server"
import oracledb from "oracledb"

export async function POST(req: Request) {
  let connection

  try {
    const body = await req.json()

    const {
      serial,
      name,
      email,
      company,
      marketingConsent,
    } = body

    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING,
    })

    await connection.execute(
      `
      INSERT INTO ELYAS_BOTTLE_CLAIMS (
        SERIAL,
        NAME,
        EMAIL,
        COMPANY,
        MARKETING_CONSENT
      )
      VALUES (
        :serial,
        :name,
        :email,
        :company,
        :marketingConsent
      )
      `,
      {
        serial,
        name,
        email,
        company,
        marketingConsent: marketingConsent ? 1 : 0,
      },
      {
        autoCommit: true,
      }
    )

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
      },
      {
        status: 500,
      }
    )
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}