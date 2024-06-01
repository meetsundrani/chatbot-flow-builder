import React, { useState, useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Handle,
} from 'react-flow-renderer';
import NodesPanel from './NodePanel';
import SettingsPanel from './SettingsPanel';

const initialNodes = [];
const initialEdges = [];

const CustomNode = ({ data }) => {
    return (
        <div>
            <div className="bg-green-100 border rounded shadow text-center">
                <div className="font-semibold text-black">Send Message</div>
            </div>
            <div className="p-4 bg-white-100 border rounded shadow">
                <div>{data.text}</div>
                <Handle type="source" position="right" className="w-3 h-3 bg-blue-500" />
                <Handle type="target" position="left" className="w-3 h-3 bg-blue-500" />
            </div>
        </div>
    );
};

const nodeTypes = { custom: CustomNode };

const FlowCanvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);

    const onConnect = (params) => {
        // Ensure only one edge can originate from a source handle
        if (edges.some(edge => edge.source === params.source)) {
            alert('A source handle can only have one edge.');
            return;
        }
        setEdges((eds) => addEdge(params, eds));
    };

    const onElementClick = (_, element) => {
        if (element.data && element.data.type === 'textNode') {
            setSelectedNode(element);
        } else {
            setSelectedNode(null);
        }
    };

    const onNodesDelete = (elementsToRemove) => {
        const nodeIdsToRemove = elementsToRemove.map((node) => node.id);
        setNodes((nds) => nds.filter((node) => !nodeIdsToRemove.includes(node.id)));
        setEdges((eds) => eds.filter((edge) => !nodeIdsToRemove.includes(edge.source) && !nodeIdsToRemove.includes(edge.target)));
        setSelectedNode(null);
    };

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const reactFlowBounds = event.target.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        const newNode = {
            id: (nodes.length + 1).toString(),
            type: 'custom',
            position,
            data: { type: 'textNode', text: 'New Text Node' },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [setNodes, nodes]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const saveFlow = () => {
        const emptyTargetHandles = nodes.filter(node =>
            node.data && node.data.type === 'textNode' && edges.every(edge => edge.target !== node.id)
        );
        if (emptyTargetHandles.length > 1) {
            alert("Error: More than one node has empty target handles.");
        } else {
            console.log('Flow saved', { nodes, edges });
        }
    };

    return (
        <div>
            <div className="flex">
                <nav className="bg-gray-300 border-gray-400 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 dark:border-gray-600 flex justify-end">
                    <button
                        onClick={saveFlow}
                        className="m-4 px-4 py-2 text-white bg-blue-500 rounded shadow"
                    >
                        Save Changes
                    </button>
                </nav>
            </div>
            <div className="flex h-screen">
                <div className="flex-1">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onElementClick={onElementClick}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodesDelete={onNodesDelete}
                        nodeTypes={nodeTypes}
                        className="bg-gray-50"
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
                {selectedNode ? (
                    <SettingsPanel
                        selectedNode={selectedNode}
                        setNodes={setNodes}
                    />
                ) : (
                    <NodesPanel />
                )}

            </div>
        </div>
    );
};

export default FlowCanvas;
