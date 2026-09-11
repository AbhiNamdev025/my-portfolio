const { Resend } = require('resend');
const { resendApiKey, mailFrom, mailTo } = require('../config/env');

const resend = new Resend(resendApiKey);

const sendContactEmail = async ({ name, email, message }) => {
  if (!resendApiKey || !mailFrom || !mailTo) {
    throw new Error('Email configuration is incomplete. Please set RESEND_API_KEY, MAIL_FROM, and MAIL_TO env values.');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${mailFrom}>`,
      to: [mailTo],
      reply_to: email, // use reply_to instead of replyTo (resend API uses snake_case, though it might accept camelCase, snake_case is standard)
      subject: `New Message from ${name} via Portfolio`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #f9f9fb;">
          <h2 style="color: #333333; margin-top: 0; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Message Received</h2>
          <p style="color: #555555; font-size: 15px;">You have a new contact form submission from your portfolio website.</p>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #eeeeee; margin-top: 20px;">
            <div style="margin-bottom: 15px;">
              <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Name</p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #222222;">${name}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Email</p>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #0066cc;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div>
              <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; text-transform: uppercase; font-weight: bold;">Message</p>
              <div style="background-color: #f4f4f5; padding: 15px; border-radius: 4px; color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          
          <p style="color: #999999; font-size: 12px; margin-top: 25px; text-align: center;">
            This email was sent automatically from your portfolio contact form.
          </p>
        </div>
      `
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
