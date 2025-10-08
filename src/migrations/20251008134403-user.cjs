"use strict";

exports.setup = function (options, seedLink) {};

exports.up = function (db, callback) {
  db.createTable(
    "users",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      telegram_id: { type: "bigint", unique: true, notNull: true },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("users", callback);
};
