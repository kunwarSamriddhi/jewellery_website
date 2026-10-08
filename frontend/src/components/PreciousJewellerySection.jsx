import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { FaArrowRight } from 'react-icons/fa';

const PreciousJewellerySection = ({ showAlert }) => {
  const { state: { products } } = useContext(ShopContext);

  const preciousPieces = products
    .filter((p) => p.jewelleryType === 'precious' && !p.isFeatured && !p.isNewArrival)
    .slice(0, 4);

  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '2.8rem' }}>
          <span className="section-subtitle">Fine Metals &amp; Gemstones</span>
          <h2 className="section-title">Precious Jewellery</h2>
          <p className="section-description">
            Timeless pieces featuring gold, silver, diamonds and pearls for meaningful occasions.
          </p>
        </div>

        <div className="row g-4">
          {preciousPieces.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <ProductCard product={product} showAlert={showAlert} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.2rem' }}>
          <Link to="/shop?jewelleryType=precious" className="btn-aura-outline">
            Explore All Precious Jewellery <FaArrowRight style={{ fontSize: '0.75rem' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PreciousJewellerySection;
