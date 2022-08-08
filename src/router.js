const 
  sendVerifyMail = require("./mail/sendVerifyMail"),
  request = require("./mail/request"),
  Router = require("@koa/router"),
  router = new Router();

router.get('/',(ctx)=>ctx.body = 'en ligne')
router.post("/sendVerifyMail", sendVerifyMail);
router.post("/request", request);

module.exports = router;