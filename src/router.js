const 
  sendVerifyMail = require("./mail/sendVerifyMail"),
  leagueInviteUser = require("./mail/leagueInviteUser"),
  request = require("./mail/request"),
  notif = require("./notif"),
  Router = require("@koa/router"),
  router = new Router();

router.get('/',(ctx)=>ctx.body = 'en ligne')
router.post("/sendVerifyMail", sendVerifyMail);
router.post("/request", request);
router.post("/league_invite_user", leagueInviteUser);
router.post("/notif",notif)

module.exports = router;