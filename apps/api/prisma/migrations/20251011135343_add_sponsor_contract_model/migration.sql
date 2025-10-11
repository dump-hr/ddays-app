-- CreateTable
CREATE TABLE "public"."SponsorContract" (
    "id" SERIAL NOT NULL,
    "sponsorId" INTEGER NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "oib" TEXT,
    "companyRepresentative" TEXT,
    "companyRepresentativePosition" TEXT,
    "queryForCompanyData" BOOLEAN NOT NULL DEFAULT false,
    "generated" BOOLEAN NOT NULL DEFAULT false,
    "signedFromDUMP" BOOLEAN NOT NULL DEFAULT false,
    "contractSent" BOOLEAN NOT NULL DEFAULT false,
    "signedFromSponsor" BOOLEAN NOT NULL DEFAULT false,
    "billGenerated" BOOLEAN NOT NULL DEFAULT false,
    "billPayed" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SponsorContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SponsorContract_sponsorId_key" ON "public"."SponsorContract"("sponsorId");
