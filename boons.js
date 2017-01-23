character.boonList = {};

var Boon = function(name,type,a,b,c,d,e,f,g,func){
  this.name = name;
  this.type = type;
  if(!character.boonList[type]){character.boonList[type] = [];}
  console.log(character.boonList[type]);
  character.boonList[type].push(this);
  this.costs = {"Level":a,"STR":b,"DEX":c,"CON":d,"INT":e,"WIS":f,"CHA":g};
  this.func = func;
  this.onTake = function(t){
    var qualify = 1;
    console.log(t.costs);
    console.log(character.statXP);
    for(var k in t.costs){
      if(character.statXP[k]<t.costs[k]){qualify=0;return false;}
    }
    for(var k in this.costs){
      character.statXP[k]-=t.costs[k];
    }
    console.log(this);
    t.func();
  }
  var i = document.createElement("input");
  i.type = "button";
  i.value = name;
  i.onclick = this.onTake(this);
  document.getElementById(type+"Boons").appendChild(i);
  console.log("Boon "+name+" created and added to list.");
}

window.addEventListener("load",function(){
  new Boon("Increased Damage","STR",0,10,0,0,0,0,0,function(){character.baseDamageMin+=10;character.baseDamageMax+=10;console.log("STRONGER!");});
});
