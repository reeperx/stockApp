import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z.string().url(),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    NODE_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
