import { readFileSync } from "fs";

export function retrieveBirthdaysFromCSV(date) {
  try {
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
  } catch (error) {
    console.error(
      `There was an error when trying to retrieve the birthdays from the CSV file, does the file exist?: ${error}`
    );
    throw error;
  }
}
