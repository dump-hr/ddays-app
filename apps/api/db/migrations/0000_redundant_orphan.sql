CREATE TABLE IF NOT EXISTS "achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"fulfillment_code_count" integer NOT NULL,
	"is_hidden" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievementToCode" (
	"achievement_id" integer NOT NULL,
	"code_id" integer NOT NULL,
	CONSTRAINT achievementToCode_achievement_id_code_id PRIMARY KEY("achievement_id","code_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(10) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"is_single_use" boolean DEFAULT false,
	"has_page" boolean DEFAULT false,
	"expiration_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
