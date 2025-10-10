/*
  Warnings:

  - The `logo` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `picture` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `description` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `video` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `advertisement` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `appCareer` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `campfire` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `flyTalks` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `swagBag` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `boothPlan` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `equipment` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `peopleForAccreditation` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `insertedIntoApp` column on the `SponsorMaterials` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."MaterialsCheckboxState" AS ENUM ('SUBMITTED', 'WILL_NOT_SUBMIT', 'NOT_SUBMITTED_YET');

-- AlterTable
ALTER TABLE "public"."SponsorMaterials" DROP COLUMN "logo",
ADD COLUMN     "logo" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "picture",
ADD COLUMN     "picture" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "description",
ADD COLUMN     "description" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "video",
ADD COLUMN     "video" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "advertisement",
ADD COLUMN     "advertisement" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "appCareer",
ADD COLUMN     "appCareer" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "campfire",
ADD COLUMN     "campfire" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "flyTalks",
ADD COLUMN     "flyTalks" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "swagBag",
ADD COLUMN     "swagBag" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "boothPlan",
ADD COLUMN     "boothPlan" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "equipment",
ADD COLUMN     "equipment" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "peopleForAccreditation",
ADD COLUMN     "peopleForAccreditation" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET',
DROP COLUMN "insertedIntoApp",
ADD COLUMN     "insertedIntoApp" "public"."MaterialsCheckboxState" NOT NULL DEFAULT 'NOT_SUBMITTED_YET';
