import { relations } from "drizzle-orm";
import { users } from "./schema/users";
import { friends } from "./schema/friends";

export const usersRelations = relations(users, ({ many }) => ({
  friends: many(friends),
}));

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, { fields: [friends.userId], references: [users.id] }),
}));
