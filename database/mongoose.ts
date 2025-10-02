import { env } from "@/lib/env"
import mongoose from "mongoose"

const MONGODB_URI = env.MONGODB_URI;
const NODE_ENV = env.NODE_ENV;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDB = async () => {
    if(!MONGODB_URI) throw new Error("MONGODB_URI must be set withing the .env");

    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error
    }

    console.log(`connectToDB ${NODE_ENV} ${MONGODB_URI}`)
}