export default function getRandomColor() {
  const hex = Math.random().toString(16).slice(2, 8).toUpperCase()
  return `#${hex}`
}
