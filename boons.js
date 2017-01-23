character.boonList = {};

var Boon = function(name,type,a,b,c,d,e,f,g,func){
  var thing = {};
  thing.name = name;
  thing.type = type;
  if(!character.boonList[type]){character.boonList[type] = [];}
  console.log(character.boonList[type]);
  character.boonList[type].push(thing);
  thing.costs = {"Level":a,"STR":b,"DEX":c,"CON":d,"INT":e,"WIS":f,"CHA":g};
  thing.func = func;
  thing.onTake = function(){
    var qualify = 1;
    for(var k in thing.costs){
      if(character.statXP[k]<thing.costs[k]){qualify=0;return false;}
    }
    for(var k in thing.costs){
      character.statXP[k]-=thing.costs[k];
    }
    console.log(thing);
    thing.func();
  };
  var i = document.createElement("input");
  i.type = "button";
  i.value = name;
  i.onclick = thing.onTake;
  document.getElementById(type+"Boons").appendChild(i);
  console.log("Boon "+name+" created and added to list.");
}

window.addEventListener("load",function(){
  new Boon("Increased Damage","STR",0,10,0,0,0,0,0,function(){character.baseDamageMin+=10;character.baseDamageMax+=10;console.log("STRONGER!");});
  new Boon("Add Hit Point","CON",0,0,0,10,0,0,0,function(){
      character.bonusHP++;
      var newHP = character.calcHP();
      var hpdif = newHP-character.stats["maxHP"];
      character.stats["maxHP"]=newHP;
      character.stats["curHP"]+=hpdif;
      document.getElementById("curHP").innerHTML=character.stats["curHP"];
      document.getElementById("maxHP").innerHTML=character.stats["maxHP"];
      console.log("You feel more healthy");
  });
});
