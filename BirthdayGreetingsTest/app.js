import { sendGreeting } from "./sendGreeting.js";
import { retrieveBirthdaysFromCSV } from "./retrieveBirthdaysFromCSV.js";
import { retrieveBirthdaysFromDB } from "./retrieveBirthdaysFromDB.js";

console.log(retrieveBirthdaysFromCSV("2000/02/28"));
console.log("\n");
console.log(await retrieveBirthdaysFromDB("2000/02/28"));

sendGreeting(retrieveBirthdaysFromCSV("2000/02/28"), "email");

sendGreeting(retrieveBirthdaysFromCSV("2000/02/28"), "sms");

sendGreeting(retrieveBirthdaysFromCSV("1997/02/12"), "email");

sendGreeting(retrieveBirthdaysFromCSV("1997/10/08"), "email");

sendGreeting(retrieveBirthdaysFromDB("1997/02/12"), "email");

sendGreeting(retrieveBirthdaysFromCSV("1902/12"), "email");

sendGreeting(retrieveBirthdaysFromCSV("1997/"), "email");
