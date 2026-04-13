const { z } = require('zod');

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters long.').max(80),
  email: z.string().trim().email('Enter a valid email address.').max(120),
  message: z.string().trim().min(8, 'Message must be at least 8 characters long.').max(1000)
});

module.exports = { contactSchema };
