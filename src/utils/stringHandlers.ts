export function makeAuthorStr(inputStr) {
  if (inputStr.length === 1) {
    return inputStr[0]
  } else {
    const [last, ...rest] = inputStr.reverse()
    return rest.reverse().join(", ") + ` and ${last}`
  }
}
