# Admin Panel Quick Start Guide

## Overview

The Jineau admin panel now has complete functionality for managing all aspects of the platform.

## Access

Navigate to `/admin` (requires admin account with `isAdmin: true` in database)

---

## Site Content Management

### Location

`/admin/site-content`

### Purpose

Edit website text in 3 languages (EN, FR, FA) without redeploying

### How to Use

**Create New Content:**

1. Click "Create New Content"
2. Enter a unique key (e.g., `home.hero.title`)
3. Select type (text or markdown)
4. Enter values for EN, FR, and FA
5. Add group and label for organization
6. Click "Create"

**Edit Existing Content:**

1. Find the content in the list (use search if needed)
2. Click "Edit"
3. Modify values
4. Click "Update"

**Delete Content:**

1. Click "Delete" on any content row
2. Confirm deletion

**Tips:**

- Use dot notation for keys: `section.subsection.field`
- Group related content together
- Persian input is automatically RTL
- Changes apply on the next page refresh or navigation
- First request after a change may show cached content briefly

---

## Gift Deliveries

### Location

`/admin/gift-deliveries`

### What You Can Do

- View all gift deliveries
- Filter by status
- Edit delivery details

### How to Manage

**Update Delivery:**

1. Click "Edit" on any delivery
2. Change status (pending → scheduled → delivered)
3. Set delivery date
4. Add notes
5. Click "Save Changes"

**Statuses:**

- **Pending**: Not yet scheduled
- **Scheduled**: Date set, awaiting delivery
- **Delivered**: Completed
- **Cancelled**: Delivery cancelled

---

## Replacement Requests

### Location

`/admin/replacement-requests`

### What You Can Do

- View all replacement requests
- Filter by status
- Approve or reject requests
- Mark as applied

### How to Manage

**Quick Actions (Pending Requests):**

- Click "Approve" to approve immediately
- Click "Reject" to reject immediately

**Detailed Management:**

1. Click "View" to see full details
2. Review reason and user information
3. Change status as needed
4. If marking as applied, optionally enter order ID
5. Add admin notes
6. Click "Save Changes"

**Statuses:**

- **Pending**: Awaiting review
- **Approved**: Approved, ready to apply
- **Applied**: Replacement applied to order
- **Rejected**: Request denied

**Monthly Limits:**

- Users can request 2 replacements per month
- Red badge shows when limit reached

---

## Support Requests

### Location

`/admin/support-requests`

### What You Can Do

- View all support tickets
- Filter by type and status
- Update ticket status
- Add admin notes

### How to Manage

**Quick Actions:**

- Click "Start" to mark as in-progress
- Click "Resolve" to mark as resolved

**Detailed Management:**

1. Click "View" to open full details
2. Read full message (no longer truncated)
3. Review related order if applicable
4. Change status as needed
5. Add admin notes for internal reference
6. Click "Save Changes"

**Statuses:**

- **Open**: New ticket, needs attention
- **In-Progress**: Being worked on
- **Resolved**: Issue fixed
- **Closed**: Ticket closed

**Types:**

- **Refund**: Refund requests (purple badge)
- **Issue**: Product/service issues (orange badge)
- **General**: General inquiries (gray badge)

---

## Senior Centers

### Location

`/admin/senior-centers`

### What You Can Do

- View all senior centers
- Create new centers
- Edit existing centers
- Delete centers
- Toggle active/inactive status

### How to Manage

**Create Center:**

1. Click "Add Center"
2. Fill in name, address, city, postal code
3. Check "Active" box if ready to use
4. Click "Create"

**Edit Center:**

1. Click "Edit" on any center
2. Modify details
3. Click "Update"

**Delete Center:**

1. Click "Delete" on any center
2. Confirm deletion

---

## Dashboard

### Location

`/admin`

### Features

- Quick stats overview
- Links to all sections
- Pending items count

---

## Tips & Best Practices

### Site Content

- Use consistent naming conventions for keys
- Group related content (home, footer, legal, etc.)
- Test in all three languages after changes
- Use markdown for rich text content

### Gift Deliveries

- Set delivery dates as soon as scheduled
- Add notes for special delivery instructions
- Mark as delivered promptly

### Replacement Requests

- Review monthly usage count before approving
- Add admin notes explaining decisions
- Link to order ID when applying

### Support Requests

- Respond promptly to open tickets
- Use admin notes to track actions taken
- Mark as resolved when complete

---

## Keyboard Shortcuts

None implemented yet, but coming soon!

---

## Need Help?

Check the full documentation in `IMPLEMENTATION_SUMMARY.md` for technical details.
