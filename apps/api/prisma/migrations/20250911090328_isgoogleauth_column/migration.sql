/*
  Warnings:

  - You are about to drop the column `isGoogleAuth` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isGoogleAuth",
ADD COLUMN     "isFromGoogleAuth" BOOLEAN DEFAULT false;
