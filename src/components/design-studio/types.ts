export enum ComponentType {
  RESISTOR = 'resistor',
  CAPACITOR = 'capacitor',
  LED = 'led',
  TRANSISTOR = 'transistor',
  INDUCTOR = 'inductor',
  DIODE = 'diode',
  IC = 'ic',
}

export interface Component {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  rotation: number;
  selected?: boolean;
  properties?: {
    [key: string]: string | number;
  };
}

export interface Wire {
  id: string;
  startComponent: string;
  endComponent: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  selected?: boolean;
}

export interface ComponentSymbol {
  path: string;
  width: number;
  height: number;
  pins: Array<{ x: number; y: number }>;
}

export interface BoardState {
  components: Component[];
  wires: Wire[];
}