/*
  Warnings:

  - A unique constraint covering the columns `[email,isDeleted]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber,isDeleted]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isDeleted" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_isDeleted_key" ON "User"("email", "isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_isDeleted_key" ON "User"("phoneNumber", "isDeleted");
