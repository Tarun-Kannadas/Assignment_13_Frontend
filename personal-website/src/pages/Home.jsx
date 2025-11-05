import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/styles.css";
import leftImage from "../assets/images/left_image.png";
import rightImage from "../assets/images/givespin.png";
import jobPortal from '../assets/images/job_portal.png';
import portfolioWordpress from '../assets/images/portfolio_wordpress.png';
import solarSecure from '../assets/images/solar_secure_solutions.png';
import androidExp from '../assets/images/android_experience.png';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");
        if (!response.ok) throw new Error("Failed to fetch home data");
        const data = await response.json();

        console.log("Home Data fetched:", data);

        // Since your API returns an OBJECT (not array)
        setHomeData(data);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;
  if (!homeData) return <p>No data available</p>;

  const { heroSection, whatIDoSection, experiencesSection, footer } = homeData;

  const imageMap = {
  "images/job_portal.png": jobPortal,
  "images/portfolio_wordpress.png": portfolioWordpress,
  "images/solar_secure_solutions.png": solarSecure,
  "images/android_experience.png": androidExp
};

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Hero Section */}
      <div className="hero_section">
        <h1 className="h1_hero">{heroSection.heading}</h1>
        <p className="p_hero">{heroSection.description}</p>
        <a href={heroSection.linkURL} className="about_link" target="_blank" rel="noopener noreferrer">
          {heroSection.linkText}
        </a>
      </div>

      {/* What I Do Section */}
      <section className="section-block">
        <h2>{whatIDoSection.title}</h2>
        <div className="whatido-wrapper">

          {/* Left block */}
          <div className="image-block">
            <a href={whatIDoSection.leftBlock.link} className="linkwork" target="_blank" rel="noopener noreferrer">
              <img src={leftImage} alt={whatIDoSection.leftBlock.heading} />
              <h3 className="workbtn">{whatIDoSection.leftBlock.heading}</h3>
            </a>
          </div>

          {/* Middle text */}
          <div className="whatido-text">
            <p>{whatIDoSection.middleText}</p>
          </div>

          {/* Right block */}
          <div className="image-block">
            <a href={whatIDoSection.rightBlock.link} className="linkwork" target="_blank" rel="noopener noreferrer">
              <img src={rightImage} alt={whatIDoSection.rightBlock.heading} />
              <h3 className="workbtn">{whatIDoSection.rightBlock.heading}</h3>
            </a>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="projects">
        <h2>{experiencesSection.title}</h2>
        <div className="project-grid">
          {experiencesSection.projects.map((project, index) => (
            <a key={index} href={project.link} target="_blank" rel="noopener noreferrer">
              <img src={imageMap[project.image]} alt={project.alt} />
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-title">
            © {footer.year} {footer.developerName} | Designed & Developed by Me
          </p>
          <div className="footer-links">
            <div className="quick-links">
              <h4>Quick Links</h4>
              {footer.quickLinks.map((link, index) => (
                <Link key={index} to={`/${link.toLowerCase()}`}>{link}</Link>
              ))}
            </div>
            <div className="social-links">
              <h4>Connect</h4>
              <a href={footer.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={footer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={footer.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className="contact-details">
              <h4>Contact</h4>
              <p>Email: <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a></p>
              <p>Phone: {footer.contact.phone}</p>
              <p>{footer.contact.location}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
