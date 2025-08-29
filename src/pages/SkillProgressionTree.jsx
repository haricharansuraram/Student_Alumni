import React from 'react';
import { FaCode, FaAward, FaUser } from 'react-icons/fa';
import '../styles/studentDashboard/SkillProgressionTree.css';

const mockSkills = [
  { name: 'JavaScript', level: 'Advanced', endorsements: 5 },
  { name: 'React', level: 'Intermediate', endorsements: 3 },
  { name: 'Node.js', level: 'Intermediate', endorsements: 2 },
  { name: 'Python', level: 'Advanced', endorsements: 4 },
  { name: 'CSS', level: 'Intermediate', endorsements: 2 },
  { name: 'Git', level: 'Advanced', endorsements: 6 },
];

const SkillProgressionTree = () => {
  return (
    <div className="skill-tree-container dashboard-section-card">
      <h2 className="section-title"><FaCode /> Skill Progression Tree</h2>
      <p className="section-description">
        Visualize your skill development over time and see endorsements from alumni and peers.
      </p>
      <div className="skill-tree-graph">
        {mockSkills.map((skill, idx) => (
          <div key={skill.name} className="skill-node">
            <div className={`skill-level ${skill.level.toLowerCase()}`}>
              <FaUser /> {skill.name}
            </div>
            <div className="skill-meta">
              <span className="skill-level-tag">{skill.level}</span>
              <span className="skill-endorsements">
                <FaAward /> {skill.endorsements} endorsements
              </span>
            </div>
            {idx < mockSkills.length - 1 && <div className="skill-connector"></div>}
          </div>
        ))}
      </div>
      <div className="skill-tree-details">
        <h3>How does this work?</h3>
        <ul>
          <li>Skills are added as you learn and get endorsed by alumni or peers.</li>
          <li>Levels progress from Beginner to Intermediate to Advanced.</li>
          <li>Endorsements boost your visibility in the alumni network.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillProgressionTree;