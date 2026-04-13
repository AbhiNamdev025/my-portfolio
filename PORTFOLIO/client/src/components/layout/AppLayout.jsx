import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../hooks/useTheme';
import styles from '../../styles/App.module.css';

function AppLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={styles.appShell}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.orbThree} />
      </div>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 2800,
          style: isDark
            ? {
                background: '#1f2937',
                color: '#f9fafb'
              }
            : undefined
        }}
      />
    </div>
  );
}

export default AppLayout;
