import CareersHero from '@/components/careers/CareersHero';
import JobListings from '@/components/careers/JobListings';

export const metadata = {
  title: 'Careers | QuantaNex - Custom Electronics Solutions',
  description: 'Join our team at QuantaNex. We\'re looking for talented individuals passionate about electronics and innovation.',
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <JobListings />
    </>
  );
}