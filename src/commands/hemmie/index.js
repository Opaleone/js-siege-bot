const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const config = require('../../../config.json')
const { sleep } = require('../../../utils/index');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('hemmie')
      .setDescription('Murphy\'s law...'),
  async execute(interaction) {
    try {
      const probabilities = ['Yes', 'No', 'Maybe', 'Absolutely', 'Probably not'];
      const randNum = Math.floor(Math.random() * probabilities.length);

      await interaction.reply('Will Hemmie get nitro\'ed this round?')
      sleep(3000);
      return await interaction.followUp(probabilities[randNum]);
    } catch(e) {
      const curTimeDate = new Date().toJSON();
      const msg = `${curTimeDate}: ${e.message} ::hemmie.js::\n`;

      fs.appendFile('errors.log', msg, (err) => {
        if (err) console.error(err)
      })
    }
  }
}