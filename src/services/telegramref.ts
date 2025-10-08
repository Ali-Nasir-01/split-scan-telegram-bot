import { Telegraf } from "telegraf";

const botApi = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);

export default botApi;
