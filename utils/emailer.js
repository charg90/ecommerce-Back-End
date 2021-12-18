const nodemailer = require("nodemailer");

const createTransport = () => {
  const transport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  return transport;
};

exports.sendMail = async (user) => {
  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: "charlybozzola@gmail.com",
    to: `${user.email}`,
    subject: "confirmacion de registro",
    html: `<p> gracias por registrarte ${user.nombre} </p>
    <a href="http://localhost:3000/verify/${user.uuid}">ingresa en el link<a/>`,
  });
  console.log("mensaje", info.messageId);
};
