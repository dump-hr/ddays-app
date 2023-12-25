ALTER TABLE "company" ADD COLUMN "official_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "logo_image" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "landing_image" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "company_video" text;--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_official_email_unique" UNIQUE("official_email");