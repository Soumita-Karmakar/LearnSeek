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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f7f9ff] to-[#e0f7fa] p-8">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="font-bold text-[#0056b3] text-3xl">About LearnSeek</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          LearnSeek bridges the gap between passionate tutors and eager learners. Whether you're a student looking for guidance or a teacher looking to share knowledge, LearnSeek makes it simple, efficient, and impactful.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12 w-full max-w-5xl">
        <div className="bg-[#e3f2fd] p-6 rounded shadow-sm" data-aos="fade-right">
          <h5 className="font-semibold text-[#0277bd] text-lg mb-2">Our Mission</h5>
          <p className="text-gray-600">To make education accessible, personal, and empowering by connecting students and educators directly.</p>
        </div>
        <div className="bg-[#fce4ec] p-6 rounded shadow-sm" data-aos="fade-left">
          <h5 className="font-semibold text-[#c2185b] text-lg mb-2">Our Vision</h5>
          <p className="text-gray-600">To become the most trusted and impactful learning community in India for personalized education.</p>
        </div>
      </div>

      <div className="mb-12 w-full max-w-5xl" data-aos="zoom-in-up">
        <h3 className="text-center font-bold text-2xl mb-6">Who Can Join?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#fff3e0] border-l-4 border-[#fb8c00] p-6 rounded shadow-sm">
            <h6 className="font-bold text-[#ef6c00] mb-2">For Students</h6>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Sign up with name, email, city & class</li>
              <li>Find teachers by subject and city</li>
              <li>View teacher’s profile, availability & reviews</li>
              <li>Post or update your reviews any time</li>
            </ul>
          </div>
          <div className="bg-[#ede7f6] border-l-4 border-[#7e57c2] p-6 rounded shadow-sm">
            <h6 className="font-bold text-[#5e35b1] mb-2">For Teachers</h6>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Sign up with email, city, subjects & experience</li>
              <li>Update your fee, availability, and mode (online/offline)</li>
              <li>Build your profile with ratings & reviews</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12 w-full max-w-6xl">
        <h3 className="text-center font-bold text-2xl mb-6" data-aos="fade-up">Why Choose LearnSeek?</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[{
            title: "Verified Tutors",
            desc: "All profiles are carefully reviewed for authenticity.",
            bg: "#bbdefb",
            text: "#0d47a1"
          }, {
            title: "Smart Matching",
            desc: "Search by city, subject Or Both",
            bg: "#c8e6c9",
            text: "#2e7d32"
          }, {
            title: "Online & Offline Learning",
            desc: "Choose the learning mode that fits your style.",
            bg: "#b2ebf2",
            text: "#00838f"
          }, {
            title: "Transparent Reviews",
            desc: "See honest ratings and feedback from real users.",
            bg: "#ffe0b2",
            text: "#ef6c00"
          }].map((feature, i) => (
            <div
              key={i}
              className="p-4 text-center rounded shadow h-full"
              style={{ backgroundColor: feature.bg }}
              data-aos="fade-up"
            >
              <h6 className="font-semibold mb-1" style={{ color: feature.text }}>{feature.title}</h6>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#f1f8e9] p-8 rounded shadow-sm w-full max-w-6xl mb-12">
        <h3 className="text-center text-[#33691e] text-xl font-semibold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white p-4 rounded shadow">
              <summary className="font-medium cursor-pointer text-gray-800">{faq.question}</summary>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="mb-12 w-full max-w-5xl">
        <h3 className="text-center font-bold text-2xl mb-6" data-aos="fade-up">What Our Users Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#f3e5f5] p-6 rounded shadow" data-aos="zoom-in">
              <p className="text-gray-600 italic">“{t.content}”</p>
              <h6 className="mt-4 text-[#6a1b9a] font-semibold">— {t.name}</h6>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center" data-aos="fade-up">
        <h5 className="font-semibold mb-2 text-lg">Ready to start learning or teaching?</h5>
        <p className="text-gray-600 mb-4">Join LearnSeek and become part of a smarter, simpler education platform.</p>
        <a href="/teacher" className="inline-block bg-[#00897b] text-white px-6 py-2 rounded hover:bg-[#00695c]">Explore Tutors</a>
      </div>
    </div>
  );
};

export default About;
