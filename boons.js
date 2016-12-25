var Boon = function(name,type,a,b,c,d,e,f,g,func){
  this.name = name;
  this.type = type;
  this.costs = {"Level":a,"STR":b,"DEX":c,"CON":d,"INT":e,"WIS":f,"CHA":g};
  this.func = func;
  this.onTake = function(){
    var qualify = 1;
    for(var k in this.costs){
      if(character.statXP[k]<this.costs[k]){qualify=0;return false;}
    }
    for(var k in this.costs){
      character.statXP[k]-=this.costs[k];
    }
    this.func();
  }
}

