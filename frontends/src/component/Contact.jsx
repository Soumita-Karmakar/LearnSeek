import React, { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0ex1fri",
        "template_t9ne7va",
        form.current,
        "QuftIQrFHXVszN-uy"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message. Please try again later.");
          console.error(error.text);
        }
      );
  };

  return (
    <div
      className="align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #d1f2eb, #ffffff)",
        padding: "2rem",
      }}
    >
      <div className="text-center mb-4" data-aos="fade-down">
        <h2 className="fw-bold text-primary">📞 Contact Us</h2>
        <p className="text-muted w-75 mx-auto">
          Have questions or feedback? Fill out the form and we’ll get back to you shortly.
        </p>
      </div>

      <div className="row g-4">
        {/* Stylish Form */}
        <div className="col-md-7" data-aos="fade-right">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="p-4 rounded-4 shadow"
            style={{
              background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
              border: "1px solid #cce7f0",
            }}
          >
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Your Name</label>
              <input
                type="text"
                name="from_name"
                className="form-control rounded-pill px-4 py-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Email Address</label>
              <input
                type="email"
                name="from_email"
                className="form-control rounded-pill px-4 py-2"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Message</label>
              <textarea
                name="message"
                className="form-control rounded-4 px-4 py-2"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn text-white rounded-pill px-4 py-2"
              style={{
                background: "linear-gradient(to right, #00bcd4, #2196f3)",
                border: "none",
              }}
            >
              🚀 Send Message
            </button>
          </form>
        </div>

        {/* Stylish Support Info */}
        <div className="col-md-5" data-aos="fade-left">
          <div
            className="p-4 rounded-4 shadow-sm border-0 h-100"
            style={{
              background: "#ffffff",
              borderLeft: "5px solid #00bcd4",
            }}
          >
            <h5 className="fw-bold text-primary mb-3">📌 Support Info</h5>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <span className="text-dark">support@learnseek.in</span>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <span className="text-dark">+91 98765 43210</span>
            </p>
            <p className="mb-2">
              <strong>Working Hours:</strong>{" "}
              <span className="text-dark">Mon – Sat, 9:00 AM – 6:00 PM</span>
            </p>

            <hr className="my-3" />

            <h6 className="fw-bold text-secondary mb-2">🌐 Follow Us</h6>
            <p className="d-flex gap-3 fs-5 mb-3">
              <a href="https://facebook.com/learnseek" target="_blank" rel="noreferrer" className="text-primary">
                <FaFacebook />
              </a>
              <a href="https://instagram.com/learnseek" target="_blank" rel="noreferrer" className="text-danger">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/learnseek" target="_blank" rel="noreferrer" className="text-info">
                <FaLinkedin />
              </a>
            </p>

            <p className="text-muted small">⏱️ We usually respond within 24 hours.</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
