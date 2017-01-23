character.boonList = {};

var Boon = function(name,type,func){
  var thing = {};
  thing.name = name;
  thing.type = type;
  if(!character.boonList[type]){character.boonList[type] = [];}
  console.log(character.boonList[type]);
  character.boonList[type].push(thing);
  thing.func = func;
  thing.onTake = function(){
    if(character.statBoonAvail[thing.type]<1){return false;}
    character.statBoonAvail[thing.type]-=1;
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
  new Boon("Increased Damage","STR",function(){character.baseDamageMin+=1;character.baseDamageMax+=1;console.log("STRONGER!");});
  new Boon("Add Hit Point","CON",function(){
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
