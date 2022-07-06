import nodemailer from 'nodemailer';
import { generateJwt } from './jwt.js';

const getTransporter = async () => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  return transporter;
};

const sendResetMail = async (email) => {
  const token = generateJwt({ email }, process.env.JWT_RESET_EXPIRE);

  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: 'Youtube-clone',
    to: email,
    subject: 'Reset password',
    text: 'Here is your reset link',
    html: `
    <h1>here is your reset password link!</h1>
    <a href="${process.env.CLIENT_URL}/reset?token=${token}" style="padding:8px 16px;border-radius:6px;background-color:tomato;color:white;text-declaration:none;">Reset</a>`,
  });
  return nodemailer.getTestMessageUrl(info);
};

export { sendResetMail };
