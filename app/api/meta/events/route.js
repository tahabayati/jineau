import { NextResponse } from "next/server"
import { headers } from "next/headers"

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const META_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v21.0"

export const runtime = "nodejs"

export async function POST(request) {
  if (!META_CAPI_ACCESS_TOKEN || !META_PIXEL_ID) {
    return new NextResponse(null, { status: 204 })
  }

  try {
    const body = await request.json()
    const { eventName, eventTime, eventId, eventSourceUrl, customData = {} } = body

    if (!eventName || !eventTime) {
      return NextResponse.json({ error: "eventName and eventTime are required" }, { status: 400 })
    }

    const headersList = await headers()
    const clientUserAgent = headersList.get("user-agent") || ""
    const forwardedFor = headersList.get("x-forwarded-for")
    const clientIpAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null

    const cookies = headersList.get("cookie") || ""
    const fbpMatch = cookies.match(/_fbp=([^;]+)/)
    const fbcMatch = cookies.match(/_fbc=([^;]+)/)

    const userData = {
      client_user_agent: clientUserAgent,
    }

    if (clientIpAddress) {
      userData.client_ip_address = clientIpAddress
    }

    if (fbpMatch) {
      userData.fbp = fbpMatch[1]
    }

    if (fbcMatch) {
      userData.fbc = fbcMatch[1]
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(eventTime / 1000),
          event_id: eventId || `server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          action_source: "website",
          event_source_url: eventSourceUrl || "",
          user_data: userData,
          custom_data: customData,
        },
      ],
    }

    const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_ACCESS_TOKEN}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Meta Conversions API error:", response.status, errorText)
      return NextResponse.json(
        { error: "Failed to send event to Meta Conversions API" },
        { status: response.status }
      )
    }

    const result = await response.json()
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Error processing Meta Conversions API request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

