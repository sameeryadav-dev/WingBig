const features = [
  {
    icon: "🏍️",
    title: "Wide Selection",
    text: "Hundreds of bikes across top brands, from commuters to superbikes.",
  },
  {
    icon: "✅",
    title: "Verified Quality",
    text: "Every bike listed is inspected and verified before it goes live.",
  },
  {
    icon: "💬",
    title: "Expert Guidance",
    text: "Our team helps you pick the right bike for your riding style and budget.",
  },
];

const stats = [
  { value: "500+", label: "Bikes Listed" },
  { value: "20+", label: "Brands" },
  { value: "10K+", label: "Happy Riders" },
  { value: "15", label: "Cities Served" },
];

const About = () => {
  return (
    <>
      {/* Page banner */}
      <div className="bg-dark-soft text-white py-5 mb-5">
        <div className="container text-center">
          <p className="text-brand fw-bold mb-1">WHO WE ARE</p>
          <h1 className="display-5 fw-bold">About Us</h1>
          <p className="text-white-50 mb-0 mx-auto" style={{ maxWidth: "600px" }}>
            Welcome to WingBig Bike Showroom. We provide a wide collection of
            bikes from popular brands, all in one place.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Mission */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">Our Mission</h2>
            <p className="text-muted">
              We started WingBig Bike Showroom with a simple goal: make it
              effortless to discover, compare, and buy the perfect bike.
              Whether you're after everyday reliability or pure adrenaline,
              our showroom brings the best two-wheelers together with
              transparent pricing and real specs.
            </p>
            <p className="text-muted mb-0">
              No pressure, no guesswork — just the right bike, right for you.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-3">Why riders choose us</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex align-items-center">
                    <span className="text-brand me-2">●</span>
                    Genuine, up-to-date bike listings
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <span className="text-brand me-2">●</span>
                    Transparent on-road pricing
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <span className="text-brand me-2">●</span>
                    Dedicated support before and after purchase
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="row g-4 mb-5">
          {features.map((feature) => (
            <div className="col-md-4" key={feature.title}>
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="icon-circle mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted mb-0">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-dark-soft text-white rounded-4 p-4 p-md-5 mb-5">
          <div className="row text-center g-4">
            {stats.map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <h2 className="text-brand fw-bold mb-1">{stat.value}</h2>
                <p className="text-white-50 mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
