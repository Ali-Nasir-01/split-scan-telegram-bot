import { Markup, Scenes } from "telegraf";
import { useTelegramId } from "../utils";
import { createFriend, getFriendsByUserId } from "../models/friends";

const manageFriendsScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "manageFriendsScene"
);

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
  // wait for the user's response and save his friend name
  const friendName = async (responseCtx: Scenes.SceneContext) => {
    const friendName = responseCtx.message?.text;
    if (!friendName) {
      await responseCtx.reply(ctx.i18n.t("error:invalid_friend_name"));
      return;
    }

    return friendName;
  };

  const { name } = await createFriend(
    parseInt(telegramId),
    await friendName(ctx)
  );

  await ctx.reply(ctx.i18n.t("add_friend_success", { name }));

  //   await ctx.reply(ctx.i18n.t("add_friend_prompt_get_telegram_id"));

  //   const friendTelegramIdHandler = async (responseCtx: Scenes.SceneContext) => {
  //     const friendTelegramIdText = responseCtx.message?.text;
  //     const friendTelegramId = friendTelegramIdText
  //       ? parseInt(friendTelegramIdText)
  //       : NaN;
  //     if (isNaN(friendTelegramId)) {
  //       await responseCtx.reply(ctx.i18n.t("error:invalid_telegram_id"));
  //       return;
  //     }

  //     return friendTelegramId;
  //   }
});

export default manageFriendsScene;
