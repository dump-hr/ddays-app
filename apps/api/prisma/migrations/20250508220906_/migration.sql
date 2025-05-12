/*
  Warnings:

  - You are about to drop the column `selected` on the `UserToEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserToEvent" DROP COLUMN "selected";

-- CreateTable
CREATE TABLE "CompanyToFlyTalkUser" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "selected" BOOLEAN DEFAULT false,

    CONSTRAINT "CompanyToFlyTalkUser_pkey" PRIMARY KEY ("userId","eventId","companyId")
);

-- AddForeignKey
ALTER TABLE "CompanyToFlyTalkUser" ADD CONSTRAINT "CompanyToFlyTalkUser_userId_eventId_fkey" FOREIGN KEY ("userId", "eventId") REFERENCES "UserToEvent"("userId", "eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyToFlyTalkUser" ADD CONSTRAINT "CompanyToFlyTalkUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
