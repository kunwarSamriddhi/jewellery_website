import {
  FaGem,
  FaHeart,
  FaSearch,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';

const features = [
  {
    icon: <FaGem />,
    title: "Carefully Selected Designs",
    description: "Discover a handpicked collection of jewellery pieces chosen for their aesthetic balance and charm."
  },
  {
    icon: <FaHeart />,
    title: "Everyday Styles",
    description: "Versatile jewellery that pairs effortlessly with daily routines as well as special occasions."
  },
  {
    icon: <FaSearch />,
    title: "Easy Online Shopping",
    description: "Browse effortlessly with simple category navigation, instant search, and intuitive cart management."
  },
  {
    icon: <FaStar />,
    title: "Explore New Collections",
    description: "Find fresh inspirations across contemporary rings, necklaces, earrings, bracelets, and matching sets."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Shopping Experience",
    description: "Smooth and straightforward order placement with convenient Cash on Delivery."
  }
];

const WhyChooseUs = () => {
  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header">
          <span className="section-subtitle">The AURA Experience</span>
          <h2 className="section-title">Why Shop With Us</h2>
          <p className="section-description">
            Discover simple and elegant jewellery designed to elevate your everyday personal style.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {features.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: '2.5rem 2rem',
                  borderRadius: '3px',
                  border: '1px solid var(--border-color-light)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold-light)',
                    color: 'var(--accent-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
