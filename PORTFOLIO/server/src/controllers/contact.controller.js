const { sendContactEmail } = require('../services/contact.service');

const postContact = async (req, res, next) => {
  try {
    await sendContactEmail(req.body);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully. I will get back to you soon.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postContact };
