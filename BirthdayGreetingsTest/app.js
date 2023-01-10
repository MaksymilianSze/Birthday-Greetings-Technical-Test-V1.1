import { sendGreeting } from "./sendGreeting.js";
import { retrieveBirthdaysFromCSV } from "./retrieveBirthdaysFromCSV.js";
import { retrieveBirthdaysFromDB } from "./retrieveBirthdaysFromDB.js";

console.log(retrieveBirthdaysFromCSV("2000/02/28"));
console.log("\n");
console.log(await retrieveBirthdaysFromDB("2000/02/28"));

sendGreeting(retrieveBirthdaysFromCSV("2000/02/28"), "email");
