import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 6.17+).
 *
 * When a Prisma config file is present, Prisma skips its automatic `.env`
 * loading — so we explicitly load dotenv here to keep `DATABASE_URL` and
 * friends available for `validate`, `generate`, `migrate`, `db push`, and
 * `db seed`.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
