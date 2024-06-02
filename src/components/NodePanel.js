import React from 'react';

const NodesPanel = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 p-4 bg-gray-100 border-l mt-[70px]">
            <div className="mb-4 text-sm text-gray-500 text-center">Drag a node to the panel.</div>
            <div
                className="p-4 mb-2 bg-white border-black border rounded shadow cursor-pointer flex flex-col items-center"
                onDragStart={(event) => onDragStart(event, 'textNode')}
                draggable
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 9h8" />
                    <path d="M8 13h6" />
                    <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                </svg>
                <div className='text-black'>Message</div>
            </div>

        </aside>
    );
};

export default NodesPanel;