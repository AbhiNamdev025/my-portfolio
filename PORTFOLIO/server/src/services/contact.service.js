const { Resend } = require('resend');
const { resendApiKey, mailFrom, mailTo } = require('../config/env');

const resend = new Resend(resendApiKey);

const sendContactEmail = async ({ name, email, message }) => {
  if (!resendApiKey || !mailFrom || !mailTo) {
    throw new Error('Email configuration is incomplete. Please set RESEND_API_KEY, MAIL_FROM, and MAIL_TO env values.');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: mailFrom,
      to: [mailTo],
      replyTo: email,
      subject: `New Portfolio Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New Portfolio Contact</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Resend Error:', error);
    const resendError = new Error('Email service is temporarily unavailable. Please try again in a moment.');
    resendError.statusCode = 503;
    resendError.cause = error;
    throw resendError;
  }
};

module.exports = { sendContactEmail };
