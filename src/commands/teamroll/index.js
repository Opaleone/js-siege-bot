const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('teamroll')
      .setDescription('Random roll for unbiased teams in custom 5v5 matches')
      .addStringOption(option => {
        return option
          .setName('players')
          .setDescription('Add up to 10 players seperated by a comma for each')
      }),
  async execute(interaction) {
    try {
      if (config.debug.status) {
        if (!config.debug.channels.includes(interaction.channelId)) {
          return await interaction.reply({ content: "Currently testing bot. Try again later!", ephemeral: true });
        }
      }

      const players = interaction.options.getString('players').split(',') ?? null;

      if (players === null) {
        return await interaction.reply("Must include names for players to sort!")
      }

      const maps = ['Kafe Dostoyevsky', 'Chalet', 'Kanal', 'Clubhouse', 'Bank',
      'Border', 'Consulate', 'Coastline', 'Oregon', 'Outback', 'Theme Park', 'Villa', "Nighthaven Labs", "Lair", "Emerald Plains"]

      const mapRandNum = Math.floor(Math.random() * maps.length);

      let i = 0;

      let teamBlue = [];
      let teamOrange = [];

      while (players.length > 0) {
        const randNum = Math.floor(Math.random() * players.length);
        if (i % 2 === 0) {
          teamBlue.push(players[randNum])
          players.splice(randNum, 1)
        } else {
          teamOrange.push(players[randNum])
          players.splice(randNum, 1)
        }
      }

      let teamBlueStr = '';
      let teamOrgStr = '';

      for (let i = 0; i < teamBlue.length; i++) {
        teamBlueStr += teamBlue[i];
      }

      for (let i = 0; i < teamOrange.length; i++) {
        teamOrgStr += teamOrange[i];
      }

      return await interaction.reply(`Team Blue: ${teamBlueStr}\nTeam Orange: ${teamOrgStr}\nMap: ${maps[mapRandNum]}`);
    } catch (e) {
      const todayDate = new Date().toJSON();
      const msg = `${todayDate}: ${e} ::teamroll.js::\n`;

      // Log error to file
      fs.appendFile('errors.log', msg, (err) => {
        if (err) console.error(err)
      })
    }
  }
}