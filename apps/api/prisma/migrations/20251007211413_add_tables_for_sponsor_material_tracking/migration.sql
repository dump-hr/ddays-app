-- CreateEnum
CREATE TYPE "public"."Tier" AS ENUM ('DEFAULT', 'BRONZE', 'SILVER', 'GOLD');

-- CreateEnum
CREATE TYPE "public"."SponsorStatus" AS ENUM ('DID_NOT_CONTACT', 'DISCARDED', 'ZERO_PING', 'FIRST_PING', 'SECOND_PING', 'MEETING_DONE', 'INTERESTED', 'FOLLOW_UP', 'AGREED');

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "boothPlan" TEXT,
ADD COLUMN     "campfireParticipation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "campfireSpeakers" TEXT[],
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "notes" TEXT[],
ADD COLUMN     "peopleForAccreditation" TEXT[],
ADD COLUMN     "swagBag" TEXT,
ADD COLUMN     "swagBagNumber" INTEGER;

-- CreateTable
CREATE TABLE "public"."PotentialSponsor" (
    "id" SERIAL NOT NULL,
    "tier" "public"."Tier" NOT NULL DEFAULT 'DEFAULT',
    "company" TEXT NOT NULL,
    "email" TEXT,
    "representative" TEXT NOT NULL DEFAULT '',
    "comment" TEXT,
    "status" "public"."SponsorStatus" NOT NULL DEFAULT 'DID_NOT_CONTACT',
    "notes" TEXT,

    CONSTRAINT "PotentialSponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SponsorMaterials" (
    "id" SERIAL NOT NULL,
    "sponsorId" INTEGER NOT NULL,
    "logo" BOOLEAN NOT NULL DEFAULT false,
    "picture" BOOLEAN NOT NULL DEFAULT false,
    "description" BOOLEAN NOT NULL DEFAULT false,
    "video" BOOLEAN NOT NULL DEFAULT false,
    "advertisement" BOOLEAN NOT NULL DEFAULT false,
    "appCareer" BOOLEAN NOT NULL DEFAULT false,
    "campfire" BOOLEAN NOT NULL DEFAULT false,
    "flyTalks" BOOLEAN NOT NULL DEFAULT false,
    "swagBag" BOOLEAN NOT NULL DEFAULT false,
    "boothPlan" BOOLEAN NOT NULL DEFAULT false,
    "equipment" BOOLEAN NOT NULL DEFAULT false,
    "peopleForAccreditation" BOOLEAN NOT NULL DEFAULT false,
    "insertedIntoApp" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "SponsorMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PotentialSponsor_company_key" ON "public"."PotentialSponsor"("company");

-- AddForeignKey
ALTER TABLE "public"."SponsorMaterials" ADD CONSTRAINT "SponsorMaterials_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "public"."PotentialSponsor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
