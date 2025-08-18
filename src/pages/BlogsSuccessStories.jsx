import React, { useState } from 'react';
import '../styles/studentDashboard/BlogsSuccessStories.css';
import {faBook} from 'react-icons/fa';
const initialBlogs = [
  {
    id: 1,
    author: 'Priya Sharma',
    domain: 'IT',
    title: 'How AI Is Transforming Software Development',
    content: `Artificial Intelligence is revolutionizing software development in ways we never imagined. 
    From automating code generation to enhancing debugging, AI tools are now an integral part of every developer’s toolkit. 
    Teams are leveraging machine learning to predict bugs before they happen, and natural language processing is making documentation and code reviews more efficient. 
    The rise of AI-powered assistants is helping new programmers learn faster and senior engineers focus on creative problem-solving. 
    As AI continues to evolve, ethical considerations and transparency in algorithms are becoming more important. 
    Collaboration between humans and machines is the new norm, and companies are investing heavily in AI education for their tech teams. 
    The future promises even smarter IDEs, real-time code optimization, and seamless integration with cloud platforms. 
    Developers must adapt to this changing landscape by learning AI fundamentals and staying updated with the latest trends. 
    Ultimately, AI is not replacing developers but empowering them to build better, faster, and more reliable software. 
    The journey has just begun, and the possibilities are endless.`,
    likes: 0,
    comments: [],
    showCommentInput: false
  },
  {
    id: 2,
    author: 'Rahul Verma',
    domain: 'Marketing',
    title: 'Digital Marketing Trends in 2025',
    content: `Digital marketing is undergoing a massive transformation as we move into 2025. 
    Brands are focusing on personalized experiences, using data analytics to understand customer behavior at a granular level. 
    Influencer marketing is evolving, with micro-influencers gaining more trust and engagement than celebrities. 
    Video content remains king, but interactive formats like live streams and shoppable videos are taking center stage. 
    AI-driven chatbots are handling customer queries with remarkable accuracy, freeing up human agents for complex issues. 
    Social media platforms are introducing new tools for targeted advertising and audience segmentation. 
    Privacy concerns are leading to stricter regulations, making transparency and consent critical for marketers. 
    Voice search and smart assistants are changing SEO strategies, requiring marketers to optimize for conversational queries. 
    Sustainability and social responsibility are influencing brand messaging and campaigns. 
    The future of marketing is agile, data-driven, and deeply connected to customer values.`,
    likes: 0,
    comments: [],
    showCommentInput: false
  },
  {
    id: 3,
    author: 'Anjali Mehta',
    domain: 'Civil Engineering',
    title: 'Smart Cities: The Role of Civil Engineers',
    content: `Civil engineers are at the forefront of building smart cities that are sustainable, efficient, and resilient. 
    The integration of IoT devices in infrastructure is enabling real-time monitoring of bridges, roads, and public utilities. 
    Green building materials and energy-efficient designs are reducing the carbon footprint of urban development. 
    Engineers are collaborating with urban planners to create walkable neighborhoods and efficient public transport systems. 
    Water management and waste recycling technologies are improving the quality of life for city dwellers. 
    Disaster preparedness is being enhanced through predictive modeling and robust construction standards. 
    Smart lighting and traffic management systems are reducing energy consumption and congestion. 
    Community engagement is vital, with engineers working closely with residents to address local needs. 
    The future of civil engineering lies in continuous innovation and adaptation to emerging technologies. 
    Smart cities are not just about technology—they are about creating inclusive, livable spaces for everyone.`,
    likes: 0,
    comments: [],
    showCommentInput: false
  },
  {
    id: 4,
    author: 'Sneha Patel',
    domain: 'Design',
    title: 'UX Design Principles for Modern Apps',
    content: `User experience (UX) design is the cornerstone of successful modern apps. 
    Designers are prioritizing accessibility, ensuring that apps are usable by people of all abilities. 
    Minimalist interfaces with clear navigation help users accomplish tasks quickly and efficiently. 
    Responsive design ensures seamless experiences across devices, from smartphones to desktops. 
    Feedback mechanisms, such as micro-interactions and notifications, keep users informed and engaged. 
    Personalization is key, with apps adapting to user preferences and behavior. 
    Security and privacy are integrated into the design process, building trust with users. 
    Collaboration between designers, developers, and stakeholders leads to better outcomes. 
    Continuous user testing and iteration drive improvements and innovation. 
    The best apps delight users by solving real problems with elegance and simplicity.`,
    likes: 0,
    comments: [],
    showCommentInput: false
  },
  {
    id: 5,
    author: 'Amit Desai',
    domain: 'Cloud',
    title: 'Cloud Computing: The Backbone of Modern IT',
    content: `Cloud computing has become the backbone of modern IT infrastructure. 
    Organizations are migrating to the cloud for scalability, flexibility, and cost savings. 
    Hybrid and multi-cloud strategies are enabling businesses to optimize performance and reliability. 
    Security in the cloud is a top priority, with advanced encryption and access controls protecting sensitive data. 
    DevOps practices are accelerating software delivery through automation and continuous integration. 
    Serverless architectures are reducing operational overhead and enabling rapid innovation. 
    Cloud-native applications are leveraging microservices for modular, maintainable codebases. 
    Data analytics and AI services in the cloud are unlocking new insights and opportunities. 
    The future of cloud computing is edge computing, bringing processing power closer to users. 
    IT professionals must stay updated with cloud trends to remain competitive in the industry.`,
    likes: 0,
    comments: [],
    showCommentInput: false
  }
];

