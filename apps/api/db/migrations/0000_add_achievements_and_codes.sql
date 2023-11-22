CREATE TABLE IF NOT EXISTS "achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"fulfillmentCodeCount" integer NOT NULL,
	"isHidden" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievementToCode" (
	"achievementId" integer NOT NULL,
	"codeId" integer NOT NULL,
	CONSTRAINT achievementToCode_achievementId_codeId PRIMARY KEY("achievementId","codeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(10) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"isActive" boolean DEFAULT true,
	"isSingleUse" boolean DEFAULT false,
	"hasPage" boolean DEFAULT false,
	"expirationDate" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_achievementId_achievement_id_fk" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_codeId_code_id_fk" FOREIGN KEY ("codeId") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
