const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailFrom = process.env.MAIL_FROM || 'onboarding@resend.dev';
const mailTo = process.env.MAIL_TO || 'delivered@resend.dev';

const testEmail = async () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Warning: RESEND_API_KEY is not defined in .env');
  }

  try {
    console.log('Sending test email via Resend...');
    const { data, error } = await resend.emails.send({
      from: mailFrom,
      to: [mailTo],
      subject: 'Test Email from Portfolio using Resend',
      html: '<p>If you received this, Resend is working successfully in your MERN portfolio backend.</p>'
    });

    if (error) {
       console.error('Error from Resend API:', error);
    } else {
       console.log('Email sent successfully via Resend!', data);
    }
  } catch (err) {
     console.error('Failed test script:', err);
  }
};

testEmail();
