ALTER TABLE "company" RENAME COLUMN "email" TO "username";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "company_email_unique";--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_username_unique" UNIQUE("username");