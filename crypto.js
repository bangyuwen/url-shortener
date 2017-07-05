
list = [
  '0','1','2','3','4','5','6','7','8','9',
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
]


exports.encodeID = (id) => {
  let code = ''
  let idNum = parseInt(id)
  while (idNum > 62) {
    code += list[idNum % 62]
    idNum = Math.floor(idNum/62)
  }
  code += list[idNum]
  return code
}


exports.decodeID = (str) => {
  let id = 0
  for (i in str) {
    console.log(str);
    id += list.indexOf(str[i]) * Math.pow(62, i)
    console.log(id);
  }
  return id
}
