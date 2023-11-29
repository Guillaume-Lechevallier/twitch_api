const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'knakiballss',
    password: 'oauth:9pd6scatc2uzr90qe21arekcr0ztmq'
  },
  channels: [
    'knakiballss'
  ]
};


const fs = require('fs');


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  const testmsg = context.username;
  // Remove whitespace from chat message
  const commandName = msg.trim();
  console.log('commandName:',commandName);
  console.log('testmsg:',testmsg);
  const nomFichier = testmsg+'.txt';
  const texteAAjouter = commandName + '/n';

  ajouterTexteDansFichier(nomFichier, texteAAjouter);
  const general = testmsg + ' à écrit ' + texteAAjouter + ' dans le tchat\n'
  ajouterTexteDansFichier('general.txt', general);




  const num = rollDice();
  client.say(target, `Tu as dit : ${commandName}`);

}

function ajouterTexteDansFichier(nomFichier, texteAAjouter) {
  // Vérifier si le fichier existe, le créer s'il n'existe pas
  if (!fs.existsSync(nomFichier)) {
    fs.writeFileSync(nomFichier, '', 'utf-8');
  }

  // Ajouter le texte dans le fichier
  fs.appendFileSync(nomFichier, texteAAjouter, 'utf-8');

  console.log(`Texte ajouté avec succès dans le fichier ${nomFichier}`);
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}