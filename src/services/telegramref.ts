import { Scenes, session, Telegraf } from "telegraf";

const botApi = new Telegraf<Scenes.SceneContext>(
  process.env.TELEGRAM_BOT_TOKEN as string
);

botApi.use(session());

export default botApi;
