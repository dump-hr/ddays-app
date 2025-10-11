-- AddForeignKey
ALTER TABLE "public"."SponsorContract" ADD CONSTRAINT "SponsorContract_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "public"."PotentialSponsor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
