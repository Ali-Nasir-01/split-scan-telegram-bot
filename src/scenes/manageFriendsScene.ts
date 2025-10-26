import { Scenes } from "telegraf";
import { makeKeyboard, useTelegramId, type Context } from "../utils";
import { createFriend, getFriendsByUserId } from "../models/friends";

interface SceneState {
  waitingForFriendName: boolean;
}

const manageFriendsScene = new Scenes.BaseScene<
  Context & { scene: { state: SceneState } }
>("manageFriendsScene");

manageFriendsScene.enter(async (ctx) => {
  const message = ctx.i18n.t("manage_friends_welcome");
  await ctx.reply(message);

  await ctx.reply(
    ctx.i18n.t("manage_friends_options"),
    makeKeyboard(ctx, [
      ["list_friends"],
      ["add_friend"],
      ["remove_friend"],
      ["back_to_main_menu"],
    ])
  );
});

manageFriendsScene.hears(
  /^(Back to Main Menu|بازگشت به منوی اصلی)$/,
  async (ctx) => {
    await ctx.scene.enter("mainMenuScene");
  }
);

manageFriendsScene.hears(/^(List Friends|لیست دوستان)$/, async (ctx) => {
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

manageFriendsScene.hears(/^(Add Friend|افزودن دوست)$/, async (ctx) => {
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
    const name = ctx.message.text;
    const telegramId = useTelegramId(ctx);

    if (!telegramId) {
      await ctx.reply(ctx.i18n.t("error:unable_retrieve_user_information"));
      return;
    }

    await createFriend(parseInt(telegramId), name);
    await ctx.reply(ctx.i18n.t("add_friend_success", { name }));
    ctx.scene.state.waitingForFriendName = false;

    // Return to main friend management menu
    await ctx.reply(
      ctx.i18n.t("manage_friends_options"),
      makeKeyboard(ctx, [
        ["list_friends"],
        ["add_friend"],
        ["remove_friend"],
        ["back_to_main_menu"],
      ])
    );
  }
});

export default manageFriendsScene;
