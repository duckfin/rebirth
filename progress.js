var game = {};
game.currentQuest = {};
game.currentQuest.encounters = [];
game.currentQuest.currentEncInd = 0;

function generateQuest(qlev){
  game.currentQuest.qlev = qlev;
  for(var i=0;i<100;i++){
    game.currentQuest.encounters[i] = new Encounter(qlev,i);
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
    else {out+=" "+game.currentQuest.encounters[game.currentQuest.currentEncInd].name+" died.";game.currentQuest.advance();}
  }
  else {character.rest();var out = "Character rested.";}
  character.updateStats();
  console.log(out);
}

function generateQuest(qlev){
  for(var i=0;i<100;i++){
    game.currentQuest.encounters[i] = new Encounter(qlev,i);
  }
}

game.currentQuest.advance = function () {
  game.updateQuestInfo();
  if(game.currentQuest.encounters[game.currentQuest.currentEncInd+1]){game.currentQuest.currentEncInd+=1;}
}

function Encounter(qlev,eind) {
  this.qlev = qlev;
  this.eind = eind;
  this.name = "Thing";
  this.damage = 1+1.0*(eind/100.0);
  this.health = 1+9.0*(eind/100.0);
}

game.updateQuestInfo = function () {
  document.getElementById("QuestNum").innerHTML = game.currentQuest.qlev;
  document.getElementById("EncNum").innerHTML = game.currentQuest.currentEncInd;
}

document.addEventListener('DOMContentLoaded', function() {
   game.updateQuestInfo();
}, false);

game.loopID = setInterval(game.mainLoop,250);
