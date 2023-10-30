import nodemailer from "nodemailer";
// import { createTestAccount } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "uqe7sftstvvead4p@ethereal.email",
    pass: "VmwBQCBmRFUDdV2Nbz",
  },
});

export async function sendEmail(to: string, html: string, subject: string) {
  // const testUser = await createTestAccount();
  // console.log(testUser);
  const info = await transporter.sendMail({
    from: '"👻" <foo@example.com>',
    to: to,
    subject: subject,
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview:", nodemailer.getTestMessageUrl(info));
}
