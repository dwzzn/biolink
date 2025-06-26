document.querySelector('.toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
const discordId = "1032063009310396487"; // REPLACE WITH YOUR DISCORD ID 
const statusElement = document.getElementById("discord-status");

const statusEmoji = {
  online: "online",
  idle: "afk",
  dnd: "dnd",
  offline: "off",
};

async function fetchDiscordStatus() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    const data = await res.json();

    if (!data.success) {
      throw new Error("You're not being tracked by Lanyard");
    }

    const status = data.data.discord_status;
    const emoji = statusEmoji[status] || "?";
    statusElement.textContent = `${emoji} Discord status: ${status.toUpperCase()}`;
  } catch (err) {
    console.error("Error fetching Discord status:", err);
    statusElement.textContent = "couldnt load discord status";
  }
}

// 15s not 15k
fetchDiscordStatus();
setInterval(fetchDiscordStatus, 15000);

