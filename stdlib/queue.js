export function queue(length) {
  // (2) -> {q: [null,null], i: 0}
  return {
    q: new Array(length),
    i: 0,
  }
}

export function push(q, v) {
  // ({q: [0,0], i: 0}, 7) -> {q: [7, 0], i: 1}
  q.q[q.i++] = v
  return q
}
