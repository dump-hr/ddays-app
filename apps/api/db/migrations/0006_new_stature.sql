ALTER TABLE "event" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_theme" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_place" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "ends_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "requirements" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "footage_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "max_participants" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "code_id" DROP NOT NULL;