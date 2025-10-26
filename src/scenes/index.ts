import { Scenes } from "telegraf";
import languageScene from "./chooseLanguage";
import mainMenuScene from "./mainMenuScene";
import manageFriendsScene from "./manageFriendsScene";

export const stage = new Scenes.Stage([
  languageScene,
  mainMenuScene,
  manageFriendsScene,
]);
