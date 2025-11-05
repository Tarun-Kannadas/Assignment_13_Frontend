import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/styles.css";

function Contact() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [warning, setWarning] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        if (!response.ok) throw new Error("Failed to fetch contact data");
        const data = await response.json();
        
        const pageData = Array.isArray(data) ? data[0] : data;
        setContactData(pageData);
        
        const initialFormData = {};
        pageData.formSection.fields.forEach(field => {
          initialFormData[field.name] = '';
        });
        setFormData(initialFormData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contact data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setWarning("");
  };

  const validationCheck = (e) => {
    e.preventDefault();
    
    // Check required fields
    const requiredFields = contactData.formSection.fields.filter(f => f.required);
    for (let field of requiredFields) {
      if (!formData[field.name] || formData[field.name].trim() === '') {
        setWarning(`Please fill in the ${field.label} field.`);
        return;
      }
    }

    // Email validation
    const emailField = contactData.formSection.fields.find(f => f.type === 'email');
    if (emailField && formData[emailField.name]) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData[emailField.name])) {
        setWarning('Please enter a valid email address.');
        return;
      }
    }

    // If validation passes, show popup
    setWarning('');
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const confirmSubmit = () => {
    // Reset form after confirmation
    const resetData = {};
    contactData.formSection.fields.forEach(field => {
      resetData[field.name] = '';
    });
    setFormData(resetData);
    setShowPopup(false);
    setWarning('Message submitted successfully!');
    
    setTimeout(() => {
      setWarning('');
    }, 3000);
  };

  const clearMsg = (e) => {
    e.preventDefault();
    const resetData = {};
    contactData.formSection.fields.forEach(field => {
      resetData[field.name] = '';
    });
    setFormData(resetData);
    setWarning('');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>No data available</p>
      </div>
    );
  }

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

      {/* Contact Form Section */}
      <section className="form-container">
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>
          {contactData.title}
        </h1>
        <p style={{ textAlign: "center" }}>
          {contactData.subtitle}
        </p>

        <form 
          id="contactForm"
          className="contact-form" 
          onSubmit={validationCheck}
        >
          {contactData.formSection.fields.map((field, index) => (
            <div key={field._id || index}>
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span style={{ color: 'red' }}> *</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows="5"
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="button-group">
            {contactData.formSection.buttons.map((btn, index) => (
              <button
                key={btn._id || index}
                id={btn.id}
                type={btn.type === 'reset' ? 'button' : btn.type}
                onClick={btn.type === 'reset' ? clearMsg : undefined}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </form>

        <p 
          id="warning" 
          style={{ 
            color: warning.includes('success') ? 'green' : 'red',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          {warning || <br />}
        </p>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Form Submission Details</h2>
              <button className="close-btn" onClick={closePopup}>&times;</button>
            </div>
            <div className="popup-body">
              {contactData.formSection.fields.map((field, index) => (
                <div key={index} className="popup-field">
                  <strong>{field.label}:</strong>
                  <p>{formData[field.name] || 'Not provided'}</p>
                </div>
              ))}
            </div>
            <div className="popup-footer">
              <button className="btn-confirm" onClick={confirmSubmit}>
                Confirm & Submit
              </button>
              <button className="btn-cancel" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-title">
            {contactData.footer.copyright}
          </p>
          <div className="footer-links">
            <div className="quick-links">
              <h4>Quick Links</h4>
              {contactData.footer.quickLinks.map((link, index) => (
                <Link key={link._id || index} to={`/${link.url.replace('.html', '')}`}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="social-links">
              <h4>Connect</h4>
              {contactData.footer.socialLinks.map((link, index) => (
                <a 
                  key={link._id || index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              ))}
            </div>
            <div className="contact-details">
              <h4>Contact</h4>
              <p>
                Email: <a href={`mailto:${contactData.footer.contactDetails.email}`}>
                  {contactData.footer.contactDetails.email}
                </a>
              </p>
              <p>Phone: {contactData.footer.contactDetails.phone}</p>
              <p>{contactData.footer.contactDetails.location}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Contact;