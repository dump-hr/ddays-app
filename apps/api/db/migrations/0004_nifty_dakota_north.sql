CREATE TABLE IF NOT EXISTS "frequentlyAskedQuestion" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL
);