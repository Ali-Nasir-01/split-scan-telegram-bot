import TelegrafI18n from "telegraf-i18n";

const i18n = new TelegrafI18n({
  defaultLanguage: "fa",
  allowMissing: true,
  directory: "src/locales",
  useSession: true,
  sessionName: "session",
});

export default i18n;
