// import { registerScanCommand } from "./commands/scan";
import { createUser } from "./models/users";
import botApi from "./services/telegramref";

botApi.start((ctx) => {
  const telegramId = ctx.from?.id;

  createUser(telegramId.toString()).then(() => {
    ctx.reply("Welcome! You have been registered.");
  });
});

// registerScanCommand();

botApi.launch();

console.log("Bot is running...");

// Enable graceful stop
process.once("SIGINT", () => botApi.stop("SIGINT"));
process.once("SIGTERM", () => botApi.stop("SIGTERM"));
