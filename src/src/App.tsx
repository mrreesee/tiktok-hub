import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TikTokProvider } from './context/TikTokContext';

const PrivateRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" />;

  return (
    <div className="flex bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/market" element={<PrivateRoute><Market /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute adminOnly><Admin /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TikTokProvider>
          <Router>
            <AppRoutes />
          </Router>
        </TikTokProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
