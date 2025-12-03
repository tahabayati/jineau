const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Import models
const Product = require('../models/Product').default || require('../models/Product');
const Category = require('../models/Category').default || require('../models/Category');

// Helper function to create slug
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to parse price
function parsePrice(priceStr) {
  // Handle formats like "4.99$(CAD)", "10$", "15$"
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// Helper function to determine product type
function getProductType(category) {
  return category.toLowerCase().includes('micro') ? 'microgreen' : 'hydrosol';
}

// Helper function to extract tags from description
function extractTags(product) {
  const tags = [];
  const desc = (product.Full_Description + ' ' + product.Short_Description).toLowerCase();
  
  if (desc.includes('nutty')) tags.push('nutty');
  if (desc.includes('sweet')) tags.push('sweet');
  if (desc.includes('spicy') || desc.includes('peppery')) tags.push('spicy');
  if (desc.includes('mild')) tags.push('mild');
  if (desc.includes('crisp') || desc.includes('crunchy')) tags.push('crunchy');
  if (desc.includes('aromatic') || desc.includes('fragrant')) tags.push('aromatic');
  if (desc.includes('bold')) tags.push('bold');
  if (desc.includes('fresh')) tags.push('fresh');
  if (desc.includes('organic')) tags.push('organic');
  if (desc.includes('local')) tags.push('locally-grown');
  
  return tags;
}

async function importProducts() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env.local');
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');

    // Read the Excel file
    const filePath = path.join(__dirname, '../public/product_jineau.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`\nFound ${data.length} products in Excel file`);

    // Create or get categories
    console.log('\nCreating categories...');
    
    let microgreensCategory = await Category.findOne({ slug: 'microgreens' });
    if (!microgreensCategory) {
      microgreensCategory = await Category.create({
        name: 'Microgreens',
        slug: 'microgreens',
        description: 'Fresh, clean microgreens delivered weekly. No washing needed.',
        type: 'microgreen'
      });
      console.log('Created Microgreens category');
    } else {
      console.log('Microgreens category already exists');
    }

    let hydrosolsCategory = await Category.findOne({ slug: 'hydrosols' });
    if (!hydrosolsCategory) {
      hydrosolsCategory = await Category.create({
        name: 'Hydrosols',
        slug: 'hydrosols',
        description: 'Pure plant waters from surplus greens. Zero waste aromatics.',
        type: 'hydrosol'
      });
      console.log('Created Hydrosols category');
    } else {
      console.log('Hydrosols category already exists');
    }

    // Clear existing products (optional - comment out to append)
    console.log('\nClearing existing products...');
    await Product.deleteMany({});

    // Transform and insert products
    console.log('\nImporting products...');
    
    const products = data.map(row => {
      const type = getProductType(row.Category);
      const categoryId = type === 'microgreen' ? microgreensCategory._id : hydrosolsCategory._id;
      
      // Build usage instructions from details
      const usage = type === 'microgreen' 
        ? 'Perfect for salads, wraps, sandwiches, smoothies, and as garnish for soups and bowls.'
        : 'Use as a facial mist, room spray, or add to drinks and recipes for a botanical twist.';
      
      // Build storage instructions
      const storage = row.Detail_4 || (type === 'microgreen' 
        ? 'Keep refrigerated. Best consumed within 2 weeks.'
        : 'Keep in a cool, dry, and dark place. Use within 6 months.');

      return {
        name: row.Product_Name.replace(/-/g, ' '),
        slug: createSlug(row.Product_Name),
        type: type,
        category: categoryId,
        price: parsePrice(row.Price),
        shortDescription: row.Short_Description,
        description: row.Full_Description,
        usage: usage,
        storage: storage,
        tags: extractTags(row),
        isSubscriptionEligible: type === 'microgreen',
        active: true,
        inStock: true,
        allergenNote: type === 'microgreen' ? 'Grown in a facility that handles seeds.' : null,
        safetyNote: type === 'hydrosol' ? 'For external use only unless specified as edible. Patch test recommended.' : null
      };
    });

    const insertedProducts = await Product.insertMany(products);
    
    console.log(`\n✅ Successfully imported ${insertedProducts.length} products:`);
    insertedProducts.forEach(p => {
      console.log(`   - ${p.name} ($${p.price}) - ${p.type}`);
    });

    // Summary
    const microgreensCount = insertedProducts.filter(p => p.type === 'microgreen').length;
    const hydrosolsCount = insertedProducts.filter(p => p.type === 'hydrosol').length;
    
    console.log(`\n📊 Summary:`);
    console.log(`   Microgreens: ${microgreensCount}`);
    console.log(`   Hydrosols: ${hydrosolsCount}`);
    console.log(`   Total: ${insertedProducts.length}`);

  } catch (error) {
    console.error('Error importing products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the import
importProducts();

