ALTER TABLE "company" RENAME COLUMN "official_email" TO "email";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "company_official_email_unique";--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_email_unique" UNIQUE("email");