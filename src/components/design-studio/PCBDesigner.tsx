'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Circle, Line, Path, Group } from 'react-konva';
import type Konva from 'konva';
import { componentSymbols } from './componentSymbols';
import { Component, Wire, ComponentType, BoardState } from './types';
import PropertiesPanel from './PropertiesPanel';

const PCBDesigner: React.FC = () => {
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [components, setComponents] = useState<Component[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  type Tool = ComponentType | 'select' | 'wire';
  const [selectedTool, setSelectedTool] = useState<Tool>('select');
  const [isDrawingWire, setIsDrawingWire] = useState(false);
  const [currentWire, setCurrentWire] = useState<{
    startComponent?: string;
    startPoint?: { x: number; y: number };
    endPoint?: { x: number; y: number };
  }>({});
  const [selectedItems, setSelectedItems] = useState<{ components: string[], wires: string[] }>({
    components: [],
    wires: []
  });
  const [history, setHistory] = useState<{
    past: BoardState[],
    future: BoardState[]
  }>({ past: [], future: [] });
  const [showProperties, setShowProperties] = useState(false);
  const stageRef = useRef<Konva.Stage | null>(null);

  const snapToGrid = (value: number, gridSize: number = 20): number => {
    return Math.round(value / gridSize) * gridSize;
  };

  const rotatePoint = (x: number, y: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: x * Math.cos(radians) - y * Math.sin(radians),
      y: x * Math.sin(radians) + y * Math.cos(radians)
    };
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(prev => 
      prev.map(comp => comp.id === id ? { ...comp, ...updates } : comp)
    );
    saveToHistory();
  };

  const saveToHistory = () => {
    setHistory(prev => ({
      past: [...prev.past, { components, wires }],
      future: []
    }));
  };

  const handleClearBoard = () => {
    setComponents([]);
    setWires([]);
    saveToHistory();
  };

  const handleUndo = () => {
    if (history.past.length === 0) return;
    
    const lastState = history.past[history.past.length - 1];
    setHistory(prev => ({
      past: prev.past.slice(0, -1),
      future: [{ components, wires }, ...prev.future]
    }));
    setComponents(lastState.components);
    setWires(lastState.wires);
  };

  const handleRedo = () => {
    if (history.future.length === 0) return;

    const nextState = history.future[0];
    setHistory(prev => ({
      past: [...prev.past, { components, wires }],
      future: prev.future.slice(1)
    }));
    setComponents(nextState.components);
    setWires(nextState.wires);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && (selectedItems.components.length > 0 || selectedItems.wires.length > 0)) {
        setHistory(prev => ({
          past: [...prev.past, { components, wires }],
          future: []
        }));
        setComponents(prev => prev.filter(comp => !selectedItems.components.includes(comp.id)));
        setWires(prev => prev.filter(wire => !selectedItems.wires.includes(wire.id)));
        setSelectedItems({ components: [], wires: [] });
      } else if (e.key === 'r' && selectedItems.components.length > 0) {
        setHistory(prev => ({
          past: [...prev.past, { components, wires }],
          future: []
        }));
        setComponents(prev =>
          prev.map(comp =>
            selectedItems.components.includes(comp.id)
              ? { ...comp, rotation: (comp.rotation + 90) % 360 }
              : comp
          )
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItems, components, wires]);

  useEffect(() => {
    const updateSize = () => {
      const sidebar = 224; // 56px width + padding
      const propertyPanel = showProperties ? 320 : 0;
      const topbarHeight = 64; // toolbar height
      const padding = 48; // 24px padding on each side
      const gridSize = 20; // Size of each grid square
      
      // Calculate raw dimensions
      const rawWidth = Math.max(500, window.innerWidth - sidebar - propertyPanel - padding);
      const rawHeight = Math.max(400, window.innerHeight - topbarHeight - padding);
      
      // Round to nearest grid size to ensure complete squares
      setStageSize({
        width: Math.floor(rawWidth / gridSize) * gridSize,
        height: Math.floor(rawHeight / gridSize) * gridSize
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [showProperties]);

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;
    const snappedX = snapToGrid(pos.x);
    const snappedY = snapToGrid(pos.y);

    if (selectedTool === 'wire') {
      if (!isDrawingWire) {
        // Find if we're clicking on a component's pin
        const startComponent = components.find(comp => {
          const symbol = componentSymbols[comp.type];
          if (!symbol) return false;
          
          return symbol.pins.some(pin => {
            const rotatedPin = rotatePoint(pin.x, pin.y, comp.rotation);
            const pinX = comp.x + rotatedPin.x;
            const pinY = comp.y + rotatedPin.y;
            return Math.abs(pinX - snappedX) < 10 && Math.abs(pinY - snappedY) < 10;
          });
        });

        setIsDrawingWire(true);
        setCurrentWire({
          startComponent: startComponent?.id,
          startPoint: { x: snappedX, y: snappedY }
        });
      } else {
        const endComponent = components.find(comp => {
          const symbol = componentSymbols[comp.type];
          if (!symbol) return false;
          
          return symbol.pins.some(pin => {
            const rotatedPin = rotatePoint(pin.x, pin.y, comp.rotation);
            const pinX = comp.x + rotatedPin.x;
            const pinY = comp.y + rotatedPin.y;
            return Math.abs(pinX - snappedX) < 10 && Math.abs(pinY - snappedY) < 10;
          });
        });

        if (endComponent?.id !== currentWire.startComponent) {
          const newWire: Wire = {
            id: crypto.randomUUID(),
            startComponent: currentWire.startComponent || '',
            endComponent: endComponent?.id || '',
            startPoint: currentWire.startPoint || { x: 0, y: 0 },
            endPoint: { x: snappedX, y: snappedY }
          };
          setWires(prev => [...prev, newWire]);
          saveToHistory();
        }
        
        setCurrentWire({});
        setIsDrawingWire(false);
      }
    } else if (!['select', 'wire'].includes(selectedTool as string)) {
      const newComponent: Component = {
        id: crypto.randomUUID(),
        type: selectedTool as ComponentType,
        x: snappedX,
        y: snappedY,
        rotation: 0,
        selected: false
      };
      setComponents(prev => [...prev, newComponent]);
      saveToHistory();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Components Sidebar */}
      <div className="flex flex-col w-56 bg-white border-r shadow-sm">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Components</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1.5">
            {Object.values(ComponentType).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTool(type)}
                className={`w-full py-2.5 px-3 text-left rounded-md transition-colors text-sm font-medium ${
                  selectedTool === type
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b bg-white shadow-sm">
          <div className="flex justify-between items-center container mx-auto px-4 py-1">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedTool('select')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedTool === 'select'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Select
              </button>
              <button
                onClick={() => setSelectedTool('wire')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedTool === 'wire'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Wire
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleUndo}
                  disabled={history.past.length === 0}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    history.past.length > 0
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title="Undo (Ctrl+Z)"
                >
                  Undo
                </button>
                <button
                  onClick={handleRedo}
                  disabled={history.future.length === 0}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    history.future.length > 0
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title="Redo (Ctrl+Y)"
                >
                  Redo
                </button>
              </div>

              <div className="h-6 w-px bg-gray-200"></div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowProperties(!showProperties)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    showProperties
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Properties
                </button>
                <button
                  onClick={handleClearBoard}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-red-50 text-red-600"
                >
                  Clear Board
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 bg-gray-50 p-6">
          <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onClick={handleStageClick}
              ref={stageRef}
            >
              <Layer>
                {/* Grid */}
                {/* Ensure we draw one extra line to cover the right edge */}
                {[...Array(Math.ceil(stageSize.width / 20) + 1)].map((_, i) => (
                  <Line
                    key={`v${i}`}
                    points={[i * 20, 0, i * 20, stageSize.height]}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                ))}
                {/* Ensure we draw one extra line to cover the bottom edge */}
                {[...Array(Math.ceil(stageSize.height / 20) + 1)].map((_, i) => (
                  <Line
                    key={`h${i}`}
                    points={[0, i * 20, stageSize.width, i * 20]}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                ))}
                
                {/* Wires */}
                {wires.map((wire) => (
                  <Line
                    key={wire.id}
                    points={[
                      wire.startPoint.x,
                      wire.startPoint.y,
                      wire.endPoint.x,
                      wire.endPoint.y
                    ]}
                    stroke={wire.selected ? '#3b82f6' : '#2563eb'}
                    strokeWidth={2}
                    onClick={() => {
                      setSelectedItems(prev => ({
                        ...prev,
                        wires: [wire.id]
                      }));
                    }}
                  />
                ))}

                {/* Current Wire Being Drawn */}
                {isDrawingWire && currentWire.startPoint && stageRef.current && (
                  <Line
                    points={[
                      currentWire.startPoint.x,
                      currentWire.startPoint.y,
                      currentWire.endPoint?.x ?? snapToGrid(stageRef.current.getPointerPosition()?.x ?? 0),
                      currentWire.endPoint?.y ?? snapToGrid(stageRef.current.getPointerPosition()?.y ?? 0)
                    ]}
                    stroke="#93c5fd"
                    strokeWidth={2}
                    dash={[5, 5]}
                  />
                )}

                {/* Components */}
                {components.map((comp) => {
                  const symbol = componentSymbols[comp.type];
                  if (!symbol) return null;

                  return (
                    <Group
                      key={comp.id}
                      x={comp.x}
                      y={comp.y}
                      rotation={comp.rotation}
                      draggable
                      onClick={() => {
                        setSelectedItems(prev => ({
                          ...prev,
                          components: [comp.id]
                        }));
                      }}
                      onDragEnd={(e) => {
                        const pos = e.target.position();
                        const newPos = {
                          x: snapToGrid(pos.x),
                          y: snapToGrid(pos.y)
                        };
                        e.target.position(newPos);
                        updateComponent(comp.id, { ...comp, ...newPos });
                      }}
                    >
                      <Path
                        data={symbol.path}
                        stroke={selectedItems.components.includes(comp.id) ? '#3b82f6' : '#2563eb'}
                        strokeWidth={2}
                        fill="transparent"
                      />
                      {symbol.pins.map((pin, index) => (
                        <Circle
                          key={index}
                          x={pin.x}
                          y={pin.y}
                          radius={3}
                          fill={selectedItems.components.includes(comp.id) ? '#3b82f6' : '#2563eb'}
                        />
                      ))}
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
          </div>

          {/* Properties Panel - Fixed position */}
          {showProperties && selectedItems.components.length > 0 && components.find(c => c.id === selectedItems.components[0]) && (
            <div className="absolute top-6 right-6 bottom-6 shadow-lg">
              <PropertiesPanel
                component={components.find(c => c.id === selectedItems.components[0]) as Component}
                onUpdate={updateComponent}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCBDesigner;
