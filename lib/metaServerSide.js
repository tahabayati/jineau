const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const META_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v21.0"

export async function sendMetaServerEvent(eventName, eventTime, eventId, eventSourceUrl, customData = {}, userData = {}) {
  if (!META_CAPI_ACCESS_TOKEN || !META_PIXEL_ID) {
    return null
  }

  try {
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
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending Meta server event:", error)
    return null
  }
}

