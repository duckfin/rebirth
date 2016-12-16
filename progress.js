var game = {};
game.currentQuest = {};
game.currentQuest.encounters = [];



function generateQuest(qlev){
  for(var i=0;i<100<i++){
    game.currentQuest.encounters[i] = new Encounter(qlev,i);
  }
}

function Encounter(qlev,eind) {
  this.qlev = qlev;
  this.eind = eind;
  this.name = "Thing";
  this.damage = 1;
  this.health = 1;
}
