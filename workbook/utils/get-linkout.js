let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', , 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function getRandom() {
  return Math.floor(Math.random()*26);
}


export default function (index){
  let ab = chars[ getRandom() ]+chars[ getRandom() ]
  return `${Player.getName()}:${ab}-${index}`
}
