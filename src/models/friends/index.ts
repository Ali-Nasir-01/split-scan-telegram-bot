import { db } from "../../db/client.js";
import { friends } from "../../db/schema/friends.js";
import { eq } from "drizzle-orm";

export async function createFriend(
  userId: number,
  name: string,
  telegramId?: string
) {
  const id = await db
    .insert(friends)
    .values({
      userId,
      name,
      telegramId: telegramId ?? null,
    })
    .$returningId();

  return { id, userId, name, telegramId: telegramId ?? null };
}

export async function updateFriend(
  id: number,
  data: { name?: string; telegramId?: string }
) {
  await db
    .update(friends)
    .set({
      ...(data.name && { name: data.name }),
      ...(data.telegramId && { telegramId: data.telegramId }),
    })
    .where(eq(friends.id, id))
    .execute();

  return getFriendById(id);
}

export async function deleteFriend(id: number) {
  await db.delete(friends).where(eq(friends.id, id)).execute();
  return { success: true };
}

export async function getFriendById(id: number) {
  const result = await db
    .select()
    .from(friends)
    .where(eq(friends.id, id))
    .execute();
  return result[0] ?? null;
}

export async function getFriendsByUserId(userId: number) {
  const result = await db
    .select()
    .from(friends)
    .where(eq(friends.userId, userId))
    .execute();
  return result;
}
