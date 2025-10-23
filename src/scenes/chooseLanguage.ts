import { Markup, Scenes } from "telegraf";
import { updateUserLanguage } from "../models/users";

const languageScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "languageScene"
);

languageScene.enter((ctx) => {
  ctx.reply(
    "Please select your language:",
    Markup.inlineKeyboard([
      [Markup.button.callback("🇺🇸 English", "lang_en")],
      [Markup.button.callback("🇮🇷 فارسی", "lang_fa")],
    ])
  );
});

languageScene.action("lang_en", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.session.language = "en";
  await updateUserLanguage(ctx.from.id.toString(), "en");
  ctx.i18n.locale("en");
  await ctx.reply(ctx.i18n.t("language_selected"));
  //   await ctx.scene.enter("mainMenuScene");
});

languageScene.action("lang_fa", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.session.language = "fa";
  ctx.i18n.locale("fa");
  await ctx.reply(ctx.i18n.t("language_selected"));
  //   await ctx.scene.enter("mainMenuScene");
});

export default languageScene;
