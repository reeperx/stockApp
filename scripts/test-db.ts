import 'dotenv/config';
import { connectToDB } from "@/database/mongoose";

async function main() {
  try {
    await connectToDB();
    console.log("Database connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

main();