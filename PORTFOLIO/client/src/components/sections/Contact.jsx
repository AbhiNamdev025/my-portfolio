import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import SectionWrapper from '../common/SectionWrapper';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { submitContactForm } from '../../services/api';
import { PERSONAL_INFO } from '../../data/content';
import styles from './Contact.module.css';

const initialForm = { name: '', email: '', message: '' };

function Contact({ summary = '' }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeInfo = {
    phone: PERSONAL_INFO?.phone || '+91 0000000000',
    email: PERSONAL_INFO?.email || 'your.email@example.com',
    location: PERSONAL_INFO?.location || 'India',
    socialLinks: PERSONAL_INFO?.socialLinks || {}
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      await submitContactForm(form);
      toast.success('Message sent successfully. I will get back to you soon.');
      setForm(initialForm);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to send right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Let’s collaborate on your next web project"
      summary={summary}
    >
      <div className={styles.grid}>
        <article className={styles.info}>
          <div className={styles.infoTop}>
            <div>
              <h3>Contact Details</h3>
              <p className={styles.note}>Choose your preferred way to connect. I usually respond quickly.</p>
            </div>

            <div className={styles.detailList}>
              <a href={`tel:${safeInfo.phone}`} className={styles.detailRow}>
                <Phone size={22} /> {safeInfo.phone}
              </a>
              <a href={`mailto:${safeInfo.email}`} className={styles.detailRow}>
                <Mail size={22} /> {safeInfo.email}
              </a>
              <p className={styles.detailRow}>
                <MapPin size={22} /> {safeInfo.location}
              </p>
            </div>
          </div>

          <div className={styles.links}>
            {safeInfo.socialLinks.github && (
              <a href={safeInfo.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <FaGithub size={18} />
              </a>
            )}
            {safeInfo.socialLinks.linkedin && (
              <a href={safeInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
            )}
            {safeInfo.socialLinks.twitter && (
              <a href={safeInfo.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="X" title="X">
                <FaXTwitter size={18} />
              </a>
            )}
            {safeInfo.socialLinks.instagram && (
              <a href={safeInfo.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <FaInstagram size={18} />
              </a>
            )}
          </div>
        </article>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            label="Your Name"
            name="name"
            value={form.name}
            onChange={updateField}
            required
            placeholder="Enter your full name"
          />
          <InputField
            label="Your Email"
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            required
            placeholder="Enter your email"
          />
          <InputField
            label="Your Message"
            name="message"
            multiline
            rows={5}
            value={form.message}
            onChange={updateField}
            required
            placeholder="Write your project details"
          />
          <Button fullWidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}

export default Contact;
