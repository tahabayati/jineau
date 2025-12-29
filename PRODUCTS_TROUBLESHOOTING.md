# Products & Orders Troubleshooting Guide

## Issue: Products Not Showing in Admin Page

If you see "No products found" in the admin page, it means the products haven't been seeded into the database yet. The products are defined in `data/initialProducts.js` but need to be loaded into MongoDB.

## Solution: Seed the Database

### Option 1: Use the Seed API (Recommended for Development)

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. In another terminal or using a tool like Postman/curl, make a POST request to:
   ```
   POST http://localhost:3000/api/seed
   ```

   Or using curl:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

3. You should see a response like:
   ```json
   {
     "message": "Database seeded successfully",
     "categories": 2,
     "products": 10,
     "plans": 3
   }
   ```

**Note:** The seed API only works in development mode (not in production).

### Option 2: Use the Import Script (If you have Excel file)

If you have a `product_jineau.xlsx` file in the `public` folder:

```bash
node scripts/import-products.js
```

This will import products from the Excel file.

## Verify Products Are Loaded

### Check via Diagnostics Endpoint

1. Log into the admin panel
2. Visit: `http://localhost:3000/api/admin/diagnostics`
3. This will show you:
   - Total products in database
   - Active vs inactive products
   - Sample products
   - Category count
   - Order count

### Check via Admin Panel

1. Go to Admin → Products
2. You should see all 10 products listed:
   - Sunflower Microgreens
   - Pea Shoots
   - Radish Microgreens
   - Broccoli Microgreens
   - Mixed Microgreens
   - Basil Microgreens
   - Pea Shoot Hydrosol
   - Sunflower Hydrosol
   - Basil Hydrosol

## Products Defined in Code

All products are defined in `data/initialProducts.js`:
- 6 Microgreens products
- 3 Hydrosol products
- Total: 9 products (not 10 - the user mentioned 10, but there are 9 in the file)

## Orders API

The orders API is working correctly. It will show:
- All orders with user information
- Filterable by status and type
- Includes populated product information

To test orders:
1. Make sure you have products in the database
2. Create a test order through the checkout flow
3. Check Admin → Orders to see the order

## Common Issues

### Issue: "No products found" after seeding

**Solution:** Check the browser console and server logs. The API now includes better error logging. Look for:
- Database connection errors
- Query issues
- Authentication problems

### Issue: Products show but are inactive

**Solution:** Products are seeded with `active: true` by default. If they show as inactive, you can:
1. Edit them in the admin panel
2. Or check the database directly

### Issue: Seed API returns 403

**Solution:** The seed API is disabled in production. Make sure you're running in development mode (`NODE_ENV !== "production"`).

## Debugging

### Check Server Logs

The admin products API now logs:
- The query being executed
- Number of products found
- Any errors with stack traces (in development)

### Check Database Directly

You can also check MongoDB directly:
```javascript
// In MongoDB shell or Compass
db.products.countDocuments()
db.products.find({ active: true })
```

## Next Steps

1. **Seed the database** using `/api/seed` endpoint
2. **Verify products** using `/api/admin/diagnostics`
3. **Check admin panel** - products should now appear
4. **Test orders** - create a test order and verify it appears in Admin → Orders

