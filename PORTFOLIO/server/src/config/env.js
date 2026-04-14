require('dotenv').config();

const clientUrls = String(process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

module.exports = {
  port: process.env.PORT || 5000,
  clientUrls,
  nodeEnv: process.env.NODE_ENV || 'development',
  resendApiKey: process.env.RESEND_API_KEY || '',
  mailFrom: process.env.MAIL_FROM || '',
  mailTo: process.env.MAIL_TO || ''
};
