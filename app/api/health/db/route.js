import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const conn = await dbConnect()
    
    const isConnected = conn?.connection?.readyState === 1
    
    if (!isConnected) {
      return NextResponse.json(
        { ok: false, error: "Database connection not ready" },
        { status: 503 }
      )
    }

    await conn.connection.db.admin().ping()
    
    return NextResponse.json({ 
      ok: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Database health check failed:", error)
    return NextResponse.json(
      { ok: false, error: "Database connection failed" },
      { status: 503 }
    )
  }
}

