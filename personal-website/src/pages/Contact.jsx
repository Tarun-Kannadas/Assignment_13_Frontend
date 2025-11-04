import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/styles.css";

function Contact() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For form submission
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    email: "",
    message: "",
  });

  // Fetch contact page content from backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        if (!response.ok) throw new Error("Failed to fetch contact data");
        const data = await response.json();
        setContactData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contact data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (optional - posts form to your API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", phone: "", place: "", email: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error submitting message:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!contactData) return <p>No data available</p>;

  const { title, formSection, footer } = contactData;

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

      {/* Contact Section */}
      <section className="form-container">
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>{title}</h1>
        <p style={{ textAlign: "center" }}>{formSection.subtitle}</p>

        <form onSubmit={handleSubmit} className="contact-form">
          {formSection.fields.map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows="5"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div style={{ marginTop: "10px" }}>
            {formSection.buttons.map((button, index) => (
              <button
                key={index}
                id={button.id}
                type={button.type}
                onClick={button.type === "reset" ? () => setFormData({
                  name: "",
                  phone: "",
                  place: "",
                  email: "",
                  message: "",
                }) : undefined}
              >
                {button.label}
              </button>
            ))}
          </div>
        </form>
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

export default Contact;
