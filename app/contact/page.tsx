"use client";

import { useState } from "react";

// Install EmailJS: npm install @emailjs/browser
// Then replace the three placeholder strings below with your EmailJS credentials.
// Setup guide: https://www.emailjs.com/docs/tutorial/overview/
const EMAILJS_PUBLIC_KEY = "1-z4nnYxPi4yECmr-";
const EMAILJS_SERVICE_ID = "service_sw82ue4";
const EMAILJS_TEMPLATE_ID = "template_kq89fh7";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Dynamically import EmailJS to keep bundle light
      const emailjs = await import("@emailjs/browser");
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "srijan.082msise017@tcioe.edu.np",
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-gray-800 px-6 py-6 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
      {/* Subtle gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Get In Touch!
      </h1>

      {/* Contact Information Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center shadow-sm">
          <div className="text-4xl mb-3">📧</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
          <a
            href="mailto:srijan.082msise017@tcioe.edu.np"
            className="text-blue-600 hover:text-blue-500 break-all text-sm"
          >
            srijan.082msise017@tcioe.edu.np
          </a>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center shadow-sm">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
          <a
            href="tel:+977-981-057-0014"
            className="text-blue-600 hover:text-blue-500"
          >
            +977 981 057 0014
          </a>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center shadow-sm">
          <div className="text-4xl mb-3">📍</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
          <p className="text-gray-500">Kathmandu, Nepal</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
        Send Me a Message
      </h2>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200 relative overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-60 rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-100 opacity-60 rounded-full -ml-12 -mb-12 pointer-events-none" />

        {submitted ? (
          <div className="text-center py-16 relative z-10">
            <div className="text-green-500 text-6xl mb-6">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Thanks for reaching out!
            </h2>
            <p className="text-gray-500 mb-8">I&apos;ll get back to you shortly.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition duration-200"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition duration-200 resize-none"
                placeholder="Write your message"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}