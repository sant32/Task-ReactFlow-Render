import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { Controls, isNode } from 'react-flow-renderer';
import { addElement, deleteElement, updateElement } from '../../redux/graphSlice';
import GraphNode from './GraphNode';
import Popup from './Popup';

const Home = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.graph.elements);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 }); 
  const handleCreateNode = () => {
    const newNode = {
      id: Math.random().toString(),
      type: 'default',
      data: { label: 'New Node' },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
    };
    dispatch(addElement(newNode));
  };

  const handleDeleteElement = (id) => {
    dispatch(deleteElement(id));
  };

  const handleElementsConnect = (params) => {
    if (isNode(params.source) && isNode(params.target)) {
      console.log('Connecting nodes:', params.source, '->', params.target);
    }
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setPopupPosition({ x: node.position.x + 100, y: node.position.y - 50 });
  };

  const handleSave = (updatedNode) => {
    dispatch(updateElement(updatedNode)); 
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div style={{ width: '200px', background: '#f0f0f0' }}>
        <button onClick={handleCreateNode}>Create node</button>
      </div>
      <div style={{ flex: 1 }}>
        <ReactFlow
          elements={elements}
          deleteKeyCode={46} 
          onElementsRemove={(elementsToRemove) => {
            elementsToRemove.forEach((element) => {
              handleDeleteElement(element.id);
            });
          }}
          onConnect={handleElementsConnect} 
          onElementClick={handleNodeClick} 
        >
          <Controls />
          {elements.map((element) => (
            <GraphNode
              key={element.id}
              id={element.id}
              label={element.data.label}
              onDelete={handleDeleteElement}
            />
          ))}
        </ReactFlow>
        {selectedNode && (
          <Popup
            node={selectedNode}
            onSave={handleSave}
            onClose={() => setSelectedNode(null)}
            position={popupPosition}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
