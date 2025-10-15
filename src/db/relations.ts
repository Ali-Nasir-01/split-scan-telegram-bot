import { relations } from "drizzle-orm";
import { users } from "./schema/users.js";
import { friends } from "./schema/friends.js";

export const usersRelations = relations(users, ({ many }) => ({
  friends: many(friends),
}));

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, { fields: [friends.userId], references: [users.id] }),
}));
