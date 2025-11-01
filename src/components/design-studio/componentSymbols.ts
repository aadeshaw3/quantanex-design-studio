import { ComponentType, ComponentSymbol } from './types';

export const componentSymbols: Partial<Record<ComponentType, ComponentSymbol>> = {
  [ComponentType.RESISTOR]: {
    path: 'M -20 0 L -10 0 L -7 -5 L -3 5 L 1 -5 L 5 5 L 9 -5 L 10 0 L 20 0',
    width: 40,
    height: 10,
    pins: [
      { x: -20, y: 0 },
      { x: 20, y: 0 }
    ]
  },
  [ComponentType.CAPACITOR]: {
    path: 'M -20 0 L -5 0 M -5 -15 L -5 15 M 5 -15 L 5 15 M 5 0 L 20 0',
    width: 40,
    height: 30,
    pins: [
      { x: -20, y: 0 },
      { x: 20, y: 0 }
    ]
  },
  [ComponentType.LED]: {
    path: 'M -20 0 L -10 0 M -10 -10 L -10 10 M 10 -10 L 10 10 M 10 0 L 20 0 M -10 0 L 10 0 M 5 -5 L 10 0 L 5 5 M 0 -5 L 5 0 L 0 5',
    width: 40,
    height: 20,
    pins: [
      { x: -20, y: 0 },
      { x: 20, y: 0 }
    ]
  },
  [ComponentType.TRANSISTOR]: {
    path: 'M -20 -15 L -10 -15 M -10 -15 L -10 15 M -10 0 L 5 -10 M -10 0 L 5 10 M 5 -15 L 5 -10 M 5 10 L 5 15 M 5 -15 L 20 -15 M 5 15 L 20 15',
    width: 40,
    height: 30,
    pins: [
      { x: -20, y: -15 }, // Base
      { x: 20, y: -15 },  // Collector
      { x: 20, y: 15 }    // Emitter
    ]
  },
  [ComponentType.INDUCTOR]: {
    path: 'M -20 0 C -15 0 -15 -10 -10 -10 C -5 -10 -5 10 0 10 C 5 10 5 -10 10 -10 C 15 -10 15 0 20 0',
    width: 40,
    height: 20,
    pins: [
      { x: -20, y: 0 },
      { x: 20, y: 0 }
    ]
  },
  [ComponentType.DIODE]: {
    path: 'M -20 0 L -10 0 M -10 -10 L -10 10 M -10 0 L 5 -10 L 5 10 L -10 0 M 5 -10 L 5 10 M 5 0 L 20 0',
    width: 40,
    height: 20,
    pins: [
      { x: -20, y: 0 },
      { x: 20, y: 0 }
    ]
  },
  [ComponentType.IC]: {
    path: 'M -20 -15 L 20 -15 L 20 15 L -20 15 L -20 -15',
    width: 40,
    height: 30,
    pins: [
      { x: -15, y: 15 }, // Bottom pins
      { x: -5, y: 15 },
      { x: 5, y: 15 },
      { x: 15, y: 15 },
      { x: -15, y: -15 }, // Top pins
      { x: -5, y: -15 },
      { x: 5, y: -15 },
      { x: 15, y: -15 }
    ]
  }
};