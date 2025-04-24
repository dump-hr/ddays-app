-- DropIndex
DROP INDEX "User_email_isDeleted_key";

-- DropIndex
DROP INDEX "User_phoneNumber_isDeleted_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isDeleted" DROP DEFAULT;
