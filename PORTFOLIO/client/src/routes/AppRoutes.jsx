import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import SkillsPage from '../pages/SkillsPage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';
import ResumePage from '../pages/ResumePage';
import NotFoundPage from '../pages/NotFoundPage';
import ScrollToTop from './ScrollToTop';

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
