/*
  Warnings:

  - You are about to drop the column `swagBag` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `swagBagNumber` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "swagBag",
DROP COLUMN "swagBagNumber";

-- CreateTable
CREATE TABLE "SwagBag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "SwagBag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SwagBag" ADD CONSTRAINT "SwagBag_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
