/*
  Warnings:

  - The values [WHITE] on the enum `Colors` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Colors_new" AS ENUM ('YELLOW', 'ORANGE', 'BROWN', 'PURPLE', 'GREEN', 'BLUE', 'RED', 'GRAY');
ALTER TABLE "Avatar" ALTER COLUMN "color" TYPE "Colors_new" USING ("color"::text::"Colors_new");
ALTER TYPE "Colors" RENAME TO "Colors_old";
ALTER TYPE "Colors_new" RENAME TO "Colors";
DROP TYPE "Colors_old";
COMMIT;
