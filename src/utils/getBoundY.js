export default function getBoundY(y, deltaY, chunkBcr, nameBcr, adjustment) {
  let boundY = y + (deltaY / adjustment)
  const bottom = (nameBcr.height - chunkBcr.height) / adjustment
  const top = nameBcr.top / adjustment
  boundY = Math.min(boundY, bottom)
  boundY = Math.max(boundY, top)
  return boundY
}
