import { REST, Routes } from 'discord.js';
import 'dotenv/config'; 
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1369549865771597894"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }