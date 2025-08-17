import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RoleSelector from './pages/RoleSelector';
import StudentLogin from './pages/StudentLogin';
import AlumniLogin from './pages/AlumniLogin';
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import AlumniDirectory from './pages/AlumniDirectory';
import StudentDashboard from './pages/StudentDashboard';
import AlumniPage from './pages/AlumniPage';
import MyConnections from './pages/MyConnectionsPage';
import ProfileCard from './pages/ProfileCard';
import AlumniDetail from './pages/AlumniDetail';
import ChatPage from './pages/ChatPage';
import ChatsList from './pages/ChatsList';
import EchoChamberSection from './components/EchoChamberSection';
import JobsInternshipsPortal from './pages/JobsInternshipsPortal';
// In routes.jsx
import SkillProgressionTree from './pages/SkillProgressionTree';
import MentorshipProgram from './pages/MentorshipProgram';
import BlogsSuccessStories from './pages/BlogsSuccessStories';
import SkillEndorsements from './pages/SkillEndorsements';
import GamificationBadges from './pages/GamificationBadges';
import ConnectionProfile from './components/ConnectionProfile';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/select-role" element={<RoleSelector />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/alumni" element={<AlumniLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/directory" element={<AlumniDirectory />} />
<Route path="/connections/profile/:id" element={<ConnectionProfile />} />
      {/* Student dashboard with nested routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />}>
        <Route path="mentorship" element={<MentorshipProgram />} />
       

<Route path="/student/dashboard/blogs" element={<BlogsSuccessStories />} />
<Route path="/student/dashboard/skill-endorsements" element={<SkillEndorsements />} />
<Route path="/student/dashboard/gamification" element={<GamificationBadges />} />
        <Route path="alumni" element={<AlumniPage />} />
        <Route path="jobs-internships" element={<JobsInternshipsPortal />} />
        <Route path="connections" element={<MyConnections />} />
        <Route path="chats" element={<ChatsList />} />
        <Route path="chats/:id" element={<EchoChamberSection />} />
        <Route path="chats/:userId" element={<EchoChamberSection />} />
        <Route path="/student/dashboard/MentorshipProgram" element={<MentorshipProgram />} />
        <Route path="profile" element={<ProfileCard />} />
      </Route>
      <Route path="/directory" element={<AlumniDirectory />} />
      <Route path="/student/dashboard/skill-tree" element={<SkillProgressionTree />} />
      {/* Alumni detail page (outside nested routes for direct access) */}
      <Route path="/student/dashboard/alumni/:id" element={<AlumniDetail />} />
    </Routes>
  );
}

export default App;