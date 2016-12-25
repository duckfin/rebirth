var character = {};

character.stats = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10,"curHP":10,"maxHP":10,"Gold":100,"XP":0};
character.statCost = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10};
character.year = 0;
character.resting = 0;
character.nextLevelXP = 100;

character.baseDamageMin = 0;
character.baseDamageMax = 2;
character.baseHealMin = 1;
character.baseHealMax = 2;
character.bonusHP = 0;

character.attackModifier = function () {return (1+0.01*character.stats["STR"]);}
character.healModifier = function () {return (1+0.01*character.stats["WIS"]);}

character.calcHP = function () {return character.bonusHP+character.stats["CON"];}
character.rollAttack = function () {return character.attackModifier()*(Math.random()*(character.baseDamageMax-character.baseDamageMin)+character.baseDamageMin);}

function statClick(whatButton){
  var what = whatButton.substring(0,whatButton.length-6);
  if(character.stats["Gold"]>=character.statCost[what]){
    character.stats["Gold"]-=character.statCost[what];
    character.stats[what]+=1;
    character.statCost[what]*=1.15;
    document.getElementById(what).innerHTML=character.stats[what];
    if(what=="CON"){
      var newHP = character.calcHP();
      var hpdif = newHP-character.stats["maxHP"];
      character.stats["maxHP"]=newHP;
      character.stats["curHP"]+=hpdif;
      document.getElementById("curHP").innerHTML=character.stats["curHP"];
      document.getElementById("maxHP").innerHTML=character.stats["maxHP"];
    }
  }
}

character.takeDamage = function (a) {
  character.stats["curHP"] -= a;
  if(character.stats["curHP"]<=0){
    character.stats["curHP"]=0;
    character.resting=1;
  }
}

character.rest = function () {
  var h = character.healModifier()*(Math.random()*(character.baseHealMax-character.baseHealMin)+character.baseHealMin);
  character.stats["curHP"]+=h;
  if(character.stats["curHP"]>=character.stats["maxHP"]){
    character.resting = 0;
    character.stats["curHP"] = character.stats["maxHP"];
  }
}

character.updateStats = function () {
  for(var s in this.stats){
    document.getElementById(s).innerHTML=this.stats[s];
  }
}
character.updateYear = function () {
  document.getElementById("yearspan").innerHTML = this.year;
}
