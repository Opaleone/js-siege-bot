const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const config = require('../../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
      .setName('rps')
      .setDescription('Rock, Paper, Scissors, SHOOT!'),
  async execute(interaction) {
    try {
      // for debugging
      if (config.debug.status) {
        if (!config.debug.channels.includes(interaction.channelId)) {
          return await interaction.reply({ content: "Currently testing bot. Try again later!", ephemeral: true });
        }
      }

      const options = ["Rock\n:rock:", "Paper\n:roll_of_paper:", "Scissors\n:scissors:"];
      const randNum = Math.floor(Math.random() * options.length);

      return await interaction.reply(options[randNum]);
    } catch (e) {
      const todayDate = new Date().toJSON();
      const msg = `${todayDate}: ${e} ::rps.js::\n`;

      // Log error to file
      fs.appendFile('errors.log', msg, (err) => {
        if (err) console.error(err)
      })
    }
  }
}