var character = {};

character.stats = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10,"curHP":10,"maxHP":10};
character.year = 0;
character.resting = 0;

character.baseDamageMin = 0;
character.baseDamageMax = 2;

character.attackModifier = function () {return (1+0.01*character.stats["STR"]);}

character.rollAttack = function () {return character.attackModifier()*(Math.random()*(character.baseDamageMax-character.baseDamageMin)+character.baseDamageMin);}

character.changeCurStat = function (s,a){
  try{
    this.stats[s] += a;
    this.updateStats();
  } catch (e) {
    console.log("Error changing stat "+s);
  }
}
character.changeMaxStat = function (s,a){
  try{
    this.stats[s] += a;
    this.maxStats[s] += a;
    this.updateStats();
  } catch (e) {
    console.log("Error changing stat "+s);
  }
}
character.rest = function () {
  
}

character.updateStats = function () {
  for(var s in this.stats){
    document.getElementById(s).innerHTML=this.stats[s];
  }
}
character.updateYear = function () {
  document.getElementById("yearspan").innerHTML = this.year;
}
