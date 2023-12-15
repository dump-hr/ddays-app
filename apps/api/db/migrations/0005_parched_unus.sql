CREATE TABLE IF NOT EXISTS "interests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"theme" "event_theme" NOT NULL
);
