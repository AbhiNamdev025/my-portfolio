require('dotenv').config();

const clientUrls = String(process.env.CLIENT_URL || 'http://localhost:5173,https://my-portfolio-tan-chi-bycy0byn40.vercel.app')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

module.exports = {
  port: process.env.PORT || 5000,
  clientUrls,
  nodeEnv: process.env.NODE_ENV || 'development',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: String(process.env.SMTP_SECURE || 'false') === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  mailFrom: process.env.MAIL_FROM || process.env.SMTP_USER || '',
  mailTo: process.env.MAIL_TO || process.env.SMTP_USER || ''
};
