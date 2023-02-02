module.exports = function notif(ctx) {
  const { room, body } = ctx.request.body
  ctx.io.emit(room, body)
  ctx.body = 'done'
}
