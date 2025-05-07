import dotenv from "dotenv";
dotenv.config();
import { Client, Events, GatewayIntentBits, messageLink } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: "Hello munchkin!",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});
client.login(process.env.BOT_TOKEN);
