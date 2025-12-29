import mongoose from "mongoose"

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI || MONGODB_URI.trim() === '') {
    throw new Error("MONGODB_URI environment variable is not set. Please set it in your environment variables.")
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
