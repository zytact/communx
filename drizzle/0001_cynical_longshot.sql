CREATE TABLE "shows" (
	"id" serial PRIMARY KEY NOT NULL,
	"community_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"image_url" text,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;