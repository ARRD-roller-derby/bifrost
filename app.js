require("dotenv").config();

const 
  Koa = require("koa"),
  router = require("./src/router"),
  app = new Koa(),
  koaBody = require("koa-body"),
  cors = require("@koa/cors"),
  http = require("http"),
  httpServer = http.createServer(app.callback()),
  ioSettings =  {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
    allowRequest: (req, callback) => {
      const whitelist = process.env.CORS_DOMAINS.split(',')
      if(!req.headers.origin) return callback(null,false)
      const noOriginHeader = whitelist.find(domain=> req.headers.origin.includes(domain));
      callback(null,noOriginHeader);
    }
  }
  io = require("socket.io")(httpServer,ioSettings);
  
app
  .use(koaBody())
  .use(cors())
  .use((ctx, next) => {
    if (!ctx.io) ctx.io = io;
    next();
  })
  .use(router.routes())
  .use(router.allowedMethods());


/**------  CRON  ---------- */

httpServer.listen(5000);