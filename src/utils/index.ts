import { Context as TelegrafContext, Markup, Scenes } from "telegraf";

interface I18nContext {
  i18n: {
    t(key: string, params?: { [key: string]: string }): string;
    locale(language: string): void;
  };
}

interface SceneContext {
  scene: Scenes.SceneContextScene<any>;
}

export type Context = TelegrafContext & I18nContext & SceneContext;

export const useTelegramId = (ctx: Context) => {
  return ctx.from?.id.toString();
};

interface IButtonKey {
  text: string;
  actionKey: string;
}

export const makeButtons = (ctx: Context, buttonKeys: IButtonKey[]) => {
  return buttonKeys.map((button) => [
    Markup.button.callback(ctx.i18n.t(button.text), button.actionKey),
  ]);
};

export const makeKeyboard = (ctx: Context, buttonKeys: string[][]) => {
  return Markup.keyboard(
    buttonKeys.map((row) => row.map((key) => ctx.i18n.t(key)))
  ).resize();
};
