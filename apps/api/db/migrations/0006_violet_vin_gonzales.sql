CREATE TABLE IF NOT EXISTS "speaker" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"title" text NOT NULL,
	"company_id" integer,
	"photo" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speaker_to_event" (
	"speaker_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	CONSTRAINT "speaker_to_event_speaker_id_event_id_pk" PRIMARY KEY("speaker_id","event_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speaker" ADD CONSTRAINT "speaker_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speaker_to_event" ADD CONSTRAINT "speaker_to_event_speaker_id_speaker_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "speaker"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speaker_to_event" ADD CONSTRAINT "speaker_to_event_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
