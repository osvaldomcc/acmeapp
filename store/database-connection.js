import * as SQLite from "expo-sqlite";

// DB Connection
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};
