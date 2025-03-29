/*
  Warnings:

  - You are about to drop the column `companiesNewsletterConsent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterConsent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfBirth` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthYear` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "companiesNewsletterConsent",
DROP COLUMN "newsletterConsent",
DROP COLUMN "yearOfBirth",
ADD COLUMN     "birthYear" INTEGER NOT NULL,
ADD COLUMN     "companiesNewsEnabled" BOOLEAN,
ADD COLUMN     "educationDegree" TEXT,
ADD COLUMN     "newsletterEnabled" BOOLEAN;
