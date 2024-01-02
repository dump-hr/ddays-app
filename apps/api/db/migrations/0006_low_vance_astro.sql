CREATE TABLE IF NOT EXISTS "companyInterests" (
	"companyId" integer NOT NULL,
	"interestId" integer NOT NULL,
	CONSTRAINT companyInterests_companyId_interestId_pk PRIMARY KEY("companyId","interestId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventInterests" (
	"eventId" integer NOT NULL,
	"interestId" integer NOT NULL,
	CONSTRAINT eventInterests_eventId_interestId_pk PRIMARY KEY("eventId","interestId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"theme" "event_theme" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_interestId_interests_id_fk" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventInterests" ADD CONSTRAINT "eventInterests_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventInterests" ADD CONSTRAINT "eventInterests_interestId_interests_id_fk" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
