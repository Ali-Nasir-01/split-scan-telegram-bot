import { eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { users } from "../../db/index.ts";

export async function createUser(telegramId: string) {
  const id = await db.insert(users).values({ telegramId }).$returningId();
  return { id, telegramId };
}

export async function getUserByTelegramId(telegramId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.telegramId, telegramId))
    .execute();
  return user;
}

export async function getAllUsers() {
  return db.select().from(users).execute();
}

export async function updateUserLanguage(telegramId: string, language: string) {
  await db
    .update(users)
    .set({ language })
    .where(eq(users.telegramId, telegramId));
}
