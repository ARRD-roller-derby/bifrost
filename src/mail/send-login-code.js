const {
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    buttonBorderColor,
  } = require('../utils/colors'),
  transport = require('./createTransport'),
  template = require('./template'),
  from = require('../utils/formEmail')

module.exports = function sendLoginCode(ctx) {
  if (ctx.headers.authorization !== process.env.BIFROST_TOKEN) {
    return ctx.throw(403, 'Non autorisé')
  }
  const { url, host, email, code } = ctx.request.body
  //no wait confirm for vercel limit timeout
  // Email HTML body
  function html({ code, email }) {
    const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`,
      body = `<tr>
      <td 
        align="center" 
        style="padding: 10px 0px 0px 0px; 
        font-size: 18px; 
        font-family: Helvetica, Arial, sans-serif; 
        color: ${textColor};">
        <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0" max-width: 600px;>
          <tr>
            <td 
              align="center"
              style="border-radius: 5px;"
              borderColor="${buttonBackgroundColor}">
              Entrez ce code dans l'application :
              <div
                style="
                  font-size: 18px;
                  font-family: Helvetica, Arial, sans-serif;
                  color: ${buttonTextColor};
                  text-decoration: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  border: 1px solid ${buttonBorderColor};
                  display: inline-block; font-weight: bold;">
                ${code}
              </div>
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
        Si vous n'avez pas tenté de vous connecter, ignorez cet email.
      </td>
    </tr>`
    return template(body)
  }

  // Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
  function text({ code, host }) {
    return `Connectez vous à ${host}\n${url}\n\n`
  }

  transport.sendMail({
    to: email,
    from,
    subject: `Connexion à Njörd`,
    text: text({ code, host }),
    html: html({ code, host, email }),
  })

  ctx.body = 'Envoyé !'
}
