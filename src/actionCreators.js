export const ADD = 'ADD'
export const DELETE = 'DELETE'
export const CHOOSE = 'CHOOSE'
export const BACK = 'BACK'
export const LINK = 'LINK'
export const ITEM_DEC = 'ITEM_DEC'
export const ITEM_INC = 'ITEM_INC'
export const DEC = 'DEC'
export const INC = 'INC'
export const PRICE = 'PRICE'
export const NAME = 'NAME'
export const LINK_STATE = 'LINK_STATE'
export const OPEN_STATE = 'OPEN_STATE'
export const SUM = 'SUM'

export function submit(obj) {
  return {type: ADD, payload: obj}
}
export function uninstall(id) {
  return {type: DELETE, payload: id}
}
export function onChooseItem(item) {
  return {type: CHOOSE, payload: item}
}
export function back() {
  return {type: BACK}
}
export function linkProduct(id) {
  return {type: LINK, payload: id}
}
export function itemDecrease(id) {
  return {type: ITEM_DEC, payload: id}
}
export function itemIncrease(id) {
  return {type: ITEM_INC, payload: id}
}
export function decrease(id) {
  return {type: DEC }
}
export function increase(id) {
  return {type: INC }
}
export function priceChange(e) {
  return{type: PRICE, payload: e.target.value}
}
export function nameChange(e) {
  return {type: NAME, payload: e.target.value}
}
export function linkState() {
  return {type: LINK_STATE}
}
export function opState() {
  return {type: OPEN_STATE }
}
export function onChangeSum() {
  return {type: SUM }
}
