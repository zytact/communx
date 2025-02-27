CREATE TABLE "user_communities" (
	"user_id" text NOT NULL,
	"community_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_communities_user_id_community_id_pk" PRIMARY KEY("user_id","community_id")
);
--> statement-breakpoint
CREATE TABLE "user_events" (
	"user_id" text NOT NULL,
	"event_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'interested' NOT NULL,
	CONSTRAINT "user_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "user_shows" (
	"user_id" text NOT NULL,
	"show_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'interested' NOT NULL,
	CONSTRAINT "user_shows_user_id_show_id_pk" PRIMARY KEY("user_id","show_id")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_communities" ADD CONSTRAINT "user_communities_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_communities" ADD CONSTRAINT "user_communities_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_shows" ADD CONSTRAINT "user_shows_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_shows" ADD CONSTRAINT "user_shows_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;