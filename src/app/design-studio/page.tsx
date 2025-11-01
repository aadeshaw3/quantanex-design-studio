'use client';

import dynamic from 'next/dynamic';

const PCBDesigner = dynamic(() => import('@/components/design-studio/PCBDesigner'), {
  ssr: false
});

export default function DesignStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">PCB Design Studio</h1>
          <p className="mt-2 text-gray-600">
            Create and design PCB layouts with our interactive tool
          </p>
        </div>
        
        <PCBDesigner />
      </div>
    </div>
  );
}