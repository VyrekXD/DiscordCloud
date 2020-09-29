// -| Bot Organizado |- //

const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "REACTION"] });

const path = require('path')

const fs = require("fs").promises;

bot.comandos = new Discord.Collection();
bot.config = require('./config.js');

bot.staffroles = require('./util-config/staff-roles');
bot.everySupport = bot.staffroles.everySupport;

// |- Express -| //

const express = require("express");
const app = express();


app.use(express.static("public"));


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(bot.config.port, () => {
  console.log("Escuchando desde el puerto " + listener.address().port);
});

// -| Comandos |- //

(async function handleCommands(dir = "comandos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleCommands(path.join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              let name = file.slice(0, file.length - 3);
              let properties = require(path.join(__dirname, dir, file));
                bot.comandos.set(name, properties);
          }
      }

  }
})();

// -| Eventos |- //

(async function handleEvents(dir = "eventos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleEvents(path.join(dir, file));
      } else {
          if (!file.endsWith(".js")) return;
          
          let event = require(path.join(__dirname, dir, file));
          event.run(bot);
      }


  }
})();

// -| Evento Ready |- //


bot.on("ready", async () => {
  
  console.log('Listo para repartir clouds')

  setInterval(() => {
    const estados = ['Discord Clouds FREE! || https://discord.gg/f3pyY26','Discord Clouds GRATIS! || https://discord.gg/f3pyY26'];//lista de estados
    const random = Math.floor(Math.random() * estados.length);//obtenesmo un numero pseudo-aleaotrio
    bot.user.setPresence({
      activity: {
      name: estados[random],//obtenemos un elemento pseaudo-aleatorio del array
      type: "PLAYING"
       },
      status: "online",
    });
  }, (10 * 1000))
    
})

const rootdb = require("./database/connect");
rootdb.then(() => console.log("Discord Cloud conectado a MongoDB"))

// -| Login |- //

bot.login(bot.config.token)