import React from 'react';

const SettingsPanel = ({ selectedNode, setNodes }) => {
    const onTextChange = (event) => {
        const newText = event.target.value;
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === selectedNode.id ? { ...node, data: { ...node.data, text: newText } } : node
            )
        );
    };

    return (
        <aside className="w-64 p-4 bg-gray-100 border-l">
            <div className="mb-2 text-sm text-gray-500">Edit the text of the selected node.</div>
            <input
                type="text"
                value={selectedNode.data.text}
                onChange={onTextChange}
                className="w-full p-2 border rounded"
            />
        </aside>
    );
};

export default SettingsPanel;
