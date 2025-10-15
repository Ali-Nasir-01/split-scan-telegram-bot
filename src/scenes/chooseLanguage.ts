import { Markup, Scenes } from "telegraf";
import { updateUserLanguage } from "../models/users";

const languageScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "languageScene"
);

languageScene.enter((ctx) => {
  ctx.reply(
    "Please select your language:",
    Markup.keyboard([
      [Markup.button.callback("🇺🇸 English", "lang_en")],
      [Markup.button.callback("🇮🇷 فارسی", "lang_fa")],
    ])
  );
});

languageScene.action("lang_en", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.session.language = "en";
  await updateUserLanguage(ctx.from.id.toString(), "en");
  await ctx.reply("Language set to English.");
  //   await ctx.scene.enter("mainMenuScene");
});

languageScene.action("lang_fa", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.session.language = "fa";
  await ctx.reply("زبان شما فارسی تنظیم شد.");
  //   await ctx.scene.enter("mainMenuScene");
});

export default languageScene;
