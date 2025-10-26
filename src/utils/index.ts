import { Markup, type Context } from "telegraf";

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
