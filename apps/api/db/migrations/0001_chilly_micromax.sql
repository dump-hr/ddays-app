ALTER TABLE "companyInterests" DROP CONSTRAINT "companyInterests_companyId_company_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
