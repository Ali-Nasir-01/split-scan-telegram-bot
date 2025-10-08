import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const friends = mysqlTable("friends", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  telegramId: varchar("telegram_id", { length: 50 }),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
