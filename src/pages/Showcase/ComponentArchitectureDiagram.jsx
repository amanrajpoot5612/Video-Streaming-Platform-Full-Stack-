import React, { useState } from 'react';

const ComponentArchitectureDiagram = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeData = {
    // Entry Point
    'A': { label: 'App.jsx - Root Component', group: 'entry', x: 350, y: 50 },
    'B': { label: 'index.js - Entry Point', group: 'entry', x: 500, y: 50 },
    
    // Routing System
    'C': { label: 'React Router', group: 'routing', x: 350, y: 150 },
    'D': { label: 'Public Routes', group: 'routing', x: 250, y: 200 },
    'E': { label: 'Protected Routes', group: 'routing', x: 450, y: 200 },
    
    // Authentication Layer
    'F': { label: 'Login Component', group: 'auth', x: 150, y: 300 },
    'G': { label: 'Register Component', group: 'auth', x: 300, y: 300 },
    'H': { label: 'Auth Context/Provider', group: 'auth', x: 450, y: 300 },
    'I': { label: 'JWT Token Management', group: 'auth', x: 600, y: 300 },
    'J': { label: 'Protected Route Component', group: 'auth', x: 550, y: 250 },
    
    // Core Pages
    'K': { label: 'Home Page', group: 'pages', x: 50, y: 450 },
    'L': { label: 'Video Upload Page', group: 'pages', x: 200, y: 450 },
    'M': { label: 'Video Player Page', group: 'pages', x: 350, y: 450 },
    'N': { label: 'Watch History Page', group: 'pages', x: 500, y: 450 },
    'O': { label: 'Search Results Page', group: 'pages', x: 650, y: 450 },
    'P': { label: 'User Profile Page', group: 'pages', x: 800, y: 450 },
    
    // Reusable Components
    'Q': { label: 'Video Card Component', group: 'components', x: 50, y: 600 },
    'R': { label: 'Video Player Component', group: 'components', x: 200, y: 600 },
    'S': { label: 'Navigation Header', group: 'components', x: 350, y: 600 },
    'T': { label: 'Search Bar Component', group: 'components', x: 500, y: 600 },
    'U': { label: 'Upload Form Component', group: 'components', x: 650, y: 600 },
    'V': { label: 'Video Metadata Component', group: 'components', x: 800, y: 600 },
    'W': { label: 'Loading Spinner', group: 'components', x: 950, y: 600 },
    'X': { label: 'Error Boundary', group: 'components', x: 1100, y: 600 },
    
    // State Management
    'Y': { label: 'Context API/Redux Store', group: 'state', x: 200, y: 750 },
    'Z': { label: 'Auth State', group: 'state', x: 350, y: 750 },
    'AA': { label: 'Video State', group: 'state', x: 500, y: 750 },
    'BB': { label: 'User Data State', group: 'state', x: 650, y: 750 },
    'CC': { label: 'Search State', group: 'state', x: 800, y: 750 },
    
    // API Service Layer
    'DD': { label: 'Axios HTTP Client', group: 'api', x: 200, y: 900 },
    'EE': { label: 'Auth API Service', group: 'api', x: 350, y: 900 },
    'FF': { label: 'Video API Service', group: 'api', x: 500, y: 900 },
    'GG': { label: 'User API Service', group: 'api', x: 650, y: 900 },
    'HH': { label: 'Search API Service', group: 'api', x: 800, y: 900 },
    
    // Utils & Helpers
    'II': { label: 'Token Utils', group: 'utils', x: 50, y: 1050 },
    'JJ': { label: 'Date Formatters', group: 'utils', x: 200, y: 1050 },
    'KK': { label: 'Video URL Validators', group: 'utils', x: 350, y: 1050 },
    'LL': { label: 'Error Handlers', group: 'utils', x: 500, y: 1050 },
    'MM': { label: 'Constants', group: 'utils', x: 650, y: 1050 },
    
    // Backend Integration
    'NN': { label: 'Backend API - Node.js/Express', group: 'backend', x: 350, y: 1200 },
    'OO': { label: 'MongoDB Database', group: 'backend', x: 500, y: 1200 },
    'PP': { label: 'File Storage System', group: 'backend', x: 650, y: 1200 },
    
    // External Libraries
    'QQ': { label: 'React Player', group: 'external', x: 950, y: 750 },
    'RR': { label: 'Tailwind CSS', group: 'external', x: 1100, y: 750 },
    'SS': { label: 'React Icons', group: 'external', x: 1250, y: 750 },
    'TT': { label: 'React Hook Form', group: 'external', x: 1400, y: 750 }
  };

  const connections = [
    { from: 'B', to: 'A' },
    { from: 'A', to: 'C' },
    { from: 'C', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'E', to: 'J' },
    { from: 'J', to: 'H' },
    { from: 'H', to: 'F' },
    { from: 'H', to: 'G' },
    { from: 'H', to: 'I' },
    { from: 'C', to: 'K' },
    { from: 'C', to: 'L' },
    { from: 'C', to: 'M' },
    { from: 'C', to: 'N' },
    { from: 'C', to: 'O' },
    { from: 'C', to: 'P' },
    { from: 'K', to: 'Q' },
    { from: 'K', to: 'S' },
    { from: 'K', to: 'T' },
    { from: 'M', to: 'R' },
    { from: 'M', to: 'V' },
    { from: 'L', to: 'U' },
    { from: 'S', to: 'T' },
    { from: 'Q', to: 'M' },
    { from: 'R', to: 'QQ' },
    { from: 'Y', to: 'Z' },
    { from: 'Y', to: 'AA' },
    { from: 'Y', to: 'BB' },
    { from: 'Y', to: 'CC' },
    { from: 'H', to: 'Y' },
    { from: 'F', to: 'EE' },
    { from: 'G', to: 'EE' },
    { from: 'L', to: 'FF' },
    { from: 'M', to: 'FF' },
    { from: 'N', to: 'GG' },
    { from: 'T', to: 'HH' },
    { from: 'EE', to: 'DD' },
    { from: 'FF', to: 'DD' },
    { from: 'GG', to: 'DD' },
    { from: 'HH', to: 'DD' },
    { from: 'DD', to: 'NN' },
    { from: 'NN', to: 'OO' },
    { from: 'NN', to: 'PP' },
    { from: 'I', to: 'II' },
    { from: 'V', to: 'JJ' },
    { from: 'U', to: 'KK' },
    { from: 'A', to: 'LL' },
    { from: 'X', to: 'LL' },
    { from: 'DD', to: 'LL' },
    { from: 'K', to: 'W' },
    { from: 'M', to: 'W' },
    { from: 'O', to: 'W' },
    { from: 'A', to: 'RR' },
    { from: 'S', to: 'SS' },
    { from: 'U', to: 'TT' }
  ];

  const groupColors = {
    entry: { bg: '#e1f5fe', stroke: '#0277bd', name: 'Entry Point' },
    routing: { bg: '#f3e5f5', stroke: '#7b1fa2', name: 'Routing System' },
    auth: { bg: '#fff3e0', stroke: '#f57c00', name: 'Authentication Layer' },
    pages: { bg: '#e8f5e8', stroke: '#388e3c', name: 'Core Pages' },
    components: { bg: '#fff8e1', stroke: '#f9a825', name: 'Reusable Components' },
    state: { bg: '#fce4ec', stroke: '#c2185b', name: 'State Management' },
    api: { bg: '#e0f2f1', stroke: '#00695c', name: 'API Service Layer' },
    utils: { bg: '#f1f8e9', stroke: '#689f38', name: 'Utils & Helpers' },
    backend: { bg: '#ffebee', stroke: '#d32f2f', name: 'Backend Integration' },
    external: { bg: '#f9fbe7', stroke: '#827717', name: 'External Libraries' }
  };

  const Node = ({ id, data, isSelected, onClick }) => (
    <div
      className={`absolute cursor-pointer transition-all duration-200 hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 z-20' : 'z-10'
      }`}
      style={{
        left: data.x - 75,
        top: data.y - 20,
        width: '150px',
        height: '40px'
      }}
      onClick={() => onClick(id)}
    >
      <div
        className="w-full h-full rounded-lg border-2 flex items-center justify-center p-2 text-xs font-medium text-center shadow-sm hover:shadow-md transition-shadow"
        style={{
          backgroundColor: groupColors[data.group]?.bg,
          borderColor: groupColors[data.group]?.stroke,
          color: '#333'
        }}
      >
        {data.label}
      </div>
    </div>
  );

  const Connection = ({ from, to }) => {
    const fromNode = nodeData[from];
    const toNode = nodeData[to];
    
    if (!fromNode || !toNode) return null;

    return (
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke="#666"
        strokeWidth="1.5"
        markerEnd="url(#arrowhead)"
        opacity="0.7"
      />
    );
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">React App Component Architecture</h2>
        <p className="text-gray-600 text-sm">Hierarchical view of your application structure - click any component to highlight it</p>
      </div>

      <div className="relative bg-white rounded-lg shadow-sm border overflow-auto" style={{ height: '800px' }}>
        {/* SVG for arrows */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="1500"
          height="1300"
          style={{ zIndex: 1 }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
          </defs>
          {connections.map((conn, index) => (
            <Connection key={index} from={conn.from} to={conn.to} />
          ))}
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ width: '1500px', height: '1300px', zIndex: 2 }}>
          {Object.entries(nodeData).map(([id, data]) => (
            <Node
              key={id}
              id={id}
              data={data}
              isSelected={selectedNode === id}
              onClick={setSelectedNode}
            />
          ))}
        </div>

        {/* Group Labels */}
        <div className="absolute left-4 top-4 space-y-2 bg-white p-2 rounded shadow-sm border z-30">
          <div className="text-xs font-bold text-gray-700">Layers:</div>
          {Object.entries(groupColors).map(([key, color]) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded border"
                style={{ backgroundColor: color.bg, borderColor: color.stroke }}
              />
              <span className="text-xs text-gray-600">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded border-2"
              style={{
                backgroundColor: groupColors[nodeData[selectedNode].group]?.bg,
                borderColor: groupColors[nodeData[selectedNode].group]?.stroke
              }}
            />
            <span className="font-medium text-gray-800">{nodeData[selectedNode].label}</span>
            <span className="text-sm text-gray-600">
              ({groupColors[nodeData[selectedNode].group]?.name})
            </span>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {selectedNode && (
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setSelectedNode(null)}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentArchitectureDiagram;