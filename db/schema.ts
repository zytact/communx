import { relations } from 'drizzle-orm';
import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    boolean,
    primaryKey,
} from 'drizzle-orm/pg-core';

// Communities table
export const communities = pgTable('communities', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    imageUrl: text('image_url'),
    city: varchar('city', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts table
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    communityId: integer('community_id')
        .references(() => communities.id, { onDelete: 'cascade' })
        .notNull(),
    userId: text('user_id')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: text('content').notNull(),
    mediaUrl: text('media_url'), // URL to post media (image, video, etc.)
    likes: integer('likes').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Comments table
export const comments = pgTable('comments', {
    id: serial('id').primaryKey(),
    postId: integer('post_id')
        .references(() => posts.id, { onDelete: 'cascade' })
        .notNull(),
    userId: text('user_id')
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    content: text('content').notNull(),
    likes: integer('likes').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Events table
export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    communityId: integer('community_id')
        .references(() => communities.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    eventDate: timestamp('event_date').notNull(),
    address: text('address').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Shows table
export const shows = pgTable('shows', {
    id: serial('id').primaryKey(),
    communityId: integer('community_id')
        .references(() => communities.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    imageUrl: text('image_url'),
    address: text('address').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
});

// User-Community join table
export const userCommunities = pgTable(
    'user_communities',
    {
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        communityId: integer('community_id')
            .notNull()
            .references(() => communities.id, { onDelete: 'cascade' }),
        joinedAt: timestamp('joined_at').defaultNow().notNull(),
        isAdmin: boolean('is_admin').default(false).notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.communityId] }),
        };
    }
);

// User-Event join table
export const userEvents = pgTable(
    'user_events',
    {
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        eventId: integer('event_id')
            .notNull()
            .references(() => events.id, { onDelete: 'cascade' }),
        joinedAt: timestamp('joined_at').defaultNow().notNull(),
        status: varchar('status', { length: 20 })
            .default('interested')
            .notNull(), // interested, going, not_going
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.eventId] }),
        };
    }
);

// User-Show join table
export const userShows = pgTable(
    'user_shows',
    {
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        showId: integer('show_id')
            .notNull()
            .references(() => shows.id, { onDelete: 'cascade' }),
        joinedAt: timestamp('joined_at').defaultNow().notNull(),
        status: varchar('status', { length: 20 })
            .default('interested')
            .notNull(), // interested, going, not_going
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.showId] }),
        };
    }
);

// Relations
export const communitiesRelations = relations(communities, ({ many }) => ({
    posts: many(posts),
    events: many(events),
    shows: many(shows),
    userCommunities: many(userCommunities),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
    community: one(communities, {
        fields: [posts.communityId],
        references: [communities.id],
    }),
    user: one(user, {
        fields: [posts.userId],
        references: [user.id],
    }),
    comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id],
    }),
    user: one(user, {
        fields: [comments.userId],
        references: [user.id],
    }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
    community: one(communities, {
        fields: [events.communityId],
        references: [communities.id],
    }),
    userEvents: many(userEvents),
}));

export const showsRelations = relations(shows, ({ one, many }) => ({
    community: one(communities, {
        fields: [shows.communityId],
        references: [communities.id],
    }),
    userShows: many(userShows),
}));

export const userRelations = relations(user, ({ many }) => ({
    posts: many(posts),
    comments: many(comments),
    userCommunities: many(userCommunities),
    userEvents: many(userEvents),
    userShows: many(userShows),
}));

// Relations for join tables
export const userCommunitiesRelations = relations(
    userCommunities,
    ({ one }) => ({
        user: one(user, {
            fields: [userCommunities.userId],
            references: [user.id],
        }),
        community: one(communities, {
            fields: [userCommunities.communityId],
            references: [communities.id],
        }),
    })
);

export const userEventsRelations = relations(userEvents, ({ one }) => ({
    user: one(user, {
        fields: [userEvents.userId],
        references: [user.id],
    }),
    event: one(events, {
        fields: [userEvents.eventId],
        references: [events.id],
    }),
}));

export const userShowsRelations = relations(userShows, ({ one }) => ({
    user: one(user, {
        fields: [userShows.userId],
        references: [user.id],
    }),
    show: one(shows, {
        fields: [userShows.showId],
        references: [shows.id],
    }),
}));
