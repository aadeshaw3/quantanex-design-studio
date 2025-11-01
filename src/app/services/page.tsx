import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';

export const metadata = {
  title: 'Services | QuantaNex - Custom Electronics Solutions',
  description: 'Explore our comprehensive electronics design and development services. From PCB design to embedded systems, we provide professional solutions for your needs.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
    </>
  );
}