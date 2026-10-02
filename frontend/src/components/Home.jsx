import React from 'react';
import Hero from './Hero';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import BrandStory from './BrandStory';
import WhyChooseUs from './WhyChooseUs';
import PromoBanner from './PromoBanner';

const Home = ({ showAlert }) => {
  return (
    <div className="home-page">
      <Hero />
      <CategorySection />
      <FeaturedProducts showAlert={showAlert} />
      <BrandStory />
      <WhyChooseUs />
      <PromoBanner />
    </div>
  );
};

export default Home;