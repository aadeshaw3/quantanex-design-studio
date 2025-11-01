'use client';


import React from 'react';
import { Component, ComponentType } from './types';

interface PropertyField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: Array<{ value: string; label: string }>;
}

interface PropertiesPanelProps {
  component: Component;
  onUpdate: (id: string, updates: Partial<Component>) => void;
}

const getPropertyFields = (type: ComponentType): PropertyField[] => {
  switch (type) {
    case ComponentType.RESISTOR:
      return [
        { key: 'resistance', label: 'Resistance (Ω)', type: 'text' },
        { key: 'powerRating', label: 'Power Rating (W)', type: 'text' }
      ];
    case ComponentType.CAPACITOR:
      return [
        { key: 'capacitance', label: 'Capacitance (F)', type: 'text' },
        { key: 'voltageRating', label: 'Voltage Rating (V)', type: 'text' }
      ];
    case ComponentType.LED:
      return [
        { key: 'forwardVoltage', label: 'Forward Voltage (V)', type: 'text' },
        { key: 'currentRating', label: 'Current Rating (mA)', type: 'text' },
        { key: 'color', label: 'Color', type: 'text' }
      ];
    case ComponentType.TRANSISTOR:
      return [
        { 
          key: 'transistorType', 
          label: 'Type', 
          type: 'select',
          options: [
            { value: 'npn', label: 'NPN' },
            { value: 'pnp', label: 'PNP' }
          ]
        },
        { key: 'gain', label: 'Gain (hFE)', type: 'text' }
      ];
    case ComponentType.DIODE:
      return [
        { key: 'forwardVoltage', label: 'Forward Voltage (V)', type: 'text' },
        { key: 'maxCurrent', label: 'Max Current (A)', type: 'text' }
      ];
    case ComponentType.INDUCTOR:
      return [
        { key: 'inductance', label: 'Inductance (H)', type: 'text' },
        { key: 'maxCurrent', label: 'Max Current (A)', type: 'text' }
      ];
    case ComponentType.IC:
      return [
        { key: 'partNumber', label: 'Part Number', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' }
      ];
    default:
      return [];
  }
};

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ component, onUpdate }) => {
  const handlePropertyChange = (key: string, value: string | number) => {
    onUpdate(component.id, {
      properties: {
        ...component.properties,
        [key]: value
      }
    });
  };

  const fields = getPropertyFields(component.type);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <input
            type="text"
            value={component.type}
            readOnly
            className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500">X</label>
              <input
                type="number"
                value={component.x}
                onChange={(e) => onUpdate(component.id, { x: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={component.y}
                onChange={(e) => onUpdate(component.id, { y: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rotation (degrees)
          </label>
          <input
            type="number"
            value={component.rotation}
            onChange={(e) => onUpdate(component.id, { rotation: Number(e.target.value) })}
            step={90}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          />
        </div>

        {fields.map(field => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                value={component.properties?.[field.key] || ''}
                onChange={(e) => handlePropertyChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={component.properties?.[field.key] || ''}
                onChange={(e) => handlePropertyChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={component.properties?.notes || ''}
            onChange={(e) => handlePropertyChange('notes', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;