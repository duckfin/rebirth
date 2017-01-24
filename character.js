var character = {};
character.boonList = [];

character.stats = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10,"curHP":10,"maxHP":10,"Gold":100,"XP":0,"nextLevelXP":100,"Level":1};
character.statCost = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10};
character.year = 0;
character.resting = 0;
character.statXP = {"STR":0,"DEX":0,"CON":0,"INT":0,"WIS":0,"CHA":0,"Level":0};
character.statBoonAvail = {"STR":0,"DEX":0,"CON":0,"INT":0,"WIS":0,"CHA":0,"Level":0};

character.baseDamageMin = 0;
character.baseDamageMax = 2;
character.baseHealMin = 1;
character.baseHealMax = 2;
character.bonusHP = 10;

character.trainingStat = "";

character.attackModifier = function () {return (1+0.01*character.stats["STR"]);}
character.evasionModifier = function () {return (1+0.01*character.stats["DEX"]);}
character.xpModifier = function () {return (1+0.01*character.stats["INT"]);}
character.healModifier = function () {return (1+0.01*character.stats["WIS"]);}

character.calcHP = function () {return character.bonusHP*(1+0.01*character.stats["CON"]);}
character.rollAttack = function () {return character.attackModifier()*(Math.random()*(character.baseDamageMax-character.baseDamageMin)+character.baseDamageMin);}
/*
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
}*/

function clicked(what){
  for(var k in character.statCost){
    document.getElementById(k+"tr").style.fontWeight = "normal";
  }
  document.getElementById(what+"tr").style.fontWeight = "bold";
  character.trainingStat = what;
};

character.takeDamage = function (a) {
  character.stats["curHP"] -= a;
  if(character.stats["curHP"]<=0){
    character.stats["curHP"]=0;
    character.resting=1;
  }
};

character.rest = function () {
  var h = character.healModifier()*(Math.random()*(character.baseHealMax-character.baseHealMin)+character.baseHealMin);
  character.stats["curHP"]+=h;
  if(character.stats["curHP"]>=character.stats["maxHP"]){
    character.resting = 0;
    character.stats["curHP"] = character.stats["maxHP"];
  }
};

character.updateStats = function () {
  for(var s in this.stats){
    document.getElementById(s).innerHTML=this.stats[s];
  }
  for(var s in character.statBoonAvail){
    document.getElementById(s+"BN").innerHTML = character.statBoonAvail[s];
  }
};

character.updateBoons = function(){
  
};

character.gainXP = function(n){
  character.stats["XP"] += n*character.xpModifier();
  if(character.stats["XP"]>=character.stats["nextLevelXP"]){character.levelUp();}
}

character.levelUp = function (){
  character.stats["nextLevelXP"] *= 1.25;
  character.stats["Level"] += 1;
  character.statXP["Level"] += 1;
  character.updateBoons();
}

character.gainStatXP = function(w,n){
  character.statXP[w] += n*character.xpModifier();
  if(w!="Level" && character.statXP[w]>=character.statCost[w]){
    character.statXP[w]-=character.statCost[w];
    character.statCost[w] *= 1.4;
    character.statBoonAvail[w] += 1;
  }
}
