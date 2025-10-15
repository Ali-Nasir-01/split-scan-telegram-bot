import { Markup, Scenes } from "telegraf";
import { getUserByTelegramId } from "../models/users";

const mainMenuScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "mainMenuScene"
);

mainMenuScene.enter(async (ctx) => {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    await ctx.reply("Error: Unable to retrieve user information.");
    return;
  }

  const user = await getUserByTelegramId(telegramId);
  const language = user[0]?.language || "en";

  const buttons =
    language === "fa"
      ? [
          [Markup.button.callback("مدیریت دوستان", "manage_friends")],
          [Markup.button.callback("اسکن", "scan")],
        ]
      : [
          [Markup.button.callback("Manage Friends", "manage_friends")],
          [Markup.button.callback("Scan", "scan")],
        ];

  const welcomeMessage =
    language === "fa"
      ? "به منوی اصلی خوش آمدید! لطفاً یک گزینه را انتخاب کنید:"
      : "Welcome to the main menu! Please choose an option:";

  await ctx.reply(welcomeMessage, Markup.keyboard(buttons).resize());
});

mainMenuScene.action("manage_friends", async (ctx) => {
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
      ? "شما گزینه مدیریت دوستان را انتخاب کردید."
      : "You selected the Manage Friends option.";

  await ctx.reply(message);
  // Here you can add logic to enter the manage friends scene
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
