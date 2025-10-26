import { Scenes } from "telegraf";
import { getUserByTelegramId } from "../models/users";
import { useTelegramId, makeKeyboard, type Context } from "../utils";

const mainMenuScene = new Scenes.BaseScene<Context>("mainMenuScene");

mainMenuScene.enter(async (ctx) => {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  const welcomeMessage = ctx.i18n.t("welcome_message");
  await ctx.reply(
    welcomeMessage,
    makeKeyboard(ctx, [["manage_friends"], ["scan_recipts"]])
  );
});

mainMenuScene.hears(/^(Manage Friends|مدیریت دوستان)$/, async (ctx) => {
  const telegramId = useTelegramId(ctx);
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  await ctx.scene.enter("manageFriendsScene");
});

mainMenuScene.hears(/^(Scan Receipts|اسکن رسیدها)$/, async (ctx) => {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  const user = await getUserByTelegramId(telegramId);
  const language = user[0]?.language || "en";

  await ctx.reply(ctx.i18n.t("scan_selected"));
});

export default mainMenuScene;
