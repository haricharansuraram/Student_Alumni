import React from 'react';
import AlumniCard from '../components/AlumniCard';
import '../styles/AlumniPage.css';

const dummyAlumni = [
  {
    id: '1',
    name: 'Amit Sharma',
    batch: '2015',
    profession: 'Software Engineer at Google',
    location: 'Bangalore, India',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    education: 'B.Tech, Computer Science',
    degree: 'B.Tech',
    experience: '5 years at Google',
    qualification: 'First Class',
    passedOut: '2015',
    skills: ['React', 'Node.js', 'AWS']
  },
  {
    id: '2',
    name: 'Priya Singh',
    batch: '2017',
    profession: 'Product Manager at Microsoft',
    location: 'Hyderabad, India',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    education: 'MBA, IIM Bangalore',
    degree: 'MBA',
    experience: '3 years at Microsoft',
    qualification: 'Distinction',
    passedOut: '2017',
    skills: ['Product Management', 'Leadership', 'Agile']
  },
  {
    id: '3',
    name: 'Rahul Verma',
    batch: '2014',
    profession: 'Data Scientist at Amazon',
    location: 'Delhi, India',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    education: 'M.Tech, Data Science',
    degree: 'M.Tech',
    experience: '6 years at Amazon',
    qualification: 'First Class',
    passedOut: '2014',
    skills: ['Python', 'Machine Learning', 'AWS']
  },
  {
    id: '4',
    name: 'Sneha Patel',
    batch: '2016',
    profession: 'UX Designer at Adobe',
    location: 'Pune, India',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    education: 'B.Des, NID',
    degree: 'B.Des',
    experience: '4 years at Adobe',
    qualification: 'Distinction',
    passedOut: '2016',
    skills: ['UX Design', 'Figma', 'Adobe XD']
  }
];

const AlumniPage = () => (
  <div className="alumni-list">
    {dummyAlumni.map((alumni) => (
      <AlumniCard key={alumni.id} {...alumni} alumni={alumni} />
    ))}
  </div>
);

export default AlumniPage;