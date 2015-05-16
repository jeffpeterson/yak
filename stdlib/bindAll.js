export function bindAll(ctx, ...fns) {
  for (let fn of fns) {
    ctx[fn] = ctx[fn].bind(ctx)
  }
}
