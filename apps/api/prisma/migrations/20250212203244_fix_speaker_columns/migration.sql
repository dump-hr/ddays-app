/*
  Warnings:

  - You are about to drop the column `instagram` on the `Speaker` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Speaker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "instagram",
DROP COLUMN "linkedin",
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT;
