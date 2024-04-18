import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteElement } from '../../redux/graphSlice'; 

const GraphNode = ({ id, label, onDelete, onHover }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        borderRadius: '8px',
        background: '#ffffff',
        border: '1px solid #000000',
        padding: '10px',
        cursor: 'pointer',
        margin: '10px',
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{label}</div>
        <div
          style={{ color: 'red', fontSize: '20px' }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteElement(id));
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};

GraphNode.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onHover: PropTypes.func,
};

export default GraphNode;
