/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "uuid" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_uuid_key" ON "Achievement"("uuid");
