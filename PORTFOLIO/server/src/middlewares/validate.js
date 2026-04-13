const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues[0]?.message || 'Validation failed.'
      });
    }

    return next(error);
  }
};

module.exports = validate;
