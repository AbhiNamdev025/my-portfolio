const nodemailer = require('nodemailer');
const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, mailFrom, mailTo } = require('../config/env');

const createTransporter = () => {
  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom || !mailTo) {
    throw new Error('Email configuration is incomplete. Please set SMTP and MAIL env values.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpUser.trim(),
      pass: smtpPass.replace(/\s+/g, '')
    }
  });
};

const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `New Portfolio Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New Portfolio Contact</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    });
  } catch (error) {
    const smtpError = new Error('Email service is temporarily unavailable. Please try again in a moment.');
    smtpError.statusCode = 502;
    smtpError.cause = error;
    throw smtpError;
  }
};

module.exports = { sendContactEmail };
