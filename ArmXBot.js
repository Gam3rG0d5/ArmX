const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    presence: {
        status: 'invisible', // Sets the bot to appear offline but still functional
    },
});

// Use environment variables for sensitive data (set these in Railway)
const TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const YOUR_SERVER_ID = process.env.SERVER_ID || 'YOUR_SERVER_ID';

// Log when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} (ArmX)`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('/') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check if the command is used in your server
    const isInYourServer = message.guild && message.guild.id === YOUR_SERVER_ID;

    // Command handlers
    if (command === 'bspam') {
        if (isInYourServer) {
            message.channel.send('Sorry, I won’t spam in this server!');
            return;
        }
        // First phase: Simulate button spam (5 times)
        for (let i = 0; i < 5; i++) {
            await message.channel.send('Button spam!');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
        }
        // Send the bold join message
        await message.channel.send('# JOIN THE BEST SERVER ON DISCORD');
        // Second phase: Spam the server invite link (5 times)
        for (let i = 0; i < 5; i++) {
            await message.channel.send('https://discord.gg/5hfXexDfXF');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
        }
    } else if (command === 'funny') {
        // Do something funny for "capo"
        message.channel.send('Haha, Capo! Here’s a joke: Why did the scarecrow become a motivational speaker? Because he was outstanding in his field! 😂');
    } else if (command === 'gping') {
        // Ghost ping someone (send a ping and delete it)
        const target = message.mentions.users.first();
        if (target) {
            const pingMessage = await message.channel.send(`Hey ${target}!`);
            await pingMessage.delete();
        } else {
            message.channel.send('Please mention someone to ghost ping!');
        }
    } else if (command === 'say') {
        // Make the bot say something
        const text = args.join(' ');
        if (text) {
            message.channel.send(text);
        } else {
            message.channel.send('Please provide something for me to say!');
        }
    } else if (command === 'spam') {
        if (isInYourServer) {
            message.channel.send('Sorry, I won’t spam in this server!');
            return;
        }
        // Spam a message
        for (let i = 0; i < 5; i++) {
            await message.channel.send('Spam spam spam!');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
        }
    } else if (command === 'invite') {
        // Share the Discord invite link
        message.channel.send('Join the server here: https://discord.gg/5hfXexDfXF');
    } else if (command === 'crazy') {
        // Share a "crazy" GIF and message
        const gifMessage = `# JOIN THE BEST SERVER! 1000X BETTER THAN THIS SHIT SERVER ZOOM X THE KING SERVER\nhttps://media.discordapp.net/attachments/1295332109480890388/1295332888719527946/image0_1-1-1-1-1-1-1-3-1-1-1-1-1-1-1-1.gif?ex=68319fc2&is=68304e42&hm=474fe0d69161b1a97f812c3f710e1519a3fd037b806edd13420077b600382961&`;
        message.channel.send(gifMessage);
    } else if (command === 'raidmsg') {
        // Send a raid-style message with the invite link
        const raidMessage = `HELLO! JOIN OUR SERVER BECAUSE WE ARE A MILLION TIMES BETTER THAN YOU!!!\n**WE LOVE ArmX**\nJoin here: https://discord.gg/5hfXexDfXF`;
        message.channel.send(raidMessage);
    }
});

// Log in to Discord with your bot token
client.login(TOKEN);