const BlogsSuccessStories = ({onNavigate}) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [commentInputs, setCommentInputs] = useState({});

  const handleLike = (id) => {
    setBlogs(blogs =>
      blogs.map(blog =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const handleShowCommentInput = (id) => {
    setBlogs(blogs =>
      blogs.map(blog =>
        blog.id === id ? { ...blog, showCommentInput: true } : blog
      )
    );
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs(inputs => ({ ...inputs, [id]: value }));
  };

  const handleAddComment = (id) => {
    const comment = commentInputs[id]?.trim();
    if (comment) {
      setBlogs(blogs =>
        blogs.map(blog =>
          blog.id === id
            ? { ...blog, comments: [...blog.comments, comment], showCommentInput: false }
            : blog
        )
      );
      setCommentInputs(inputs => ({ ...inputs, [id]: '' }));
    }
  };

  return (
    <div className="blogs-page-container dashboard-section-card">
      <button
        className="profile-back-btn"
        onClick={() => onNavigate && onNavigate('explore')}
      >
        ← Back
      </button>
       <h2 className="blog-title-description-head">
        <faBook /> Blogs & Success Stories
      </h2>
      <p className="blog-title-description">
        Read inspiring journeys and insights from our alumni and student community.
      </p>
      <div className="blogs-list">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <div className="blog-title-description">
              <span><strong>{blog.domain}</strong> | {blog.author}</span>
            </div>
            <h3 className="blog-title-description">{blog.title}</h3>
            <p className="blog-title-description">{blog.content}</p>
            <div className="blog-actions">
              <button className="blog-like-btn" onClick={() => handleLike(blog.id)}>
                Like {blog.likes > 0 && <span className="blog-likes-count">{blog.likes}</span>}
              </button>
              <button className="blog-comment-btn" onClick={() => handleShowCommentInput(blog.id)}>
                Comment
              </button>
            </div>
            {blog.showCommentInput && (
              <div className="blog-comments-section">
                <input
                  type="text"
                  className="blog-comment-input"
                  placeholder="Add a comment..."
                  value={commentInputs[blog.id] || ''}
                  onChange={e => handleCommentChange(blog.id, e.target.value)}
                />
                <button className="blog-add-comment-btn" onClick={() => handleAddComment(blog.id)}>
                  Add Comment
                </button>
              </div>
            )}
            {blog.comments.length > 0 && (
              <div className="blog-comments-list">
                {blog.comments.map((cmt, idx) => (
                  <div key={idx} className="blog-title-description blog-comment">
                    {cmt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsSuccessStories;