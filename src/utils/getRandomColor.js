export default function _getRandomColor () {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
}
