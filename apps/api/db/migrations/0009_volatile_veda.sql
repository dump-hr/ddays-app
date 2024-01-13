DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
