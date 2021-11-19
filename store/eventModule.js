import { DatabaseConnection } from "./database-connection";

const db = DatabaseConnection.getConnection();

//Initialize the DB and create the tables
export const createEventTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='events'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS events", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS events(event_id INTEGER PRIMARY KEY AUTOINCREMENT, calendar_id VARCHAR(100))",
              []
            );
          }
          resolve();
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};

//Create a new event
export const createEventDB = (calendar_id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO events (calendar_id) VALUES (?)",
        [calendar_id],
        (tx, res) => {
          if (res.rowsAffected > 0) {
            resolve();
          }
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};

//Fetch all the events
export const getAllEvents = () => {
  return new Promise((resolve, reject) => {
    const result = [];
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM events",
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; i++) {
            let item = res.rows.item(i);
            result.push(item);
          }
          resolve(result);
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};

//Remove Everything from events
export const deleteAllFromEvents = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM events",
        [],
        (tx, res) => {
          if (res.rowsAffected > 0) {
            resolve();
          }
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};
