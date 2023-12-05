ALTER TABLE "company" ALTER COLUMN "sponsor_category" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "website_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "website_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "booth_location" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "booth_location" DROP NOT NULL;