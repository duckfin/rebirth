var game = {};
game.currentQuest = {};
game.currentQuest.encounters = [];
game.currentQuest.checks = [];
game.currentQuest.currentEncInd = 0;

function generateQuest(qlev){
  game.currentQuest.qlev = qlev;
  for(var i=0;i<100;i++){
    game.currentQuest.encounters[i] = new Encounter(qlev,i);
    game.currentQuest.checks[i] = (Math.random()<0.5)?(new Check(qlev,i)):false;
  }
}

generateQuest(1);

game.mainLoop = function () {
  if(character.resting==0){
    var cd = character.rollAttack();
    var out = "Character did "+cd+" damage.";
    game.currentQuest.encounters[game.currentQuest.currentEncInd].health -= cd;
    if(game.currentQuest.encounters[game.currentQuest.currentEncInd].health>0){
      var ed = game.currentQuest.encounters[game.currentQuest.currentEncInd].damage;
      character.takeDamage(ed);
      out += " Encounter did "+ed+" damage.";
    }
    else {
      out+=" "+game.currentQuest.encounters[game.currentQuest.currentEncInd].name+" died.";
      game.currentQuest.advance();
    }
  }
  else {character.rest();var out = "Character rested.";}
  if(character.trainingStat){character.gainStatXP(character.trainingStat,0.1);}
  character.updateStats();
//  console.log(out);
}

game.currentQuest.advance = function () {
  character.stats["Gold"] += game.currentQuest.encounters[game.currentQuest.currentEncInd].qlev;
  character.gainXP(1);
  game.updateQuestInfo();
  if(game.currentQuest.encounters[game.currentQuest.currentEncInd+1]){game.currentQuest.currentEncInd+=1;}
  else {game.currentQuest.currentEncInd=0;generateQuest(game.currentQuest.qlev+1);}
}

function Encounter(qlev,eind) {
  this.qlev = qlev;
  this.eind = eind;
  this.name = "Thing";
  this.damage = 1+1.0*(eind/100.0);
  this.health = 1+9.0*(eind/100.0);
}
var randStatArray = ["STR","DEX","CON","INT","WIS","CHA"];
function Check(qlev,eind) {
  this.qlev = qlev;
  this.eind = eind;
  this.type = randStatArray[Math.floor(Math.random() * randStatArray.length)];
  this.difficulty = qlev*5*(eind/75.0);
  this.name = "Trap";
  this.onSuccess = function(){character.statXP[this.type] += 2;}
  this.onFail = function(){character.takeDamage(2);}
}

game.updateQuestInfo = function () {
  document.getElementById("QuestNum").innerHTML = game.currentQuest.qlev;
  document.getElementById("EncNum").innerHTML = game.currentQuest.currentEncInd;
}

document.addEventListener('DOMContentLoaded', function() {
  game.updateQuestInfo();
  
}, false);

game.loopID = setInterval(game.mainLoop,250);
