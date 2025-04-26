/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activationCode]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "activationCode" TEXT,
ADD COLUMN     "uuid" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_uuid_key" ON "Achievement"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_activationCode_key" ON "Achievement"("activationCode");
