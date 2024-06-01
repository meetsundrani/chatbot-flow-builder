import React from 'react';

const NodesPanel = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 p-4 bg-gray-100 border-l mt-[70px]">
            <div className="mb-4 text-sm text-gray-500">Drag a node to the panel.</div>
            <div
                className="p-4 mb-2 bg-white border rounded shadow cursor-pointer"
                onDragStart={(event) => onDragStart(event, 'textNode')}
                draggable
            >
                Message
            </div>
        </aside>
    );
};

export default NodesPanel;
