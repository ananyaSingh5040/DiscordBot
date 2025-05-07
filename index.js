import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { Client, Events, GatewayIntentBits, messageLink } from "discord.js";

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
    if (!url) message.reply({ content: "Provide a url :')" });
    await message.reply({
      content: "Generating a short ID for " + url,
    });
  } else {
    message.reply({
      content: "Hello munchkin!",
    });
  }
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});
client.login(process.env.BOT_TOKEN);
