import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Download, 
  Share, 
  Palette,
  ZoomIn,
  ZoomOut,
  Move,
  Type
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MindMapNode } from '../types';

const mockNodes: MindMapNode[] = [
  {
    id: 'root',
    text: 'React Concepts',
    x: 400,
    y: 300,
    children: ['components', 'state', 'props'],
    color: '#6366F1'
  },
  {
    id: 'components',
    text: 'Components',
    x: 200,
    y: 200,
    children: ['functional', 'class'],
    color: '#10B981'
  },
  {
    id: 'state',
    text: 'State Management',
    x: 600,
    y: 200,
    children: ['useState', 'useReducer'],
    color: '#F59E0B'
  },
  {
    id: 'props',
    text: 'Props',
    x: 400,
    y: 500,
    children: ['passing-data', 'prop-types'],
    color: '#EF4444'
  },
  {
    id: 'functional',
    text: 'Functional Components',
    x: 100,
    y: 100,
    children: [],
    color: '#8B5CF6'
  },
  {
    id: 'class',
    text: 'Class Components',
    x: 300,
    y: 100,
    children: [],
    color: '#8B5CF6'
  },
  {
    id: 'useState',
    text: 'useState Hook',
    x: 700,
    y: 100,
    children: [],
    color: '#06B6D4'
  },
  {
    id: 'useReducer',
    text: 'useReducer Hook',
    x: 500,
    y: 100,
    children: [],
    color: '#06B6D4'
  },
  {
    id: 'passing-data',
    text: 'Passing Data',
    x: 300,
    y: 600,
    children: [],
    color: '#84CC16'
  },
  {
    id: 'prop-types',
    text: 'PropTypes',
    x: 500,
    y: 600,
    children: [],
    color: '#84CC16'
  }
];

export function MindMap() {
  const [nodes, setNodes] = useState<MindMapNode[]>(mockNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [zoom, setZoom] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleNodeDoubleClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setIsEditing(nodeId);
      setEditText(node.text);
    }
  };

  const handleEditSubmit = () => {
    if (isEditing) {
      setNodes(nodes.map(node => 
        node.id === isEditing 
          ? { ...node, text: editText }
          : node
      ));
      setIsEditing(null);
      setEditText('');
    }
  };

  const handleAddNode = () => {
    if (selectedNode) {
      const parentNode = nodes.find(n => n.id === selectedNode);
      if (parentNode) {
        const newNodeId = `node-${Date.now()}`;
        const newNode: MindMapNode = {
          id: newNodeId,
          text: 'New Node',
          x: parentNode.x + Math.random() * 200 - 100,
          y: parentNode.y + Math.random() * 200 - 100,
          children: [],
          color: '#6B7280'
        };
        
        setNodes([
          ...nodes.map(node => 
            node.id === selectedNode 
              ? { ...node, children: [...node.children, newNodeId] }
              : node
          ),
          newNode
        ]);
      }
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode && selectedNode !== 'root') {
      setNodes(nodes.filter(node => {
        if (node.id === selectedNode) return false;
        return true;
      }).map(node => ({
        ...node,
        children: node.children.filter(childId => childId !== selectedNode)
      })));
      setSelectedNode(null);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const renderConnections = () => {
    const connections = [];
    nodes.forEach(node => {
      node.children.forEach(childId => {
        const childNode = nodes.find(n => n.id === childId);
        if (childNode) {
          connections.push(
            <line
              key={`${node.id}-${childId}`}
              x1={node.x}
              y1={node.y}
              x2={childNode.x}
              y2={childNode.y}
              stroke="#E5E7EB"
              strokeWidth="2"
              className="transition-all duration-200"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mind Map</h1>
          <p className="text-gray-600">Visualize concepts and relationships</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <Button variant="ghost" size="sm">
            <Palette className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Toolbar */}
        <Card className="w-16 p-2 mr-4 flex flex-col items-center space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAddNode}
            disabled={!selectedNode}
            title="Add Node"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDeleteNode}
            disabled={!selectedNode || selectedNode === 'root'}
            title="Delete Node"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Text Tool">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Move Tool">
            <Move className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Reset View">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </Card>

        {/* Mind Map Canvas */}
        <Card className="flex-1 p-0 overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            viewBox="0 0 800 600"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Connections */}
            <g>
              {renderConnections()}
            </g>

            {/* Nodes */}
            <g>
              {nodes.map((node) => (
                <g key={node.id}>
                  {/* Node Circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.id === 'root' ? 40 : 30}
                    fill={selectedNode === node.id ? '#4F46E5' : node.color}
                    stroke={selectedNode === node.id ? '#4F46E5' : '#ffffff'}
                    strokeWidth="3"
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node.id)}
                    onDoubleClick={() => handleNodeDoubleClick(node.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />

                  {/* Node Text */}
                  {isEditing === node.id ? (
                    <foreignObject
                      x={node.x - 50}
                      y={node.y - 10}
                      width="100"
                      height="20"
                    >
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEditSubmit}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit()}
                        className="w-full text-xs text-center bg-white border border-gray-300 rounded px-1"
                        autoFocus
                      />
                    </foreignObject>
                  ) : (
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-medium fill-white pointer-events-none select-none"
                      style={{ fontSize: node.id === 'root' ? '14px' : '12px' }}
                    >
                      {node.text.length > 12 ? node.text.substring(0, 12) + '...' : node.text}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </Card>

        {/* Properties Panel */}
        <Card className="w-64 p-4 ml-4">
          <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
          
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Node Text
                </label>
                <input
                  type="text"
                  value={nodes.find(n => n.id === selectedNode)?.text || ''}
                  onChange={(e) => {
                    setNodes(nodes.map(node => 
                      node.id === selectedNode 
                        ? { ...node, text: e.target.value }
                        : node
                    ));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#6B7280'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setNodes(nodes.map(node => 
                          node.id === selectedNode 
                            ? { ...node, color }
                            : node
                        ));
                      }}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Connected Nodes
                </label>
                <div className="text-xs text-gray-600">
                  {nodes.find(n => n.id === selectedNode)?.children.length || 0} connections
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select a node to edit its properties</p>
          )}
        </Card>
      </div>
    </div>
  );
}