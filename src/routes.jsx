import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RoleSelector from './pages/RoleSelector';
import StudentLogin from './pages/StudentLogin';
import AlumniLogin from './pages/AlumniLogin';
import AdminLogin from './pages/AdminLogin';
import AlumniDirectory from './pages/AlumniDirectory';
import StudentDashboard from './pages/StudentDashboard';
import AlumniPage from './pages/AlumniPage';
import MyConnections from './pages/MyConnectionsPage';
import ProfileCard from './pages/ProfileCard';
import AlumniDetail from './pages/AlumniDetail';
import ChatPage from './pages/ChatPage';
import ChatsList from './pages/ChatsList'; // NEW: Import the chats list page

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/select-role" element={<RoleSelector />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/alumni" element={<AlumniLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/directory" element={<AlumniDirectory />} />

      {/* Student dashboard with nested routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />}>
        <Route path="alumni" element={<AlumniPage />} />
        <Route path="connections" element={<MyConnections />} />
        <Route path="chats" element={<ChatsList />} /> {/* UPDATED: Show chats list */}
        <Route path="chats/:id" element={<ChatPage />} />
        <Route path="profile" element={<ProfileCard />} />
      </Route>
      <Route path="/directory" element={<AlumniDirectory />} />
      {/* Alumni detail page (outside nested routes for direct access) */}
      <Route path="/student/dashboard/alumni/:id" element={<AlumniDetail />} />
    </Routes>
  );
}

export default App;