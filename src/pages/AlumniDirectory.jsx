import React, { useEffect, useState } from 'react';
import api from '../api/api';
import AlumniCard from '../components/AlumniCard';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [batch, setBatch] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchAlumni = async () => {
      const params = { search, batch, profession, location, skills, page, limit };
      const { data } = await api.get('/alumni', { params });
      setAlumni(data.alumni);
      setTotal(data.total);
    };
    fetchAlumni();
  }, [search, batch, profession, location, skills, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="alumni-directory">
      <h2>Alumni Directory</h2>
      <div className="filters" style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} />
        <input placeholder="Batch" value={batch} onChange={e => setBatch(e.target.value)} />
        <input placeholder="Profession" value={profession} onChange={e => setProfession(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Skills (comma separated)" value={skills} onChange={e => setSkills(e.target.value)} />
      </div>
      <div className="alumni-list">
        {alumni.map(a => (
          <AlumniCard key={a._id} {...a} alumni={a} />
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AlumniDirectory;