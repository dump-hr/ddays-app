CREATE TABLE IF NOT EXISTS "frequentlyAskedQuestion" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar(255) NOT NULL,
	"answer" varchar(255) NOT NULL
);
