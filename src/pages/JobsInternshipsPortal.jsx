import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import '../styles/studentDashboard/JobsInternshipsPortal.css';
import { useNavigate } from 'react-router-dom';

// Mock data for jobs/internships from different sectors
const MOCK_JOBS = [
  {
    _id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechNova Solutions',
    location: 'Remote',
    type: 'Internship',
    sector: 'IT',
    description: 'Work with React.js and modern web technologies. 3-month paid internship.',
    alumniName: 'Amit Sharma',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/frontend-intern'
  },
  {
    _id: '2',
    title: 'Software Engineer',
    company: 'InnovateX',
    location: 'Bangalore',
    type: 'Full-time',
    sector: 'IT',
    description: 'Join our backend team working on Node.js and cloud services.',
    alumniName: 'Priya Singh',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/software-engineer'
  },
  {
    _id: '3',
    title: 'Marketing Intern',
    company: 'MarketMinds',
    location: 'Delhi',
    type: 'Internship',
    sector: 'Marketing',
    description: 'Assist in digital marketing campaigns and analytics.',
    alumniName: 'Rahul Verma',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/marketing-intern'
  },
  {
    _id: '4',
    title: 'Civil Site Engineer',
    company: 'BuildRight Infra',
    location: 'Hyderabad',
    type: 'Full-time',
    sector: 'Civil',
    description: 'Manage construction sites and coordinate with contractors.',
    alumniName: 'Sneha Reddy',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/civil-engineer'
  },
  {
    _id: '5',
    title: 'Mechanical Design Engineer',
    company: 'MechWorks Pvt Ltd',
    location: 'Pune',
    type: 'Full-time',
    sector: 'Mechanical',
    description: 'Design mechanical components using CAD software.',
    alumniName: 'Vikram Desai',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/mechanical-design'
  },
  {
    _id: '6',
    title: 'HR Executive',
    company: 'PeopleFirst',
    location: 'Mumbai',
    type: 'Full-time',
    sector: 'HR',
    description: 'Handle recruitment and employee engagement activities.',
    alumniName: 'Neha Joshi',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/hr-executive'
  },
  {
    _id: '7',
    title: 'Electrical Maintenance Engineer',
    company: 'PowerGrid Solutions',
    location: 'Chennai',
    type: 'Full-time',
    sector: 'Electrical',
    description: 'Maintain and troubleshoot electrical systems in plants.',
    alumniName: 'Arjun Kumar',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/electrical-maintenance'
  },
  {
    _id: '8',
    title: 'Business Analyst',
    company: 'BizInsight',
    location: 'Gurgaon',
    type: 'Full-time',
    sector: 'Business',
    description: 'Analyze business processes and suggest improvements.',
    alumniName: 'Ritu Agarwal',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/business-analyst'
  },
  {
    _id: '9',
    title: 'Chemical Process Engineer',
    company: 'ChemTech Industries',
    location: 'Vadodara',
    type: 'Full-time',
    sector: 'Chemical',
    description: 'Optimize chemical processes and ensure safety standards.',
    alumniName: 'Manish Patel',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/chemical-process'
  },
  {
    _id: '10',
    title: 'Content Writer',
    company: 'WriteRight Media',
    location: 'Remote',
    type: 'Part-time',
    sector: 'Media',
    description: 'Create engaging content for blogs and social media.',
    alumniName: 'Sonal Mehta',
    createdAt: new Date().toISOString(),
    applyLink: 'https://example.com/apply/content-writer'
  }
];

const sectorOptions = [
  'All',
  'IT',
  'Marketing',
  'Civil',
  'Mechanical',
  'HR',
  'Electrical',
  'Business',
  'Chemical',
  'Media'
];

const JobsInternshipsPortal = ({ onNavigate }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = MOCK_JOBS.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
        (sectorFilter === 'All' ? true : job.sector === sectorFilter)
      );
      setJobs(filtered);
      setLoading(false);
    }, 400);
  }, [searchTerm, locationFilter, sectorFilter]);
  const navigate = useNavigate();
  return (
    <div className="jobs-portal-container dashboard-section-card">
      <button
        className="profile-back-btn"
        onClick={() => onNavigate && onNavigate('explore')}
      >
        ← Back
      </button>
      <h2 className="section-title">Jobs & Internships Portal</h2>
      <p className="section-description">
        Browse jobs and internships posted by our alumni. Find your next opportunity!
      </p>
      <div className="jobs-search-filters">
        <input
          type="text"
          placeholder="Search jobs/internships..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
        />
        <select
          value={sectorFilter}
          onChange={e => setSectorFilter(e.target.value)}
        >
          {sectorOptions.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>
      {loading && <p className="loading-message">Loading jobs...</p>}
      {!loading && jobs.length > 0 ? (
        <div className="jobs-list-grid">
          {jobs.map(job => (
            <div key={job._id} className="job-card">
              <h3 className="job-title"><FaBriefcase /> {job.title}</h3>
              <p className="job-company">{job.company}</p>
              <p className="job-location"><FaMapMarkerAlt /> {job.location}</p>
              <p className="job-type">{job.type} | <span className="job-sector">{job.sector}</span></p>
              <p className="job-description">{job.description}</p>
              <div className="job-meta">
                <span className="job-posted-by"><FaUser /> Posted by: {job.alumniName}</span>
                <span className="job-date">Posted on: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-results-message">No jobs or internships found.</p>
      )}
    </div>
  );
};

export default JobsInternshipsPortal;