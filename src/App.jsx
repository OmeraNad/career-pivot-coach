import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Welcome from './components/Onboarding/Welcome';
import LanguageSelect from './components/Onboarding/LanguageSelect';
import RoleSelect from './components/Onboarding/RoleSelect';
import SkillsSelect from './components/Onboarding/SkillsSelect';
import InterestSelect from './components/Onboarding/InterestSelect';
import Dashboard from './components/Dashboard/Dashboard';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  if (!user) return children;
  return <Navigate to={user.onboarded ? '/dashboard' : '/welcome'} replace />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
        <Route path="/onboarding/language" element={<PrivateRoute><LanguageSelect /></PrivateRoute>} />
        <Route path="/onboarding/role" element={<PrivateRoute><RoleSelect /></PrivateRoute>} />
        <Route path="/onboarding/skills" element={<PrivateRoute><SkillsSelect /></PrivateRoute>} />
        <Route path="/onboarding/interests" element={<PrivateRoute><InterestSelect /></PrivateRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}
