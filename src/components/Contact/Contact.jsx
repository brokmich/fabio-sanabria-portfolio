import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import backgroundImg from "../../assets/background.png";
import cowImg from "../../assets/cow.png";
import "./Contact.css";

const EMAILJS_SERVICE_ID = "service_fasv2002";
const EMAILJS_TEMPLATE_ID = "template_ro7xl0w";
const EMAILJS_PUBLIC_KEY = "GhfLgQv4wjSYXhhI3";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/fabiosanabria",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fabio-andr%C3%A9s-sanabria-valer%C3%ADn-b3b040359/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:fasav12@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: form.name,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="contact__header"
        >
          <p className="section-label">// TRANSMIT.MSG</p>
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-sub">
            Have a project in mind or just want to talk code and games? Send a
            message — I read every one.
          </p>
        </motion.div>

        <div className="contact__layout">
          {/* Terminal form */}
          <motion.div
            className="contact__terminal pixel-border"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Window chrome */}
            <div className="contact__terminal-bar">
              <span className="term-dot term-dot--red" />
              <span className="term-dot term-dot--yellow" />
              <span className="term-dot term-dot--green" />
              <span className="term-title">bash — fabio@dev:~</span>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__label" htmlFor="name">
                  <span className="contact__prompt">{">"}_</span> NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="email">
                  <span className="contact__prompt">{">"}_</span> EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="message">
                  <span className="contact__prompt">{">"}_</span> MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="What's on your mind?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary contact__submit"
                disabled={status === "sending"}
              >
                {status === "sent"
                  ? "✓ MESSAGE SENT"
                  : status === "sending"
                    ? "... SENDING"
                    : "[ SEND_MESSAGE ]"}
              </button>

              {status === "sent" && (
                <p className="contact__success">
                  ✓ Message received! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="contact__error">
                  ✗ Something went wrong. Try again or email me directly.
                </p>
              )}
            </form>
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="contact__info-block pixel-border">
              <p className="contact__info-label section-label">STATUS</p>
              <p className="contact__status-badge">
                <span className="contact__status-dot" />
                Available for new opportunities
              </p>
              <p className="contact__info-text">
                Currently open to full-time roles, freelance projects, and
                interesting collaborations. Response time is usually within 24
                hours.
              </p>
            </div>

            <div className="contact__socials">
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>
                FIND ME AT
              </p>
              <div className="contact__social-links">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="contact__social-link"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <p className="contact__footer-text">
          <span className="contact__footer-pixel">◆</span> Designed &amp; built
          by Michelle Fonseca & Fabio Sanabria{" "}
          <span className="contact__footer-pixel">◆</span>
        </p>
        <div
          className="contact__footer-hills"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <img src={cowImg} alt="" className="contact__footer-cow contact__footer-cow--left" />
          <img src={cowImg} alt="" className="contact__footer-cow contact__footer-cow--right" />
        </div>
      </div>
    </section>
  );
}
