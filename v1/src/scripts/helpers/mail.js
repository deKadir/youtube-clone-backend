import nodemailer from 'nodemailer';
import { generateJwt } from './jwt.js';

const getTransporter = async () => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
};

const sendResetMail = async (email) => {
  const token = generateJwt({ email }, process.env.JWT_RESET_EXPIRE);

  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
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
