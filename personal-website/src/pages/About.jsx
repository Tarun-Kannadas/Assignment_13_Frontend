import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/styles.css";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try 
      {
        const response = await fetch('http://localhost:5000/api/about');
        if (!response.ok) throw new Error('Failed to fetch about data');
        const data = await response.json();
        setAboutData(data);
      } 
      catch (err) 
      {
        setError(err.message);
        console.error('Error fetching about data:', err);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading page: {error}</p>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="error-container">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <section className="about_me">
        <h2>{aboutData.aboutMe.heading}</h2>
        <p>{aboutData.aboutMe.content}</p>

        <h2>{aboutData.skillsSection.heading}</h2>
        <ul className="skills">
          {aboutData.skillsSection.skillsList.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h2>{aboutData.goalsSection.heading}</h2>
        <p>{aboutData.goalsSection.goalDescription}</p>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-title">
            © {aboutData.footer.year} {aboutData.footer.developerName} | Designed & Developed by Me
          </p>
          <div className="footer-links">
            <div className="quick-links">
              <h4>Quick Links</h4>
              <Link to={aboutData.footer.quickLinks.home}>Home</Link>
              <Link to={aboutData.footer.quickLinks.about}>About</Link>
              <Link to={aboutData.footer.quickLinks.contact}>Contact</Link>
            </div>
            <div className="social-links">
              <h4>Connect</h4>
              <a 
                href={aboutData.footer.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href={aboutData.footer.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a 
                href={aboutData.footer.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
            <div className="contact-details">
              <h4>Contact</h4>
              <p>
                Email: <a href={`mailto:${aboutData.footer.contactDetails.email}`}>
                  {aboutData.footer.contactDetails.email}
                </a>
              </p>
              <p>Phone: {aboutData.footer.contactDetails.phone}</p>
              <p>{aboutData.footer.contactDetails.location}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default About;