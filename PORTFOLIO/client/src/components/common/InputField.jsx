import styles from './InputField.module.css';

function InputField({ label, type = 'text', multiline = false, error, ...props }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {multiline ? <textarea className={styles.input} {...props} /> : <input type={type} className={styles.input} {...props} />}
      {error && <small className={styles.error}>{error}</small>}
    </label>
  );
}

export default InputField;
