 const ArchitectureDiagram = () => (
    <div className="w-full">
      <svg width="100%" height="500" viewBox="0 0 800 500" className="border rounded-lg bg-white">
        {/* Frontend Layer */}
        <rect x="50" y="50" width="150" height="100" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="10"/>
        <text x="125" y="75" textAnchor="middle" className="fill-current text-sm font-bold">Frontend Layer</text>
        <text x="125" y="95" textAnchor="middle" className="fill-current text-xs">React App</text>
        <text x="125" y="110" textAnchor="middle" className="fill-current text-xs">Components</text>
        <text x="125" y="125" textAnchor="middle" className="fill-current text-xs">State Management</text>
        
        {/* API Layer */}
        <rect x="250" y="50" width="150" height="100" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" rx="10"/>
        <text x="325" y="75" textAnchor="middle" className="fill-current text-sm font-bold">API Layer</text>
        <text x="325" y="95" textAnchor="middle" className="fill-current text-xs">Auth Service</text>
        <text x="325" y="110" textAnchor="middle" className="fill-current text-xs">Video Service</text>
        <text x="325" y="125" textAnchor="middle" className="fill-current text-xs">User Service</text>
        
        {/* Backend Layer */}
        <rect x="450" y="50" width="150" height="100" fill="#e8f5e8" stroke="#4caf50" strokeWidth="2" rx="10"/>
        <text x="525" y="75" textAnchor="middle" className="fill-current text-sm font-bold">Backend Layer</text>
        <text x="525" y="95" textAnchor="middle" className="fill-current text-xs">Node.js/Express</text>
        <text x="525" y="110" textAnchor="middle" className="fill-current text-xs">JWT Middleware</text>
        <text x="525" y="125" textAnchor="middle" className="fill-current text-xs">API Controllers</text>
        
        {/* Database Layer */}
        <rect x="250" y="200" width="150" height="100" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="10"/>
        <text x="325" y="225" textAnchor="middle" className="fill-current text-sm font-bold">Database Layer</text>
        <text x="325" y="245" textAnchor="middle" className="fill-current text-xs">MongoDB</text>
        <text x="325" y="260" textAnchor="middle" className="fill-current text-xs">User Collection</text>
        <text x="325" y="275" textAnchor="middle" className="fill-current text-xs">Video Collection</text>
        
        {/* Arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
          </marker>
        </defs>
        
        {/* Frontend to API */}
        <line x1="200" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* API to Backend */}
        <line x1="400" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* Backend to Database */}
        <line x1="525" y1="150" x2="525" y2="180" stroke="#666" strokeWidth="2"/>
        <line x1="525" y1="180" x2="400" y2="180" stroke="#666" strokeWidth="2"/>
        <line x1="400" y1="180" x2="400" y2="200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* Data Flow Labels */}
        <text x="225" y="95" textAnchor="middle" className="fill-current text-xs text-gray-600">HTTP</text>
        <text x="425" y="95" textAnchor="middle" className="fill-current text-xs text-gray-600">API</text>
        <text x="465" y="175" textAnchor="middle" className="fill-current text-xs text-gray-600">Queries</text>
        
        {/* Data Flow Indicators */}
        <circle cx="125" cy="180" r="3" fill="#2196f3"/>
        <text x="125" y="195" textAnchor="middle" className="fill-current text-xs">User Interface</text>
        
        <circle cx="325" cy="180" r="3" fill="#9c27b0"/>
        <text x="325" y="195" textAnchor="middle" className="fill-current text-xs">Business Logic</text>
        
        <circle cx="525" cy="180" r="3" fill="#4caf50"/>
        <text x="525" y="195" textAnchor="middle" className="fill-current text-xs">Server Logic</text>
        
        <circle cx="325" cy="320" r="3" fill="#ff9800"/>
        <text x="325" y="335" textAnchor="middle" className="fill-current text-xs">Data Storage</text>
        
        {/* Flow Description */}
        <text x="400" y="380" textAnchor="middle" className="fill-current text-sm font-medium">
          Request Flow: Frontend → API → Backend → Database
        </text>
        <text x="400" y="400" textAnchor="middle" className="fill-current text-sm font-medium">
          Response Flow: Database → Backend → API → Frontend
        </text>
      </svg>
    </div>
  );

  export default ArchitectureDiagram;