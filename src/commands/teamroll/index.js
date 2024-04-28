const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('teamroll')
      .setDescription('Random roll for unbiased teams in custom 5v5 matches'),
  async execute(interaction) {
    try {
      if (config.debug.status) {
        if (!config.debug.channels.includes(interaction.channelId)) {
          return await interaction.reply({ content: "Currently testing bot. Try again later!", ephemeral: true });
        }
      }
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