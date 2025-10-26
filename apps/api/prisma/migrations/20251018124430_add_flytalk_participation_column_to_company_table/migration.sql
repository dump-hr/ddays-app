/*
  Warnings:

  - You are about to drop the column `flyTalkHolders` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "flyTalkHolders",
ADD COLUMN     "flytalkHolders" JSONB,
ADD COLUMN     "flytalkParticipation" BOOLEAN NOT NULL DEFAULT false;
