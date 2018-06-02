export const pick = (names, obj) => {
  const result = {}

  for (let i = 0; i < names.length; i += 1) {
    let name = names[i]

    result[name] = obj[name]
  }

  return result
}
