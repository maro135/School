import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Toaster } from 'sonner';
import { auth, db } from './services/firebase';
import { useAuthStore } from './store/useAuthStore';
import { UserProfile } from './types';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Ranking from './pages/Ranking';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import ExamEngine from './pages/ExamEngine';
import ResultPage from './pages/ResultPage';
import Onboarding from './pages/Onboarding';

// Components
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  const { setUser, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
      
      if (user) {
        // Listen to profile changes
        const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        });
        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [setUser, setProfile, setLoading]);

  return (
    <div dir="rtl" className="min-h-screen font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/ai" element={<AIAssistant />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/exam/:examId" element={<ExamEngine />} />
            <Route path="/result/:submissionId" element={<ResultPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-center" expand={true} richColors />
    </div>
  );
}
