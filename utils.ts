export const getBoundX = (
  x: number,
  deltaX: number,
  chunkBcr: ClientRect, 
  nameBcr: ClientRect, 
  adjustment: number,
): number => {
  let boundX = x + (deltaX / adjustment)
  let left = (chunkBcr.left - nameBcr.left - (chunkBcr.left - nameBcr.left))
  left /= adjustment
  let right = (chunkBcr.left - nameBcr.left - (chunkBcr.right - nameBcr.right))
  right /= adjustment
  boundX = Math.min(boundX, right)
  boundX = Math.max(boundX, left)
  return boundX
}

export const getBoundY = (
  y: number,
  deltaY: number, 
  chunkBcr: ClientRect,
  nameBcr: ClientRect,
  adjustment: number,
): number => {
  let boundY = y + (deltaY / adjustment)
  const bottom = (nameBcr.height - chunkBcr.height) / adjustment
  const top = nameBcr.top / adjustment
  boundY = Math.min(boundY, bottom)
  boundY = Math.max(boundY, top)
  return boundY
}

export const getRandomColor = (): string => {
  const hex = Math.random().toString(16).slice(2, 8).toUpperCase()
  return `#${hex}`
}
