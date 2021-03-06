function Equipment(name,cost,hp,attack){
  this.name = name;
  this.cost = cost;
  this.level = 0;
  this.hp = hp;
  this.attack = attack;
}

var equipmentList = {"sword":new Equipment("Sword",10,0,1),"shield":new Equipment("Shield",10,10,0)};

function equipmentClick(whatButton){
  what = whatButton.substring(0,whatButton.length-6);
  console.log("BUYING "+what);
  if(character.stats["Gold"]>=equipmentList[what].cost){
    character.stats["Gold"]-=equipmentList[what].cost;
    equipmentList[what].level += 1;
    equipmentList[what].cost *= 1.2;
    character.stats["curHP"] += equipmentList[what].hp;
    character.stats["maxHP"] += equipmentList[what].hp;
    character.baseDamageMin += equipmentList[what].attack;
    character.baseDamageMax += equipmentList[what].attack;
    character.updateStats();
    updateEquipment(what);
  }
}

function updateEquipment(what){
  document.getElementById(what+"Button").value=equipmentList[what].name+" "+equipmentList[what].level;
}
