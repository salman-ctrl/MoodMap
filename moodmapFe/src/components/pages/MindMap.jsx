import { useState, useRef } from 'react';
import { Plus, Trash2, Download, Link2 } from 'lucide-react';

const goals = [
  { name: 'Academic Excellence', progress: 75, color: '#3454F5' },
  { name: 'Physical Health', progress: 60, color: '#CBA6F7' },
  { name: 'Social Connections', progress: 85, color: '#8386B0' },
  { name: 'Career Development', progress: 50, color: '#4B4E82' },
  { name: 'Mental Wellbeing', progress: 70, color: '#3454F5' },
];

const initialNodes = [
  { id: 1, x: 200, y: 150, text: 'Academic Goals', color: '#3454F5' },
  { id: 2, x: 500, y: 100, text: 'Career Vision', color: '#CBA6F7' },
  { id: 3, x: 400, y: 300, text: 'Personal Growth', color: '#8386B0' },
  { id: 4, x: 650, y: 250, text: 'Health & Fitness', color: '#4B4E82' },
];

export default function MindMap() {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      x: Math.random() * 500 + 100,
      y: Math.random() * 300 + 100,
      text: 'New Goal',
      color: '#3454F5',
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = () => {
    if (selectedNode !== null) {
      setNodes(nodes.filter(node => node.id !== selectedNode));
      setSelectedNode(null);
    }
  };

  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDragging(nodeId);
      setSelectedNode(nodeId);
      const rect = canvasRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left - node.x,
        y: e.clientY - rect.top - node.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging !== null && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(50, Math.min(rect.width - 50, e.clientX - rect.left - offset.x));
      const newY = Math.max(50, Math.min(rect.height - 50, e.clientY - rect.top - offset.y));
      
      setNodes(nodes.map(node => 
        node.id === dragging 
          ? { ...node, x: newX, y: newY }
          : node
      ));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-[#1C1E4A] mb-2">Mind Map</h1>
            <p className="text-[#4B4E82]">Visualize your goals and connect your thoughts</p>
          </div>

          {/* Floating Toolbar */}
          <div className="flex gap-2">
            <button 
              onClick={addNode}
              className="px-4 py-2 bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
            <button 
              className="px-4 py-2 rounded-xl border border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10 transition-all flex items-center gap-2"
            >
              <Link2 className="w-4 h-4" />
              Connect
            </button>
            <button 
              onClick={deleteNode}
              disabled={selectedNode === null}
              className="px-4 py-2 rounded-xl border border-[#8386B0]/30 text-red-500 hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button 
              className="px-4 py-2 rounded-xl border border-[#8386B0]/30 text-[#4B4E82] hover:bg-[#CBA6F7]/10 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas Area */}
          <div 
            className="lg:col-span-3 p-6 rounded-2xl border border-[#8386B0]/20 shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(52, 84, 245, 0.02) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div 
              ref={canvasRef}
              className="relative w-full h-[600px] rounded-xl border-2 border-dashed border-[#8386B0]/30 bg-white/50"
              style={{
                backgroundImage: 'radial-gradient(circle, #8386B0 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.length > 1 && nodes.map((node, i) => 
                  nodes.slice(i + 1).map((targetNode) => (
                    <line 
                      key={`${node.id}-${targetNode.id}`}
                      x1={node.x} 
                      y1={node.y} 
                      x2={targetNode.x} 
                      y2={targetNode.y} 
                      stroke="#CBA6F7" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      opacity="0.5"
                    />
                  ))
                )}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute cursor-move transition-all ${
                    selectedNode === node.id ? 'ring-2 ring-[#3454F5] ring-offset-2 z-10' : ''
                  }`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  <div 
                    className="px-6 py-4 rounded-2xl shadow-lg text-white cursor-pointer hover:scale-105 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${node.color} 0%, ${node.color}CC 100%)`,
                      boxShadow: `0 8px 16px ${node.color}40`,
                    }}
                  >
                    <p className="whitespace-nowrap font-medium">{node.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#1C1E4A]">Goal Progress</h3>
            
            {goals.map((goal, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-[#8386B0]/20 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: goal.color }}
                  />
                  <span className="text-[#1C1E4A] text-sm flex-1 font-medium">{goal.name}</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${goal.progress}%`,
                      background: `linear-gradient(90deg, ${goal.color}, ${goal.color}CC)`
                    }}
                  />
                </div>
                <p className="text-[#4B4E82] text-xs mt-2">{goal.progress}% Complete</p>
              </div>
            ))}

            <button 
              className="w-full py-2 rounded-xl border border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10 transition-all font-medium"
            >
              Add New Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}