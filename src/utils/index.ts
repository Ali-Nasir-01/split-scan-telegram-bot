import type { Context } from "telegraf";

export const useTelegramId = (ctx: Context) => {
  return ctx.from?.id.toString();
};
