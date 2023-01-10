function useEmailService(email, subject, body) {
  // TODO: Send email using email service
}

function useSMSService(phoneNumber, body) {
  // TODO: Send sms using sms service
}

export function sendGreeting(birthdayFriends, service) {
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
