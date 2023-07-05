// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  BASE_URL: z.string(),
  NODE_ENV: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  TEST_NEXTAUTH_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  CONTENTFUL_SPACE_ID: z.string(),
  CONTENTFUL_ACCESS_TOKEN: z.string(),
  CF_PREVIEW_ACCESS_TOKEN: z.string(),
  CONTENTFUL_MANAGEMENT_TOKEN: z.string(),
  CONTENTFUL_ENVIRONMENT: z.string(),
  SLACK_BOT_TOKEN: z.string().default("slacky"),
  SLACK_SIGNING_SECRET: z.string().default("slacky"),
  SLACK_ENVIRONMENT_URL: z.string(),
  SECRET: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: z.string(),
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: z.string(),
  // NEXT_PUBLIC_BAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_BASE_URL: "https://dept-pet-cms-test.azurewebsites.net",
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID
  // NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
};
