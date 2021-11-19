import moment from "moment";
import { DatabaseConnection } from "./database-connection";

//intance of database
const db = DatabaseConnection.getConnection();

//Initialize the DB and create the tables
export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tickets'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS tickets", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS tickets(ticket_id INTEGER PRIMARY KEY AUTOINCREMENT, client_name VARCHAR(100), address VARCHAR(200), date VARCHAR(100))",
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

//Create a new ticket
export const createTicketDB = (client_name, address, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tickets (client_name, address, date) VALUES (?,?,?)",
        [client_name, address, date],
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

//Fetch all the tickets
export const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    const result = [];
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tickets",
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

//Get ticket by ID
export const getTicketById = (id) => {
  return new Promise((resolve, reject) => {
    let item;
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tickets WHERE ticket_id=?",
        [id],
        (tx, res) => {
          item = res.rows.item(0);
          resolve(item);
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};

//Update Ticket
export const updateTicketDB = (id, client_name, address, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tickets SET client_name=?, address=?, date=? WHERE ticket_id=?",
        [client_name, address, date, id],
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

//Delete Ticket
export const deleteTicket = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tickets WHERE ticket_id=?",
        [id],
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

//Get the last ticket added
export const lastTicketAdded = () => {
  return new Promise((resolve, reject) => {
    let result;
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tickets ORDER BY ticket_id DESC LIMIT 1",
        [],
        (tx, res) => {
          result = res.rows.item(0);
          resolve(result);
        },
        (error) => {
          resolve(console.log(`someting wrong ${error}`));
        }
      );
    });
  });
};

//Fetch all the tickets
export const getAllTicketsDue = () => {
  return new Promise((resolve, reject) => {
    const result = [];
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tickets WHERE date >= ${moment().format("Y-M-D")}
         UNION
         SELECT * FROM tickets WHERE date <= ${moment()
           .add(5, "day")
           .format("Y-M-D")}
        `,
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

//Function to get all tickets that are going to due
//and give them the format of event to populate the calendar
export const getEventsDB = async () => {
  const result = [];
  await getAllTicketsDue().then((res) => {
    res.forEach((element) => {
      result.push({
        title: element.client_name,
        start: moment(element.date).toDate(),
        end: moment(element.date).add(3, "hour").toDate(),
      });
    });
  });
  return result;
};
