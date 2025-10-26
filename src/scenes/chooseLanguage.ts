import { Scenes } from "telegraf";
import { updateUserLanguage } from "../models/users";
import { makeKeyboard, type Context } from "../utils";

interface SessionData {
  language?: string;
}

const languageScene = new Scenes.BaseScene<
  Context & { scene: { state: SessionData } }
>("languageScene");

languageScene.enter((ctx) => {
  return ctx.reply(
    "Please select your language:",
    makeKeyboard(ctx, [["🇺🇸 English"], ["🇮🇷 فارسی"]])
  );
});

languageScene.hears("🇺🇸 English", async (ctx) => {
  ctx.scene.state.language = "en";
  await updateUserLanguage(ctx.from.id.toString(), "en");
  ctx.i18n.locale("en");
  await ctx.reply(ctx.i18n.t("language_selected"));
  await ctx.scene.enter("mainMenuScene");
});

languageScene.hears("🇮🇷 فارسی", async (ctx) => {
  ctx.scene.state.language = "fa";
  await updateUserLanguage(ctx.from.id.toString(), "fa");
  ctx.i18n.locale("fa");
  await ctx.reply(ctx.i18n.t("language_selected"));
  await ctx.scene.enter("mainMenuScene");
});

export default languageScene;
