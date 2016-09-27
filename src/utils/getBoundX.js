export default function getBoundX (x, deltaX, chunkBcr, nameBcr, adjustment) {
  let boundX = x + (deltaX / adjustment)
  let left = (chunkBcr.left - nameBcr.left - (chunkBcr.left - nameBcr.left))
  left = left / adjustment
  let right = (chunkBcr.left - nameBcr.left - (chunkBcr.right - nameBcr.right)) 
  right = right / adjustment
  boundX = Math.min(boundX, right)
  boundX = Math.max(boundX, left)
  return boundX
}
