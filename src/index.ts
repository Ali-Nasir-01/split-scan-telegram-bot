import { registerScanCommand } from "./commands/scan";
import botApi from "./services/telegramref";

botApi.start((ctx) =>
  ctx.reply("Welcome! Send me a message and I'll echo it back.")
);

registerScanCommand();

botApi.launch();

console.log("Bot is running...");

// Enable graceful stop
process.once("SIGINT", () => botApi.stop("SIGINT"));
process.once("SIGTERM", () => botApi.stop("SIGTERM"));
