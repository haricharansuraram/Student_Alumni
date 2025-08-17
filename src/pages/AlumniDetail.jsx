import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaLink, FaHandshake, FaComments } from 'react-icons/fa';
import '../styles/AlumniDetail.css';

const FaUserCircle = ({ className }) => (
    <div className={`user-circle-avatar ${className}`}>
        <FaUser />
    </div>
);

const AlumniDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alumni, setAlumni] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchAlumni = async () => {
            setLoading(true);
            setError(null);
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;

                if (!token || !user) {
                    throw new Error('User not authenticated.');
                }

                const res = await fetch(`/api/alumni/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Alumni not found');
                }
                const data = await res.json();
                setAlumni(data);
            } catch (err) {
                console.error("Error fetching alumni:", err);
                setError(err.message);
                setAlumni(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAlumni();
    }, [id]);

    if (loading) return <div className="detail-loading-message">Loading...</div>;
    if (error) return <div className="detail-error-message">{error}</div>;
    if (!alumni) return <div className="detail-not-found-message">Alumni not found</div>;

    const {
        name,
        batch,
        jobTitle,
        location,
        education,
        degree,
        company,
        experience,
        qualification,
        passedOut,
        Email,
        skills
    } = alumni;

    return (
        <div className="alumni-detail-page-container">
            {/* Notification */}
            {notification && (
                <div className="notification-popup">
                    {notification}
                </div>
            )}
            {/* Back button at top left */}
            <button onClick={() => navigate(-1)} className="back-button">
                <span>←</span> Back
            </button>
            {/* Centered content */}
            <div className="alumni-detail-card">
                <FaUserCircle className="alumni-detail-avatar" />
                <h2 className="alumni-name">{name}</h2>
                <p className="alumni-job-title">{jobTitle}</p>
                <p className="alumni-location"><strong>Location:</strong> {location}</p>
                <div className="alumni-info-grid">
                    <p><strong>Company:</strong> {company}</p>
                    <p><strong>Education:</strong> {education}</p>
                    <p><strong>Email:</strong>{Email}</p>
                    <p><strong>Experience:</strong> {experience}</p>
                    <p><strong>Qualification:</strong> {qualification}</p>
                    <p><strong>Passed Out:</strong> {passedOut}</p>
                </div>
                <div className="skills-section">
                    <h3>Skills</h3>
                    <div className="skills-list">
                        {skills && Array.isArray(skills) && skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="alumni-card-actions">
                    <button
                        className="connect-btn"
                        onClick={() => {
                            setNotification('Connection request sent!');
                            setTimeout(() => setNotification(''), 2000);
                        }}
                    >
                        <FaHandshake /> Connect
                    </button>
                    <button className="message-btn"><FaComments /> Message</button>
                </div>
            </div>
        </div>
    );
};

export default AlumniDetail;