/*
  Warnings:

  - Added the required column `subtitle` to the `RatingQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingQuestion" ADD COLUMN     "subtitle" TEXT NOT NULL;
