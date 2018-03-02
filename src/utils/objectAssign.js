export default function objectAssign(target, ...args) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const output = Object(target)
  for (let index = 0; index < args.length; index += 1) {
    const source = args[index]
    if (source !== undefined && source !== null) {
      Object.keys(source).forEach((nextKey) => {
        if (!Object.prototype.hasOwnProperty.call(source, nextKey)) {
          return
        }
        output[nextKey] = source[nextKey]
      })
    }
  }
  return output
}
