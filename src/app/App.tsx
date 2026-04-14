import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedJourney } from './components/FeaturedJourney';
import { FeelingCategories } from './components/FeelingCategories';
import { Testimonial } from './components/Testimonial';
import { FooterCTA } from './components/FooterCTA';

export default function App() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedJourney />
      <FeelingCategories />
      <Testimonial />
      <FooterCTA />
    </main>
  );
}
