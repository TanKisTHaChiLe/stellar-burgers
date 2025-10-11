export function zeroPadLeft(number: string) {
  let str = number + '';
  while (str.length < 6) {
    str = '0' + str;
  }
  return '#' + str;
}
