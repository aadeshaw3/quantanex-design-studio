import AboutHero from '@/components/about/AboutHero';
import CompanyInfo from '@/components/about/CompanyInfo';
import CompanyValues from '@/components/about/CompanyValues';

export const metadata = {
  title: 'About | QuantaNex - Custom Electronics Solutions',
  description: 'Learn about QuantaNex\'s mission, story, and values. We\'re dedicated to providing innovative electronic solutions and empowering creators.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyInfo />
      <CompanyValues />
    </>
  );
}