import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

import {
  Client,
  Events,
  GatewayIntentBits,
  messageLink,
  EmbedBuilder,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create ")[1];
    if (!url) {
      message.reply({ content: "Provide a url :')" });
      return;
    }
    try {
      const response = await axios.post(
        "https://shorturl-production-62bf.up.railway.app/url",
        { url: url },
        {
          headers: {
            Authorization: `Bearer ${process.env.DISCORD_BOT_JWT}`,
            "User-Agent": "Discordbot",
          },
        }
      );
      const shortUrl = response.data.shortUrl;
      const embed = new EmbedBuilder()
        .setTitle("Redirection URL Created")
        .setDescription("Here's your new link!")
        .addFields({ name: "Link", value: shortUrl })
        .setColor("Random");
      return message.reply({
        content: "Redirection URL created successfully!",
        embeds: [embed],
      });
    } catch (err) {
      console.error(err.message);
      return message.reply({
        content: "Something went wrong while generating your redirection URL :') ",
      });
    }
  } else if (message.content.startsWith("spill")) {
    message.reply({ content: "**Here's what I can do for you:**\n\n" +
             "🔗 **Generate URL's** – Get a redirection/short URL for any link just type  **'create <your-url>'** .\n" +
             "🎁 **Ping-Pong** – I can pong you with simple  **'/ping'** .\n" +
             "*More features coming soon, bestie!*✨" });
  } else {
    message.reply({
      content: "Hello munchkin!\n *Type 'spill' to know what things I can do!*",
    });
  }
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});
client.login(process.env.BOT_TOKEN);
