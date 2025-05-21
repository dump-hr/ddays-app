/*
  Warnings:

  - You are about to drop the column `grades` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `ratingQuestionId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RatingQuestionType" AS ENUM ('BOOTH', 'EVENT');

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "grades",
ADD COLUMN     "ratingQuestionId" INTEGER NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "RatingQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" "RatingQuestionType" NOT NULL,

    CONSTRAINT "RatingQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ratingQuestionId_fkey" FOREIGN KEY ("ratingQuestionId") REFERENCES "RatingQuestion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
