import { Markup, Scenes } from "telegraf";
import { makeButtons, useTelegramId } from "../utils";
import { createFriend, getFriendsByUserId } from "../models/friends";

interface SceneState {
  waitingForFriendName: boolean;
}

interface I18nContext {
  i18n: {
    t(key: string, params?: { [key: string]: string }): string;
  };
}

const manageFriendsScene = new Scenes.BaseScene<
  Scenes.SceneContext & I18nContext & { scene: { state: SceneState } }
>("manageFriendsScene");

manageFriendsScene.enter(async (ctx) => {
  const message = ctx.i18n.t("manage_friends_welcome");
  await ctx.reply(message);

  const buttons = [
    [Markup.button.callback(ctx.i18n.t("list_friends"), "list_friends")],
    [Markup.button.callback(ctx.i18n.t("add_friend"), "add_friend")],
    [Markup.button.callback(ctx.i18n.t("remove_friend"), "remove_friend")],
    [
      Markup.button.callback(
        ctx.i18n.t("back_to_main_menu"),
        "back_to_main_menu"
      ),
    ],
  ];

  await ctx.reply(
    ctx.i18n.t("manage_friends_options"),
    Markup.inlineKeyboard(buttons)
  );
});

manageFriendsScene.action("back_to_main_menu", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.scene.enter("mainMenuScene");
});

manageFriendsScene.action("list_friends", async (ctx) => {
  await ctx.answerCbQuery();
  const telegramId = useTelegramId(ctx);
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  const friends = await getFriendsByUserId(parseInt(telegramId));

  if (friends.length === 0) {
    await ctx.reply(ctx.i18n.t("no_friends_found"));
    return;
  }
  let friendsList = ctx.i18n.t("your_friends") + ":\n\n";
  friends.forEach((friend, index) => {
    friendsList += `${index + 1}. ${friend.name}\n`;
  });

  await ctx.reply(friendsList);
});

manageFriendsScene.action("add_friend", async (ctx) => {
  await ctx.answerCbQuery();

  const telegramId = useTelegramId(ctx);
  if (!telegramId) {
    await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
    return;
  }

  await ctx.reply(ctx.i18n.t("add_friend_prompt_name"));
  ctx.scene.state.waitingForFriendName = true;
});

manageFriendsScene.on("text", async (ctx) => {
  if (ctx.scene.state.waitingForFriendName) {
    const name = ctx.message.text || "Unnamed Friend";
    const telegramId = useTelegramId(ctx);

    if (!telegramId) {
      await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
      return;
    }

    await createFriend(parseInt(telegramId), name);
    await ctx.reply(ctx.i18n.t("add_friend_success", { name }));

    ctx.scene.state.waitingForFriendName = false;

    const buttons = makeButtons(ctx, [
      { text: "list_friends", actionKey: "list_friends" },
      { text: "add_friend", actionKey: "add_friend" },
      { text: "remove_friend", actionKey: "remove_friend" },
      { text: "back_to_main_menu", actionKey: "back_to_main_menu" },
    ]);

    await ctx.reply(
      ctx.i18n.t("manage_friends_options"),
      Markup.inlineKeyboard(buttons)
    );
  }
});

export default manageFriendsScene;
