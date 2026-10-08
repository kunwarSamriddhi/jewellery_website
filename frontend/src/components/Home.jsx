import React from 'react';
import Hero from './Hero';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import NewArrivalsSection from './NewArrivalsSection';
import ArtificialJewellerySection from './ArtificialJewellerySection';
import PreciousJewellerySection from './PreciousJewellerySection';
import BrandStory from './BrandStory';
import WhyChooseUs from './WhyChooseUs';
import PromoBanner from './PromoBanner';

const Home = ({ showAlert }) => {
  return (
    <div className="home-page">
      <Hero />
      <CategorySection />
      <ArtificialJewellerySection showAlert={showAlert} />
      <PreciousJewellerySection showAlert={showAlert} />
      <FeaturedProducts showAlert={showAlert} />
      <NewArrivalsSection showAlert={showAlert} />
      <BrandStory />
      <WhyChooseUs />
      <PromoBanner />
    </div>
  );
};

export default Home;