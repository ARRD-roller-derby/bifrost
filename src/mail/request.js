const { 
  textColor, buttonBackgroundColor, 
  buttonTextColor, buttonBorderColor, 
  buttonRefusedColor, buttonSeeColor, mainBackgroundColor } = require("../utils/colors"),
  transport = require("./createTransport"),
  template = require("./template"),
  from = require('../utils/formEmail')

module.exports = function sendLeagueRequestMail(ctx) {
  if (ctx.headers.authorization !== process.env.BIFROST_TOKEN) {
    return ctx.throw(403, 'Non autorisé');
  }
  const { acceptUrl, refusedUrl, url, emails, text,subject } = ctx.request.body;

  if (!acceptUrl || !refusedUrl || !url || !emails || !text || !subject ) {
    return ctx.throw(400,'Il manque des infos');
  }

  function html({ url, acceptUrl, refusedUrl,text }) {
    const
      body = `<tr>
      <td 
        align="center" 
        style="padding: 10px 0px 0px 0px; 
        font-size: 18px; 
        font-family: Helvetica, Arial, sans-serif; 
        color: ${textColor};">
        <strong>${text}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" style="background: ${mainBackgroundColor}; cellpadding="10" cellspacing="10" 
        cellpadding="0" >
          <tr>
            <td 
              align="center"
              style="border-radius: 5px;border-spacing: 5px;"
              bgcolor="${buttonRefusedColor}">
              <p>
                <a 
                  href="${refusedUrl}" 
                  target="_self"
                  ref="opener"
                  style="
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    color: ${buttonTextColor};
                    text-decoration: none;
                    border-radius: 5px;
                    padding: 10px;
                    border: 0px;
                    display: inline-block; font-weight: bold;">
                  Refuser
                </a>
              </p>
            </td>
            <td 
              align="center"
              style="border-radius: 5px;border-spacing: 5px;"
              bgcolor="${buttonBackgroundColor}">
              <p>
                <a 
                  href="${acceptUrl}" 
                  target="_self"
                  ref="opener"
                  style="
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    color: ${buttonTextColor};
                    text-decoration: none;
                    border-radius: 5px;
                    padding: 10px;
                    border: 0px;
                    display: inline-block; font-weight: bold;">
                  Accepter
                </a>
              </p>
            </td>
            <td 
            align="center"
            style="border-radius: 5px;border-spacing: 5px;"
            bgcolor="${buttonSeeColor}">
            <p>
              <a 
                href="${url}" 
                target="_self"
                ref="opener"
                style="
                  font-size: 16px;
                  font-family: Helvetica, Arial, sans-serif;
                  color: ${buttonTextColor};
                  text-decoration: none;
                  border-radius: 5px;
                  padding: 10px;
                  border: 0px;
                  display: inline-block; font-weight: bold;">
                Voir
              </a>
            </p>
          </td>
          </tr>
          <tr >
            <td 
              colspan="3"
              align="center"
              style="
                padding: 10x 0px 10px 0px;
                font-size: 16px;
                line-height: 22px;
                font-family: Helvetica, Arial, sans-serif;
                color: ${textColor};"
            >
            Vous pouvez copier ce lien dans votre navigateur :
            </td>
          </tr>
          <tr>
            <td 
              colspan="3"
              align="center"
              style="
                padding: 0px 0px 10px 0px;
                font-size: 16px;
                line-height: 22px;
                word-break:break-all;
                font-family: Helvetica, Arial, sans-serif;
                color: ${textColor};"
            >
              ${url}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td 
        align="center"
        style="
          padding: 0px 0px 10px 0px;
          font-size: 16px;
          line-height: 22px;
          font-family: Helvetica, Arial, sans-serif;
          color: ${textColor};"
      >
        Si vous n'avez pas tenté de vous connecter, ignorez cette email.
      </td>
    </tr>`
    return template(body)
  }

  // Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
  function textFormat(url) {
    return `Connectez vous à Njörd\n${url}\n\n`
  }

  emails.forEach(email => {
    transport.sendMail({
      to: email,
      from,
      subject,
      text: textFormat(url),
      html: html({ url, acceptUrl, refusedUrl, email,text })
    })
  })

  ctx.body = "Envoyé !";
}