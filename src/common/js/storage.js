const SELLER_KEY = "__seller__"

export function saveTOLocal(id, str, val) {
  
  localStorage.setItem(SELLER_KEY, sets(id,str,val))
}
export function getFromLocal(id,str){
  if(id) {
    return gets(id, str)
  }
}
function sets(id, str, val){
  const objA = { }
  const objB = { }
  objA[str] = val
  objB[id] = objA
  return JSON.stringify(objB)
}
function gets(id, str) {
  const a = JSON.parse(localStorage.getItem(SELLER_KEY))
  const b = a[id]
  return b[str]
}