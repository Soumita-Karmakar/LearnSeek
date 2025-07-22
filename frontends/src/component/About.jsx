import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const testimonials = [
    {
      name: "Riya Sharma",
      content:
        "LearnSeek helped me find the best teacher for Math! I finally started loving the subject.",
    },
    {
      name: "Amit Das",
      content:
        "As a tutor, I reached more students than ever before. Great experience using this platform.",
    },
    {
      name: "Sneha Mukherjee",
      content:
        "Very user-friendly and easy to find teachers by location and subject. Highly recommended!",
    },
  ];

  const faqs = [
    {
      question: "How do I find the right tutor?",
      answer:
        "Search by subject and city. You can also view ratings and reviews to choose the best fit.",
    },
    {
      question: "Can I contact the tutor before booking?",
      answer:
        "Yes, you can chat with tutors directly to clear any doubts.",
    },
    {
      question: "Are offline classes available?",
      answer:
        "Yes, tutors list whether they offer online, offline, or both modes of teaching.",
    },
  ];

  return (
     <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f7f9ff, #e0f7fa)",
        padding: "2rem",
      }}
    >
   
      <div className="text-center mb-5" data-aos="fade-up">
        <h2 className="fw-bold" style={{ color: "#0056b3" }}>About LearnSeek</h2>
        <p className="text-bright w-75 mx-auto">
          LearnSeek bridges the gap between passionate tutors and eager learners. Whether you're a student looking for guidance or a teacher looking to share knowledge, LearnSeek makes it simple, efficient, and impactful.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6" data-aos="fade-right">
          <div className="p-4 rounded shadow-sm h-100" style={{ backgroundColor: "#e3f2fd" }}>
            <h5 className="fw-semibold" style={{ color: "#0277bd" }}>Our Mission</h5>
            <p className="text-secondary">
              To make education accessible, personal, and empowering by connecting students and educators directly.
            </p>
          </div>
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <div className="p-4 rounded shadow-sm h-100" style={{ backgroundColor: "#fce4ec" }}>
            <h5 className="fw-semibold" style={{ color: "#c2185b" }}>Our Vision</h5>
            <p className="text-secondary">
              To become the most trusted and impactful learning community in India for personalized education.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5" data-aos="zoom-in-up">
        <h3 className="text-center fw-bold mb-4">Who Can Join?</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="shadow-sm p-4 rounded h-100" style={{ backgroundColor: "#fff3e0", borderLeft: "5px solid #fb8c00" }}>
              <h6 className="fw-bold" style={{ color: "#ef6c00" }}>For Students</h6>
              <ul className="text-muted ps-3">
                <li>Sign up with name, email, city & class</li>
                <li>Find teachers by subject and city</li>
                <li>View teacher’s profile, availability & reviews</li>
                <li>Post or update your reviews any time</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow-sm p-4 rounded h-100" style={{ backgroundColor: "#ede7f6", borderLeft: "5px solid #7e57c2" }}>
              <h6 className="fw-bold" style={{ color: "#5e35b1" }}>For Teachers</h6>
              <ul className="text-muted ps-3">
                <li>Sign up with email, city, subjects & experience</li>
                <li>Update your fee, availability, and mode (online/offline)</li>
                <li>Build your profile with ratings & reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-center fw-bold mb-4" data-aos="fade-up">
          Why Choose LearnSeek?
        </h3>
        <div className="row g-4">
          {[
            {
              title: "Verified Tutors",
              desc: "All profiles are carefully reviewed for authenticity.",
              bg: "#bbdefb",
              text: "#0d47a1",
            },
            {
              title: "Smart Matching",
              desc: "Search by city, subject Or Both",
              bg: "#c8e6c9",
              text: "#2e7d32",
            },
            {
              title: "Online & Offline Learning",
              desc: "Choose the learning mode that fits your style.",
              bg: "#b2ebf2",
              text: "#00838f",
            },
            {
              title: "Transparent Reviews",
              desc: "See honest ratings and feedback from real users.",
              bg: "#ffe0b2",
              text: "#ef6c00",
            },
          ].map((feature, i) => (
            <div className="col-md-3" key={i} data-aos="fade-up">
              <div
                className="p-4 rounded text-center h-100 shadow"
                style={{ backgroundColor: feature.bg }}
              >
                <h6 className="fw-semibold" style={{ color: feature.text }}>{feature.title}</h6>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded shadow-sm my-5" style={{ backgroundColor: "#f1f8e9" }}>
        <h3 className="text-center mb-4" style={{ color: "#33691e" }}>Frequently Asked Questions</h3>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`faq${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-center fw-bold mb-4" data-aos="fade-up">What Our Users Say</h3>
        <div className="row g-4">
          {testimonials.map((t, i) => (
            <div className="col-md-4" key={i} data-aos="zoom-in">
              <div className="p-4 rounded h-100 shadow" style={{ backgroundColor: "#f3e5f5" }}>
                <p className="text-muted">“{t.content}”</p>
                <h6 className="mt-3" style={{ color: "#6a1b9a" }}>— {t.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <h5 className="fw-semibold mb-2">Ready to start learning or teaching?</h5>
        <p className="text-muted mb-3">
          Join LearnSeek and become part of a smarter, simpler education platform.
        </p>
        <a href="/teacher" className="btn px-4 py-2" style={{ backgroundColor: "#00897b", color: "#fff" }}>Explore Tutors</a>
      </div>
    </div>
  );
};

export default About;