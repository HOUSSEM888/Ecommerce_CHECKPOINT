const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "ecoartteampi@gmail.com",
    pass: "zwsb opga qbas fwnl",
  },
});

exports.sendEmail = async (email, token) => {
  const info = await transporter.sendMail({
    from: '"CHEZ Houssem SHOP👻" <CHEZHOUSSEM@google.com>', // sender address
    to: email, // list of receivers
    subject: "RESET Password", // Subject line
    text: "Hello this is the link to change ur password ",
    html: `<a>https://chezhOUSSEMSHOP/changePassword/${token}</a>`
  });
}