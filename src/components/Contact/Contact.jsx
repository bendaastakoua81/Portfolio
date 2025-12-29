import { useState } from "react";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      if (!window.emailjs) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      if (!window.emailjs.initialized) {
        window.emailjs.init("p-5CqOMpD_cU6Ixpb");
        window.emailjs.initialized = true;
      }

      await window.emailjs.send("service_8zba81d", "template_tvoxxye", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setStatus("Message sent successfully! 🎉");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send. Please try again.");
      console.error("EmailJS error:", error);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>Get In Touch</h2>

      <div className={styles.contactCard}>
        <h3>Send Me a Message</h3>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Hi! I'd love to connect..."
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>

          {status && (
            <p
              style={{
                marginTop: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {status}
            </p>
          )}
        </form>

        <div className={styles.contactLinks}>
          <p>
            Email:{" "}
            <a href="mailto:bendaastakoua77@email.com">
              bendaastakoua77@email.com
            </a>
          </p>
          <p>
            GitHub:
            <a
              href="https://github.com/bendaastakoua81"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/bendaastakoua81
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
