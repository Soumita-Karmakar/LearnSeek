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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-8 flex flex-col justify-center">
      <div className="text-center mb-8" data-aos="fade-down">
        <h2 className="text-3xl font-bold text-blue-600">📞 Contact Us</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have questions or feedback? Fill out the form and we’ll get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form */}
        <div className="md:col-span-7" data-aos="fade-right">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="p-6 rounded-xl shadow-md bg-gradient-to-tr from-cyan-50 to-white border border-blue-100"
          >
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="from_name"
                className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="from_email"
                className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full px-6 py-2 font-semibold shadow-md hover:opacity-90"
            >
              🚀 Send Message
            </button>
          </form>
        </div>

        {/* Support Info */}
        <div className="md:col-span-5" data-aos="fade-left">
          <div className="p-6 rounded-xl shadow-sm bg-white border-l-4 border-cyan-500 h-full">
            <h5 className="text-blue-600 font-bold mb-3">📌 Support Info</h5>
            <p className="mb-2">
              <strong>Email:</strong> <span className="text-gray-700">support@learnseek.in</span>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> <span className="text-gray-700">+91 98765 43210</span>
            </p>
            <p className="mb-2">
              <strong>Working Hours:</strong> <span className="text-gray-700">Mon – Sat, 9:00 AM – 6:00 PM</span>
            </p>

            <hr className="my-4" />

            <h6 className="font-bold text-gray-600 mb-2">🌐 Follow Us</h6>
            <div className="flex gap-4 text-xl mb-3">
              <a
                href="https://facebook.com/learnseek"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com/learnseek"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com/company/learnseek"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaLinkedin />
              </a>
            </div>

            <p className="text-gray-500 text-sm">⏱️ We usually respond within 24 hours.</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
