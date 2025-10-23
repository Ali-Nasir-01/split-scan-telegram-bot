// import { registerScanCommand } from "./commands/scan";
import { createUser } from "./models/users";
import { stage } from "./scenes";
import i18n from "./services/i18n";
import botApi from "./services/telegramref";

botApi.use(i18n.middleware());
botApi.use(stage.middleware());

botApi.start(async (ctx) => {
  const telegramId = ctx.from?.id;

  createUser(telegramId.toString()).then(async () => {
    await ctx.reply("Welcome! You have been registered.");
    await ctx.scene.enter("languageScene");
  });
});

// registerScanCommand();

botApi.launch();

console.log("Bot is running...");

// Enable graceful stop
process.once("SIGINT", () => botApi.stop("SIGINT"));
process.once("SIGTERM", () => botApi.stop("SIGTERM"));
