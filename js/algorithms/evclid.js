function E(a, b) {
  const r = a % b
  return r === 0 ? b : E(b, r)
}
console.log(E(9, 12))
