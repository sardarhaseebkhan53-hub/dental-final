-- Make hashedPassword / firstName / lastName nullable so OAuth (Google)
-- users can be provisioned by the PrismaAdapter without a password or name.
-- Also adds a `name` column for the raw OAuth display name.

ALTER TABLE "users"
  ALTER COLUMN "hashedPassword" DROP NOT NULL,
  ALTER COLUMN "firstName" DROP NOT NULL,
  ALTER COLUMN "lastName" DROP NOT NULL;

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "name" VARCHAR(200);
