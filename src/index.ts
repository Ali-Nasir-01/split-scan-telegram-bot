import { createUser } from "./models/users";
import { stage } from "./scenes";
import i18n from "./services/i18n";
import botApi from "./services/telegramref";
import { makeKeyboard } from "./utils";

botApi.use(i18n.middleware());
botApi.use(stage.middleware());

botApi.start(async (ctx) => {
  const telegramId = ctx.from?.id;

  try {
    await createUser(telegramId.toString());
    await ctx.reply("Welcome! You have been registered.");
    await ctx.scene.enter("languageScene");
  } catch (error) {
    // If user already exists, just show language selection
    await ctx.scene.enter("languageScene");
  }
});

// Add error handling
botApi.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
  ctx
    .reply(ctx.i18n.t("error:unable_retrieve_user_information"))
    .catch(console.error);
});

botApi.launch({
  // Enable message deletion/editing
  dropPendingUpdates: true,
});

console.log("Bot is running...");

// Enable graceful stop
process.once("SIGINT", () => botApi.stop("SIGINT"));
process.once("SIGTERM", () => botApi.stop("SIGTERM"));
