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
  // Mock sending email since SMTP is not yet set up
  console.log('=== NEW CONTACT MESSAGE RECEIVED ===');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('====================================');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
};

module.exports = { sendContactEmail };
