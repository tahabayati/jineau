# Tracking Implementation Testing Guide

This document provides a step-by-step guide for testing the Meta Ads and Google Analytics tracking implementation.

## Prerequisites

1. Set up environment variables:
   - `NEXT_PUBLIC_META_PIXEL_ID`
   - `META_CAPI_ACCESS_TOKEN` (for server-side events)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_TRACKING_ENABLED=true` (default)

2. Access to:
   - Meta Events Manager (Test Events)
   - Google Analytics 4 Real-Time reports
   - Browser Developer Tools

## Testing Checklist

### 1. Consent Banner Display

**Test**: Verify consent banner appears on first visit

**Steps**:
1. Open the site in a new incognito/private window
2. Clear cookies and localStorage
3. Navigate to the homepage
4. Verify consent banner appears at the bottom of the page

**Expected Result**: Banner displays with options: "Accept Analytics", "Accept Marketing", "Accept All", "Reject"

---

### 2. Marketing Consent - Meta Pixel Loading

**Test**: Verify Meta Pixel loads only after marketing consent

**Steps**:
1. Clear cookies and localStorage
2. Click "Accept Marketing" (or "Accept All")
3. Open browser DevTools → Console
4. Type: `typeof fbq`

**Expected Result**: 
- `typeof fbq` returns `"function"`
- No Meta Pixel script loaded if consent not granted

---

### 3. Analytics Consent - GA4 Loading

**Test**: Verify GA4 loads only after analytics consent

**Steps**:
1. Clear cookies and localStorage
2. Click "Accept Analytics" (or "Accept All")
3. Open browser DevTools → Console
4. Type: `typeof gtag`

**Expected Result**:
- `typeof gtag` returns `"function"`
- No GA4 script loaded if consent not granted

---

### 4. Meta Pixel PageView Tracking

**Test**: Verify PageView events fire on route changes

**Steps**:
1. Grant marketing consent
2. Open Meta Events Manager → Test Events
3. Navigate between pages (e.g., `/shop`, `/products`, `/checkout`)
4. Check Test Events dashboard

**Expected Result**:
- PageView events appear in Test Events
- Events show correct page paths
- Events fire on each route change

---

### 5. GA4 PageView Tracking

**Test**: Verify GA4 page_view events fire on route changes

**Steps**:
1. Grant analytics consent
2. Open GA4 → Reports → Real-time
3. Navigate between pages
4. Check Real-time report

**Expected Result**:
- page_view events appear in Real-time report
- Events show correct page paths
- Events fire on each route change

---

### 6. Purchase Event (Server-Side)

**Test**: Verify Purchase event sent via Conversions API

**Steps**:
1. Grant marketing consent
2. Complete a test checkout (use Stripe test mode)
3. Check Meta Events Manager → Events Manager (not Test Events)
4. Filter by event: "Purchase"
5. Check event source column

**Expected Result**:
- Purchase event appears in Events Manager
- Event source shows as "Server" (from Conversions API)
- Event includes correct value and currency

**Note**: Server-side events may take a few minutes to appear in Events Manager.

---

### 7. Lead Event (Browser + Server Deduplication)

**Test**: Verify Lead event sent with deduplication

**Steps**:
1. Grant marketing consent
2. Submit a support request form
3. Open browser DevTools → Network tab
4. Filter by "meta/events"
5. Check the request payload for `eventId`
6. Check Meta Events Manager → Test Events
7. Look for Lead event

**Expected Result**:
- Lead event appears in Test Events
- Same `eventId` used in both browser (`fbq`) and server API call
- Event shows in Events Manager without duplication

---

### 8. Server Endpoint Direct Test

**Test**: Verify `/api/meta/events` endpoint works

**Steps**:
1. Grant marketing consent (to get cookies)
2. Open browser DevTools → Console
3. Run:
```javascript
fetch('/api/meta/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventName: 'TestEvent',
    eventTime: Date.now(),
    eventId: 'test_' + Date.now(),
    eventSourceUrl: window.location.href,
    customData: { test: true }
  })
}).then(r => r.json()).then(console.log)
```

**Expected Result**:
- Returns `{ success: true, result: {...} }`
- Event appears in Meta Events Manager
- Status 204 if `META_CAPI_ACCESS_TOKEN` not configured

---

### 9. Consent Persistence

**Test**: Verify consent persists across page reloads

**Steps**:
1. Grant consent (any type)
2. Reload the page
3. Check that banner does not reappear
4. Verify tracking scripts still load

**Expected Result**:
- Banner does not show after reload
- Tracking continues to work
- Consent stored in both cookies and localStorage

---

### 10. Consent Revocation

**Test**: Verify tracking stops when consent is revoked

**Steps**:
1. Grant consent and verify tracking works
2. Clear cookies and localStorage
3. Reload page
4. Click "Reject" or don't grant consent
5. Check that `fbq` and `gtag` are undefined

**Expected Result**:
- No tracking scripts load
- No events sent to Meta or GA4
- Banner may reappear on next visit

---

## Troubleshooting

### Meta Pixel Not Loading

- Check `NEXT_PUBLIC_META_PIXEL_ID` is set
- Check `NEXT_PUBLIC_TRACKING_ENABLED` is not "false"
- Verify marketing consent is granted
- Check browser console for errors

### GA4 Not Loading

- Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- Check `NEXT_PUBLIC_TRACKING_ENABLED` is not "false"
- Verify analytics consent is granted
- Check browser console for errors

### Server Events Not Appearing

- Verify `META_CAPI_ACCESS_TOKEN` is set (server-side)
- Check server logs for API errors
- Verify event format matches Meta requirements
- Events may take 5-10 minutes to appear in Events Manager

### Event Deduplication Issues

- Ensure same `eventId` used in browser and server calls
- Check event timestamps are within 48 hours
- Verify `eventId` format is consistent

---

## Environment Variables Reference

```env
NEXT_PUBLIC_META_PIXEL_ID=your-pixel-id
META_CAPI_ACCESS_TOKEN=your-access-token
META_GRAPH_API_VERSION=v21.0
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TRACKING_ENABLED=true
```

---

## Quick Test Script

Run this in browser console after granting marketing consent:

```javascript
// Test Meta Pixel
console.log('fbq exists:', typeof fbq === 'function')
fbq('track', 'PageView')

// Test GA4
console.log('gtag exists:', typeof gtag === 'function')
gtag('event', 'test_event', { test: true })

// Test Server Endpoint
fetch('/api/meta/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventName: 'TestEvent',
    eventTime: Date.now(),
    eventId: 'test_' + Date.now(),
    eventSourceUrl: window.location.href
  })
}).then(r => r.json()).then(console.log)
```

