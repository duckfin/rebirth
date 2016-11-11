var character = {};
character.stats = {"STR":10,"DEX":10,"CON":10,"INT":10,"WIS":10,"CHA":10};
charcter.updateStats = function () {
  for(var s of this.stats){
    document.getElementById(s).innerHTML=this.stats[s];
  }
}
