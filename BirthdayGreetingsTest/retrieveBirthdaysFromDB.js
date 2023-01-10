import sqlite3 from "sqlite3";

const db = new sqlite3.Database("birthdays.db");

export function retrieveBirthdaysFromDB(date) {
  // Because we are using a database we could only retrieve the birthdays of the friends that have a birthday today so we don't have to filter the array like we did with the CSV
  date = date.split("/").slice(1).join("/"); // Remove the year from the date
  const friends = [];
  if (date === "02/28") {
    const leap = "02/29";
    return new Promise((resolve, reject) => {
      db.each(
        `SELECT last_name, first_name, date_of_birth, email FROM friends WHERE substr(date_of_birth, 6) = ? OR substr(date_of_birth, 6) = ?`, // Compare only the month and day part
        date,
        leap,
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            friends.push({
              lastName: row.last_name,
              firstName: row.first_name,
              dateOfBirth: row.date_of_birth,
              email: row.email,
            });
          }
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(friends);
          }
        }
      );
    });
  } else if (date === "02/29") {
    return [];
  } else {
    return new Promise((resolve, reject) => {
      let friends = [];
      db.each(
        `SELECT last_name, first_name, date_of_birth, email FROM friends WHERE substr(date_of_birth, 6) = ?`, // Compare only the month and day part
        date,
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            friends.push({
              lastName: row.last_name,
              firstName: row.first_name,
              dateOfBirth: row.date_of_birth,
              email: row.email,
            });
          }
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(friends);
          }
        }
      );
    });
  }
}
