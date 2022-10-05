const { backgroundColor, mainBackgroundColor, textColor } = require("../utils/colors")

module.exports = function template(body) {
  return `
<body style="background: ${backgroundColor};margin:0;padding: 15px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td 
        align="center" 
        style="padding: 10px 0px 20px 0px; font-size: 22px; 
        font-family: Helvetica, Arial, sans-serif; 
        color: ${textColor};"
      >
        <strong>Njörd</strong>
      </td>
    </tr>
  </table>
  <table 
    width="100%" 
    border="0" 
    cellspacing="20" 
    cellpadding="0" 
    style="background: ${mainBackgroundColor}; 
    max-width: 600px; 
    margin: auto; 
    border-radius: 10px;">
    ${body}
  </table>
</body>
`}
