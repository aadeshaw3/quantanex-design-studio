import ComingSoon from '@/components/shared/ComingSoon';

export const metadata = {
  title: 'Shop | QuantaNex - Custom Electronics Solutions',
  description: 'Coming Soon: Our online shop for electronic components, development kits, and custom designs.',
};

const features = [
  {
    icon: '🔌',
    title: 'Electronic Components',
    description: 'Wide selection of high-quality electronic components from trusted manufacturers.',
  },
  {
    icon: '📦',
    title: 'Development Kits',
    description: 'Curated development kits and starter packages for various project types.',
  },
  {
    icon: '⚡',
    title: 'Custom Designs',
    description: 'Purchase ready-made designs or commission custom electronic solutions.',
  },
];

export default function ShopPage() {
  return (
    <ComingSoon
      title="Online Shop"
      description="Our e-commerce platform is under development! Soon you'll be able to purchase components, kits, and custom designs directly from our website."
      features={features}
    />
  );
}