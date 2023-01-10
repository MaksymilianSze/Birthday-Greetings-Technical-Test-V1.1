import { readFileSync } from "fs";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("birthdays.db");

function useEmailService(email, subject, body) {
  // TODO: Send email using email service
}

function useSMSService(phoneNumber, body) {
  // TODO: Send sms using sms service
}

function sendGreeting(birthdayFriends, service) {
  const subject = "Happy birthday!";
  for (const friend of birthdayFriends) {
    // Loop through the array of friends with a birthday and send an email to each friend
    const body = `Happy birthday, dear ${friend.firstName}!`;
    if (service === "email") {
      useEmailService(friend.email, subject, body);
      console.log(
        `Sending email to ${friend.email} with subject: ${subject} and body: ${body}`
      );
    } else if (service === "sms") {
      useSMSService(friend.phoneNumber, body);
      console.log(`Sending sms to ${friend.phoneNumber} with body: ${body}`); // The data provided doesn't have phone numbers but if it did it would be part of the friend object so for now it will be undefined
    }
  }
}

function retrieveBirthdaysFromCSV(date) {
  const birthdayFriends = readFileSync("birthdays.csv", "utf8")
    .split("\n")
    .slice(1)
    .map((row) => {
      const [lastName, firstName, dateOfBirth, email] = row
        .split(",")
        .map((s) => s.trim()); // Parse the csv and store it as an array of objects and remove the whites spaces with trim()
      return { lastName, firstName, dateOfBirth, email };
    });

  if (date.split("/").slice(1).join("/") === "02/28") {
    // Check if today is Feb 28th and if it is, check if any of the friends have a birthday on Feb 29th
    return birthdayFriends.filter((friend) => {
      return (
        friend.dateOfBirth.split("/").slice(1).join("/") === "02/29" ||
        friend.dateOfBirth.split("/").slice(1).join("/") === "02/28"
      );
    });
  } else if (date.split("/").slice(1).join("/") === "02/29") {
    return []; // If today is Feb 29th we don't want to send any greetings because then we would be sending a birthday greeting twice
  }
  return birthdayFriends.filter(
    (friend) =>
      friend.dateOfBirth.split("/").slice(1).join("/") ===
      date.split("/").slice(1).join("/")
  );
}

function retrieveBirthdaysFromDB(date) {
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

console.log(retrieveBirthdaysFromCSV("2000/02/28"));
console.log("\n");
console.log(await retrieveBirthdaysFromDB("2000/02/28"));
