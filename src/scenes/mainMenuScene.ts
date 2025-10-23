import { Markup, Scenes } from "telegraf";
import { getUserByTelegramId } from "../models/users";

const mainMenuScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "mainMenuScene"
);

mainMenuScene.enter(async (ctx) => {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  // const user = await getUserByTelegramId(telegramId);

  const buttons = [
    [Markup.button.callback(ctx.i18n.t("manage_friends"), "manage_friends")],
    [Markup.button.callback(ctx.i18n.t("scan_recipts"), "scan_receipts")],
  ];

  const welcomeMessage = ctx.i18n.t("welcome_message");

  await ctx.reply(welcomeMessage, Markup.inlineKeyboard(buttons));
});

mainMenuScene.action("manage_friends", async (ctx) => {
  await ctx.answerCbQuery();
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  // const user = await getUserByTelegramId(telegramId);

  const message = ctx.i18n.t("manage_friends_selected");

  await ctx.reply(message);

  await ctx.scene.enter("manageFriendsScene");
});

mainMenuScene.action("scan", async (ctx) => {
  await ctx.answerCbQuery();
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply("Error: Unable to retrieve user information.");
    return;
  }

  const user = await getUserByTelegramId(telegramId);
  const language = user[0]?.language || "en";

  const message =
    language === "fa"
      ? "شما گزینه اسکن را انتخاب کردید."
      : "You selected the Scan option.";

  await ctx.reply(message);
  // Here you can add logic to enter the scan scene
});

export default mainMenuScene;
