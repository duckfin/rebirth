var character = {};
character.stats = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10};
character.updateStats = function () {
  for(var s in this.stats){
    document.getElementById(s).innerHTML=this.stats[s];
  }
}
character.changeStat = function (s,a){
  try{
    this.stat[s] += a;
    this.updateStats();
  } catch (e) {
    console.log("Error changing stat "+s);
  }
}
character.year = 0;
character.updateYear = function () {
  document.getElementById("yearspan").innerHTML = this.year;
}
