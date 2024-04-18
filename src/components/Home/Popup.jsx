import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Popup = ({ node, onSave, onClose, position }) => {
  const [title, setTitle] = useState(node.data.label); 
  const handleSave = () => {
    const updatedNode = { ...node, data: { ...node.data, label: title } }; 
    onSave(updatedNode); 
    onClose(); 
  };

  return (
    <div style={{ position: 'absolute', left: position.x, top: position.y, background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

Popup.propTypes = {
  node: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

export default Popup;
