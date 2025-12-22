#!/usr/bin/env node

/**
 * Script to update product galleries with images from /public/jineau-products
 * 
 * Usage: node scripts/update-product-gallery.js
 * 
 * This script will:
 * 1. Scan the jineau-products folder
 * 2. Match product folders with product slugs in the database
 * 3. Update the gallery field with all images found for each product
 */

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// MongoDB connection - try multiple sources
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/jineau'

console.log('Using MongoDB URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')) // Hide credentials

// Product schema (simplified - must match your actual schema)
const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  type: String,
  category: mongoose.Schema.Types.ObjectId,
  price: Number,
  shortDescription: String,
  description: String,
  image: String,
  gallery: [String],
  isSubscriptionEligible: Boolean,
  tags: [String],
  active: Boolean,
  inStock: Boolean,
  usage: String,
  storage: String,
  safetyNote: String,
  allergenNote: String,
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

// Map folder names to product slugs (matching your actual product slugs)
const folderToSlugMap = {
  'arugula': 'arugula-microgreens',
  'bassil': 'basil-microgreens',
  'brocccoli': 'broccoli-microgreens',
  'peashoot': 'pea-shoots',
  'Radish': 'radish-microgreens',
  'sunflower': 'sunflower-microgreens',
}

async function updateProductGallery() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')
    
    // Check if products exist
    const productCount = await Product.countDocuments()
    console.log(`📦 Found ${productCount} products in database\n`)
    
    if (productCount === 0) {
      console.log('⚠️  No products in database! Please seed the database first.')
      console.log('   Run: curl -X POST http://localhost:3000/api/seed\n')
      process.exit(0)
    }
    
    // List all products
    const allProducts = await Product.find({}).select('name slug').lean()
    console.log('🔍 Products in database:')
    allProducts.forEach(p => console.log(`   - ${p.slug}`))
    console.log('')

    const publicPath = path.join(__dirname, '..', 'public', 'jineau-products')
    
    if (!fs.existsSync(publicPath)) {
      console.error('❌ Error: jineau-products folder not found at', publicPath)
      process.exit(1)
    }

    const folders = fs.readdirSync(publicPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    console.log('📁 Found product folders:', folders.join(', '), '\n')

    for (const folder of folders) {
      const folderPath = path.join(publicPath, folder)
      const images = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .sort() // Sort alphabetically
        .map(file => `/jineau-products/${folder}/${file}`)

      if (images.length === 0) {
        console.log(`⚠️  No images found in ${folder}`)
        continue
      }

      // Use folder name directly as slug (now that folders are renamed to match slugs)
      const slug = folderToSlugMap[folder] || folder
      
      const product = await Product.findOne({ slug })
      
      if (!product) {
        console.log(`⚠️  No product found with slug: ${slug} (folder: ${folder})`)
        console.log(`   Images: ${images.length} files`)
        continue
      }

      // Update the product gallery
      product.gallery = images
      await product.save()
      
      console.log(`✅ Updated ${product.name}`)
      console.log(`   Slug: ${slug}`)
      console.log(`   Gallery: ${images.length} images`)
      console.log(`   Files: ${images.join(', ')}`)
      console.log('')
    }

    console.log('\n✨ Gallery update complete!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n🔌 MongoDB connection closed')
  }
}

// Run the script
updateProductGallery()

