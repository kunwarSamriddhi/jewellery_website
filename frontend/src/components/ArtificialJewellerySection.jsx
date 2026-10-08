import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { FaArrowRight } from 'react-icons/fa';

const ArtificialJewellerySection = ({ showAlert }) => {
  const { state: { products } } = useContext(ShopContext);

  const artificialPieces = products
    .filter((p) => p.jewelleryType === 'artificial' && !p.isFeatured && !p.isNewArrival)
    .slice(0, 4);

  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '2.8rem' }}>
          <span className="section-subtitle">Everyday Fashion Jewellery</span>
          <h2 className="section-title">Artificial Jewellery</h2>
          <p className="section-description">
            Contemporary pieces designed for everyday styling and effortless layering.
          </p>
        </div>

        <div className="row g-4">
          {artificialPieces.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <ProductCard product={product} showAlert={showAlert} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.2rem' }}>
          <Link to="/shop?jewelleryType=artificial" className="btn-aura-outline">
            Explore All Artificial Jewellery <FaArrowRight style={{ fontSize: '0.75rem' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtificialJewellerySection;
