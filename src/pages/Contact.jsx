import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Page banner */}
      <div className="bg-dark-soft text-white py-5 mb-5">
        <div className="container text-center">
          <p className="text-brand fw-bold mb-1">GET IN TOUCH</p>
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="text-white-50 mb-0">
            Have a question about a bike? We would love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row g-4">
          {/* Contact info */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Contact Information</h5>

                <div className="d-flex align-items-start mb-4">
                  <div className="icon-circle me-3">📧</div>
                  <div>
                    <p className="mb-0 fw-semibold">Email</p>
                    <p className="text-muted mb-0">
                      sy197136@gmail.com
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <div className="icon-circle me-3">📞</div>
                  <div>
                    <p className="mb-0 fw-semibold">Phone</p>
                    <p className="text-muted mb-0">+91 9326405306</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div className="icon-circle me-3">📍</div>
                  <div>
                    <p className="mb-0 fw-semibold">Showroom</p>
                    <p className="text-muted mb-0">
                      Open Mon - Sat, 10 AM - 9 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Send us a message</h5>

                {submitted && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Thanks for reaching out! We'll get back to you soon.
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSubmitted(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="5"
                        placeholder="Tell us which bike you're interested in..."
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-brand px-4">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
