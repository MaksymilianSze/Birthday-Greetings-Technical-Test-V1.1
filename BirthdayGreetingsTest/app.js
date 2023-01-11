import { sendGreeting } from "./sendGreeting.js";
import { retrieveBirthdaysFromCSV } from "./retrieveBirthdaysFromCSV.js";
import { retrieveBirthdaysFromDB } from "./retrieveBirthdaysFromDB.js";

sendGreeting(retrieveBirthdaysFromCSV("2000-02-28"), "email"); // Should find 2 friends and send greetings to both via email

sendGreeting(retrieveBirthdaysFromCSV("2000-02-28"), "sms"); // Should find 2 friends and send greetings to both via sms

sendGreeting(retrieveBirthdaysFromCSV("1997-02-12"), "email"); // Should find no friends and throw an error

sendGreeting(retrieveBirthdaysFromCSV("1997-10-08"), "email"); // Should find 1 friend and send a greeting to them via email

sendGreeting(await retrieveBirthdaysFromDB("1999-02-12"), "email"); // Should find no friends and throw an error

sendGreeting(await retrieveBirthdaysFromDB("1999-09-11"), "email"); // Should find 1 friend and send a greeting to them via email

sendGreeting(retrieveBirthdaysFromCSV("1902-12"), "email"); // Should throw an error because date is in the wrong format

sendGreeting(retrieveBirthdaysFromCSV("seg45747"), "email"); // Should throw an error because this isn't a date

sendGreeting(await retrieveBirthdaysFromDB("2022-02-29"), "email"); // Should throw an error because 2022 wasn't a leap year

sendGreeting(await retrieveBirthdaysFromDB("2020-02-28"), "email"); // Should find 2 friends and send greetings to both via email
