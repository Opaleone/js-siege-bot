module.exports = {
  sleep: async (t) => {
    // sleeps for a random amount of time between 0 and t
    const randomMs = Math.floor(Math.random() * t)
    await new Promise(res => setTimeout(res, randomMs));
  },
  hawkeyeConnect: () => {
    const client = new net.Socket();

    const data = `${process.pid} SiegeBot ${config.hawkeye.hawkeyeKey}`;

    client.connect(config.hawkeye.port, config.hawkeye.host, () => {
      client.write(data);
      client.end();
      console.log("Connected to Hawkeye, sending PID...");
    })

    client.on('error', (e) => {
      const todayDate = new Date().toJSON();
      const msg = `${todayDate}: ${e} ::hawkeye connect::\n`;

      // Log error to file
      fs.appendFile('errors.log', msg, (err) => {
        if (err) console.error(err)
      })
    })
  }
}