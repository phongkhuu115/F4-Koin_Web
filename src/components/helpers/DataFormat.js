/** 
 * Dùng để format lại định dạng tiền theo tiền Việt
 * @param cash: Truyền vào số tiền
*/

export function MoneyFormat(cash) { 
  if (cash === null) return
  return cash.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}

export function UUID_Format(uuid) { 
  return uuid.split('-')[0]
}
