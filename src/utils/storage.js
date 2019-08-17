
const ITEM_KEY = 'user'


function getItem() {
 return  JSON.parse(localStorage.getItem('user'))
}
function setItem(use) {
  localStorage.setItem(ITEM_KEY,JSON.stringify(use))
}
function removeItem() {
  localStorage.removeItem(ITEM_KEY)
}

export {
  getItem,
  setItem,
  removeItem,
}