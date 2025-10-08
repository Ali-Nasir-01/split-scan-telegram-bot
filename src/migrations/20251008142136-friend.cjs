"use strict";

exports.setup = function (options, seedLink) {};

exports.up = function (db, callback) {
  db.createTable(
    "friends",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      name: { type: "string", length: 255, notNull: true },
      telegram_id: { type: "bigint" },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "friends_user_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
        },
      },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("friends", callback);
};
