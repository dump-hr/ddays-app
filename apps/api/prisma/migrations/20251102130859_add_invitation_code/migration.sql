/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "inviteCode" TEXT,
ADD COLUMN     "isInvited" BOOLEAN DEFAULT false,
ADD COLUMN     "numberOfInvitations" INTEGER DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteCode_key" ON "public"."User"("inviteCode");
